import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import sessions from '$lib/server/sessions';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const email = data.get('email')?.toString() || '';

		const results = await db.select().from(user).where(eq(user.email, email));

		if (results.length === 0) {
			return fail(400, { email, error: 'Invalid email or password' });
		}

		const password = data.get('password')?.toString() || '';
		const match = await bcrypt.compare(password, results[0].hash);

		if (!match) {
			return fail(400, { email, error: 'Invalid email or password' });
		}

		const token = sessions.generateToken();
		const { expires } = await sessions.create(token, results[0].id);

		event.cookies.set('session', token, { expires, path: '/' });

		redirect(302, '/');
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	if (event.locals.user) {
		redirect(302, '/');
	}
}
