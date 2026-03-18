import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export function load(event) {
	if (!event.locals.user) {
		redirect(303, `/login?redirectTo=${event.url.pathname}`);
	}
}
