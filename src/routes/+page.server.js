import { fail } from '@sveltejs/kit';
import { eq, getTableColumns, like, or } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { donor, entry, pavestone } from '$lib/server/db/schema';

const columns = { ...getTableColumns(pavestone), entry, donor };

/** @satisfies {import('./$types').Actions} */
export const actions = {
	add: async (event) => {
		const data = await event.request.formData();

		const id = parseInt(data.get('id')?.toString() ?? '0');
		const record = await db.query.pavestone.findFirst({ where: eq(pavestone.id, id) });

		if (!record) {
			return fail(400, 'Invalid id');
		}

		const fullName = data.get('fullName')?.toString().trim() ?? '';

		let donorId = parseInt(data.get('donorId')?.toString() ?? '0');

		if (await db.query.donor.findFirst({ where: eq(donor.id, donorId) })) {
			await db.update(donor).set({ fullName }).where(eq(donor.id, donorId));
		} else {
			const donors = await db.insert(donor).values({ fullName }).returning();
			donorId = donors[0].id;
		}

		const dedicatedTo = data.get('dedicatedTo')?.toString().trim() ?? '';
		const inMemoriam = !!data.get('inMemoriam');

		let { entryId } = record;

		if (entryId) {
			await db.update(entry).set({ dedicatedTo, donorId, inMemoriam }).where(eq(entry.id, entryId));
		} else {
			const entries = await db
				.insert(entry)
				.values({ dedicatedTo, donorId, inMemoriam })
				.returning();
			entryId = entries[0].id;
		}

		await db.update(pavestone).set({ entryId }).where(eq(pavestone.id, record.id));

		return {
			records: await db
				.select(columns)
				.from(pavestone)
				.leftJoin(entry, eq(pavestone.entryId, entry.id))
				.leftJoin(donor, eq(entry.donorId, donor.id))
				.where(eq(pavestone.id, record.id))
		};
	},
	remove: async (event) => {
		const data = await event.request.formData();
		const results = await db
			.select(columns)
			.from(pavestone)
			.innerJoin(entry, eq(pavestone.entryId, entry.id))
			.innerJoin(donor, eq(entry.donorId, donor.id))
			.where(eq(pavestone.id, parseInt(data.get('id')?.toString() ?? '0')));

		if (results.length === 0) {
			return fail(400, { error: 'Invalid id' });
		}

		await db.delete(entry).where(eq(entry.id, results[0].entry.id));
	},
	search: async (event) => {
		const data = await event.request.formData();
		const search = `%${data.get('query')?.toString() ?? ''}%`;

		const query = db
			.select(columns)
			.from(pavestone)
			.innerJoin(entry, eq(pavestone.entryId, entry.id))
			.innerJoin(donor, eq(entry.donorId, donor.id))
			.where(or(like(donor.fullName, search), like(entry.dedicatedTo, search)))
			.orderBy(entry.dedicatedTo);

		if (search.length < 4) {
			query.limit(10);
		}

		return {
			results: await query
		};
	}
};
