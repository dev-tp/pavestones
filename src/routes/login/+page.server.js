import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

import { db } from '$lib/server/db';
import sessions from '$lib/server/sessions';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const email = data.get('email')?.toString() || '';

		const user = await db.query.user.findFirst({ where: { email } });

		if (!user) {
			return fail(400, { email, error: 'Invalid email or password' });
		}

		const password = data.get('password')?.toString() || '';
		const match = await bcrypt.compare(password, user.hash);

		if (!match) {
			return fail(400, { email, error: 'Invalid email or password' });
		}

		const token = sessions.generateToken();
		const { expires } = await sessions.create(token, user.id);

		event.cookies.set('session', token, { expires, path: '/' });

		// TODO Check if `redirectTo` path is valid
		const redirectTo = event.url.searchParams.get('redirectTo');

		redirect(302, redirectTo ? redirectTo : '/');
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	if (event.locals.user) {
		redirect(302, '/');
	}
}
