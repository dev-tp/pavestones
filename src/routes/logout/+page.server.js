import { redirect } from '@sveltejs/kit';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: (event) => {
		event.cookies.delete('session', { path: '/' });
		event.locals.user = null;
		redirect(302, '/');
	}
};
