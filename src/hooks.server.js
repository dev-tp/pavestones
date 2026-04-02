import { redirect } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import sessions from '$lib/server/sessions';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.url.pathname !== '/setup') {
		const user = await db.query.user.findFirst();

		if (!user) {
			redirect(302, '/setup');
		}
	}

	event.locals.user = await sessions.validate(event.cookies.get('session'));

	return resolve(event);
}
