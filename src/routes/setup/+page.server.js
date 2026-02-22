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
		const errors = [];

		// TODO Check if email exists in database
		const email = data.get('email')?.toString() || '';

		if (!validate.email(email)) {
			errors.push('email');
		}

		// TODO Check if username exists in database
		const username = data.get('username')?.toString() || '';

		if (!validate.username(username)) {
			errors.push('username');
		}

		const password = data.get('password')?.toString() || '';

		if (validate.password(password).length > 0) {
			errors.push('password');
		}

		if (errors.length > 0) {
			return fail(400, { email, error: `Invalid: ${errors.join(', ')}`, username });
		}

		const hash = await bcrypt.hash(password, 10);
		const token = sessions.generateToken();

		const { lastInsertRowid } = await db.insert(user).values({ email, hash, username });
		const { expires } = await sessions.create(token, /** @type {number} */ (lastInsertRowid));

		event.cookies.set('session', token, { expires, path: '/' });

		redirect(302, '/');
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const users = await db.select().from(user).limit(1);

	if (users.length > 0) {
		redirect(302, '/');
	}
}
