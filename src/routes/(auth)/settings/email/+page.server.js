import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import validate from '$lib/validate';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		if (!event.locals.user) {
			return { error: 'Bad request', email: null };
		}

		const data = await event.request.formData();
		const email = data.get('email')?.toString() ?? '';

		if (!validate.email(email)) {
			return { error: 'Invalid email', email: event.locals.user.email };
		}

		await db.update(user).set({ email }).where(eq(user.id, event.locals.user.id));

		return { error: null, email };
	}
};
