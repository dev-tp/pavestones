import { eq, like, or } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { pavestone } from '$lib/server/db/schema';

/** @type function(FormData): import('$lib/server/db/schema').Pavestone */
function parse(formData) {
	return {
		id: parseInt(unwrap(formData.get('id'))),
		tile: '',
		dedicatedTo: unwrap(formData.get('dedicated_to')),
		donor: unwrap(formData.get('donor')),
		inMemoriam: !!formData.get('in_memoriam')
	};
}

/** @type function(FormDataEntryValue | null): string */
function unwrap(entry) {
	return entry !== null ? entry.toString() : '';
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		pavestones: await db.select().from(pavestone)
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
		const query = data.get('query');

		return {
			results: await db
				.select()
				.from(pavestone)
				.where(or(like(pavestone.dedicatedTo, `%${query}%`), like(pavestone.donor, `%${query}%`)))
		};
	}
};
