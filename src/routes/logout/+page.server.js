import { redirect } from '@sveltejs/kit';

import sessions from '$lib/server/sessions';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: (event) => {
		const token = event.cookies.get('session');

		if (token) {
			sessions.invalidate(token);

			event.cookies.delete('session', { path: '/' });
			event.locals.user = null;
		}

		redirect(302, '/');
	}
};
