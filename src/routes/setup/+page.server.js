import { fail, redirect } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { validateEmail, validatePassword, validateUsername } from '$lib';

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

		if (!validateEmail(email)) {
			errors.email = 'Invalid email';
		}

		// TODO Check if username exists in database
		const username = data.get('username')?.toString() || '';

		if (!validateUsername(username)) {
			errors.username = 'Invalid username';
		}

		const password = data.get('password')?.toString() || '';

		if (validatePassword(password).length > 0) {
			errors.password = 'Invalid password';
		}

		if (errors.email !== '' || errors.password !== '' || errors.username !== '') {
			return fail(400, { email, errors, username });
		}

		return {
			email: '',
			errors: null,
			username: ''
		};
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const users = await db.select().from(user);

	if (users.length > 0) {
		redirect(308, '/');
	}
}
