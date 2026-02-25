/** @typedef {Pick<import('$lib/server/db/schema').User, 'id' | 'hash'>} User */

import { error, fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import jsonwebtoken from 'jsonwebtoken';

import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import * as schema from '$lib/server/db/schema';
import sessions from '$lib/server/sessions';
import validate from '$lib/validate';

/** @type {(token: string) => User?} */
function getUserFromToken(token) {
	try {
		return /** @type {User} */ (jsonwebtoken.verify(token, env.JWT_SECRET));
	} catch {
		return null;
	}
}

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const user = getUserFromToken(event.params.token);

		if (!user) {
			return fail(403, { error: 'This session has expired' });
		}

		const data = await event.request.formData();
		const password = data.get('password')?.toString() ?? '';

		if (validate.password(password).length > 0) {
			return fail(400, { error: 'Invalid password' });
		}

		if (await bcrypt.compare(password, user.hash)) {
			return fail(400, { error: 'New password cannot be your current password' });
		}

		await db
			.update(schema.user)
			.set({ hash: await bcrypt.hash(password, 10) })
			.where(eq(schema.user.id, user.id));

		const token = sessions.generateToken();
		const { expires } = await sessions.create(token, user.id);

		event.cookies.set('session', token, { expires, path: '/' });

		redirect(302, '/');
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	if (!getUserFromToken(event.params.token)) {
		error(403, 'This session has expired');
	}
}
