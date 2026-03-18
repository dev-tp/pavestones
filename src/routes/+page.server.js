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
		const fullName = data.get('fullName')?.toString().trim() ?? '';
		const dedicatedTo = data.get('dedicatedTo')?.toString().trim() ?? '';
		const inMemoriam = !!data.get('inMemoriam');

		const results = await db
			.select(columns)
			.from(pavestone)
			.leftJoin(entry, eq(pavestone.entryId, entry.id))
			.leftJoin(donor, eq(entry.donorId, donor.id))
			.where(eq(pavestone.id, id));

		if (results.length === 0) {
			return fail(400, { error: 'Invalid id' });
		}

		const result = results[0];

		if (result.entry && result.donor) {
			if (fullName !== result.donor.fullName) {
				await db.update(donor).set({ fullName }).where(eq(donor.id, result.donor.id));
			}

			await db
				.update(entry)
				.set({ dedicatedTo, inMemoriam, donorId: result.donor.id })
				.where(eq(entry.id, result.entry.id));
		} else {
			const results = await db.select().from(donor).where(eq(donor.fullName, fullName));

			let donorId = 0;

			if (results.length !== 0) {
				donorId = results[0].id;
			} else {
				const donors = await db.insert(donor).values({ fullName }).returning();
				donorId = donors[0].id;
			}

			if (donorId !== 0) {
				const results = await db
					.insert(entry)
					.values({ donorId, dedicatedTo, inMemoriam })
					.returning();

				await db.update(pavestone).set({ entryId: results[0].id }).where(eq(pavestone.id, id));
			}
		}

		return {
			records: await db
				.select(columns)
				.from(pavestone)
				.leftJoin(entry, eq(pavestone.entryId, entry.id))
				.leftJoin(donor, eq(entry.donorId, donor.id))
				.where(eq(pavestone.id, id))
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
