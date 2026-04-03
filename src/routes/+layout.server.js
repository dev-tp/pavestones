import { redirect } from '@sveltejs/kit';

import { db } from '$lib/server/db';

/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
	if (event.url.pathname !== '/setup') {
		const user = await db.query.user.findFirst();

		if (!user) {
			redirect(302, '/setup');
		}
	}

	return {
		user: event.locals.user
	};
}
