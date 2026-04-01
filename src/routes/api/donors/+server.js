import { json } from '@sveltejs/kit';

import { db } from '$lib/server/db';

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
	const query = event.url.searchParams.get('q');

	if (!query) {
		return json(await db.query.donor.findMany({ limit: 10, where: { entries: true } }));
	}

	return json(
		await db.query.donor.findMany({
			limit: query.length < 2 ? 10 : undefined,
			where: { entries: true, fullName: { like: `%${query}%` } }
		})
	);
}
