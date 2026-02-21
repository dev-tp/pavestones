import { redirect } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import sessions from '$lib/server/sessions';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.url.pathname !== '/setup') {
		const users = await db.select().from(user).limit(1);

		if (users.length === 0) {
			redirect(302, '/setup');
		}
	}

	event.locals.user = await sessions.validate(event.cookies.get('session'));

	return resolve(event);
}
