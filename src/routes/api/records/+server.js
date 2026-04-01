import { json } from '@sveltejs/kit';

import { db } from '$lib/server/db';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return json(
		await db.query.pavestone.findMany({
			with: { entry: { with: { donor: true } } }
		})
	);
}
