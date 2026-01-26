import { db } from '$lib/server/db';
import { pavestone } from '$lib/server/db/schema';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		pavestones: await db.select().from(pavestone)
	};
}
