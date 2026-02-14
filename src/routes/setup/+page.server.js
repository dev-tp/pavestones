import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

import validate from '$lib/validate';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import sessions from '$lib/server/sessions';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const data = await event.request.formData();

		const errors = {
			email: '',
			password: '',
			username: ''
		};

		// TODO Check if email exists in database
		const email = data.get('email')?.toString() || '';

		if (!validate.email(email)) {
			errors.email = 'Invalid email';
		}

		// TODO Check if username exists in database
		const username = data.get('username')?.toString() || '';

		if (!validate.username(username)) {
			errors.username = 'Invalid username';
		}

		const password = data.get('password')?.toString() || '';

		if (validate.password(password).length > 0) {
			errors.password = 'Invalid password';
		}

		if (errors.email !== '' || errors.password !== '' || errors.username !== '') {
			return fail(400, { email, errors, username });
		}

		const hash = await bcrypt.hash(password, 10);
		const token = sessions.generateToken();

		const { lastInsertRowid } = await db.insert(user).values({ email, hash, username });
		const { expires } = await sessions.create(token, /** @type {number} */ (lastInsertRowid));

		event.cookies.set('session', token, { expires, path: '/' });

		redirect(303, '/');
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const users = await db.select().from(user);

	if (users.length > 0) {
		redirect(308, '/');
	}
}
