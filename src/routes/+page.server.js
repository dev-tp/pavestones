import { eq, like, or } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { pavestone } from '$lib/server/db/schema';

/** @type {(formData: FormData) => import('$lib/server/db/schema').Pavestone} */
function parse(formData) {
	return {
		id: parseInt(formData.get('id')?.toString() || '0'),
		tile: '',
		dedicatedTo: formData.get('dedicated_to')?.toString() || '',
		donor: formData.get('donor')?.toString() || '',
		inMemoriam: !!formData.get('in_memoriam'),
		sectionId: 0
	};
}

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	event.setHeaders({
		'cache-control': 'max-age=3600'
	});

	return {
		pavestones: await db.select().from(pavestone),
		user: event.locals.user
	};
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
	add: async (event) => {
		const { id, dedicatedTo, donor, inMemoriam } = parse(await event.request.formData());

		return {
			result: await db
				.update(pavestone)
				.set({ dedicatedTo, donor, inMemoriam })
				.where(eq(pavestone.id, id))
		};
	},
	remove: async (event) => {
		const { id } = parse(await event.request.formData());

		return {
			result: await db
				.update(pavestone)
				.set({ dedicatedTo: '', donor: '', inMemoriam: false })
				.where(eq(pavestone.id, id))
		};
	},
	search: async (event) => {
		const data = await event.request.formData();
		const query = `%${data.get('query')?.toString() || ''}%`;

		return {
			results: await db
				.select()
				.from(pavestone)
				.where(or(like(pavestone.dedicatedTo, query), like(pavestone.donor, query)))
				.orderBy(pavestone.dedicatedTo)
		};
	}
};
