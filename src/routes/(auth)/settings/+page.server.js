import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import validate from '$lib/validate';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		if (!event.locals.user) {
			return { error: 'Bad request', username: null };
		}

		const data = await event.request.formData();
		const username = data.get('username')?.toString() ?? '';

		if (!validate.username(username)) {
			return { error: 'Invalid username', username: event.locals.user.username };
		}

		await db.update(user).set({ username }).where(eq(user.id, event.locals.user.id));

		return { error: null, username };
	}
};
