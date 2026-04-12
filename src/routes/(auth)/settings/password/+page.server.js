import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import validate from '$lib/validate';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		if (!event.locals.user) {
			return { error: 'Bad request' };
		}

		const data = await event.request.formData();
		const currentPassword = data.get('currentPassword')?.toString() ?? '';

		if (!(await bcrypt.compare(currentPassword, event.locals.user.hash))) {
			return { error: 'Current password does not match existing password in database' };
		}

		const newPassword = data.get('password')?.toString() ?? '';

		if (validate.password(newPassword).length > 0) {
			return { error: 'Invalid new password' };
		}

		if (currentPassword === newPassword) {
			return { error: 'New password cannot be your current password' };
		}

		await db
			.update(user)
			.set({ hash: await bcrypt.hash(newPassword, 10) })
			.where(eq(user.id, event.locals.user.id));

		return { error: null };
	}
};
