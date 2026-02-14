import sessions from '$lib/server/sessions';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	event.locals.user = await sessions.validate(event.cookies.get('session'));
	return resolve(event);
}
