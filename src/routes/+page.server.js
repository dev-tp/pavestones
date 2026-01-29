import { like, or } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { pavestone } from '$lib/server/db/schema';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		pavestones: await db.select().from(pavestone)
	};
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
	search: async (event) => {
		const data = await event.request.formData();
		const query = data.get('query');

		return await db
			.select()
			.from(pavestone)
			.where(or(like(pavestone.dedication, `%${query}%`), like(pavestone.patron, `%${query}%`)));
	}
};
