import { json } from '@sveltejs/kit';
import { like } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { donor } from '$lib/server/db/schema';

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {
	const query = event.url.searchParams.get('q');

	if (!query) {
		return json([]);
	}

	// TODO Perform a join to filter donors without a pavestone
	const results = db
		.select()
		.from(donor)
		.where(like(donor.fullName, `%${query}%`));

	if (query.length < 2) {
		results.limit(10);
	}

	return json(await results);
}
