import { redirect } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';

/** @type {import('./$types').LayoutServerLoad} */
export function load(event) {
	if (!event.locals.user) {
		redirect(303, `/login?redirectTo=${event.url.pathname}`);
	}

	return {
		commit: env.COMMIT
	};
}
