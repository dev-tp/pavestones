import { fail, redirect } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const data = await event.request.formData();

		const email = data.get('email')?.toString();
		const username = data.get('username')?.toString();

		return fail(400, { email, username });
	}
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const users = await db.select().from(user);

	if (users.length > 0) {
		redirect(308, '/');
	}
}
