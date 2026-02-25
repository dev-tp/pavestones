import { eq } from 'drizzle-orm';
import jsonwebtoken from 'jsonwebtoken';

import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const data = await event.request.formData();

		const result = await db.query.user.findFirst({
			columns: { id: true, hash: true },
			where: eq(user.email, data.get('email')?.toString() ?? '')
		});

		if (!result) {
			return { submitted: true };
		}

		// TODO Send an email with this link instead of logging it
		console.log(
			`${event.url.origin}/recover/${jsonwebtoken.sign(result, env.JWT_SECRET, { expiresIn: '10m' })}`
		);

		return { submitted: true };
	}
};
