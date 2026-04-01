import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { donor, entry, pavestone } from '$lib/server/db/schema';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	add: async (event) => {
		const data = await event.request.formData();

		const id = parseInt(data.get('id')?.toString() ?? '0');
		const record = await db.query.pavestone.findFirst({ where: { id } });

		if (!record) {
			return fail(400, 'Invalid id');
		}

		const fullName = data.get('fullName')?.toString().trim() ?? '';

		let donorId = parseInt(data.get('donorId')?.toString() ?? '0');

		if (await db.query.donor.findFirst({ where: { id: donorId } })) {
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
			record: await db.query.pavestone.findFirst({
				with: { entry: { with: { donor: true } } },
				where: { id }
			})
		};
	},
	remove: async (event) => {
		const data = await event.request.formData();
		const record = await db.query.pavestone.findFirst({
			where: { id: parseInt(data.get('id')?.toString() ?? '0') }
		});

		if (record?.entryId) {
			await db.delete(entry).where(eq(entry.id, record.entryId));
		} else {
			fail(400, { error: 'Invalid id' });
		}
	},
	search: async (event) => {
		const data = await event.request.formData();
		const search = `%${data.get('query')?.toString() ?? ''}%`;

		return {
			results: await db.query.pavestone.findMany({
				limit: search.length < 4 ? 10 : undefined,
				where: {
					entry: {
						OR: [{ dedicatedTo: { like: search } }, { donor: { fullName: { like: search } } }]
					}
				},
				with: { entry: { with: { donor: true } } }
			})
		};
	}
};
