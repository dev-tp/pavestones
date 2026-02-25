import { eq } from 'drizzle-orm';
import jsonwebtoken from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const data = await event.request.formData();

		const result = await db.query.user.findFirst({
			where: eq(user.email, data.get('email')?.toString() ?? '')
		});

		if (!result) {
			return { sent: true };
		}

		const token = jsonwebtoken.sign(result, env.JWT_SECRET, { expiresIn: '10m' });
		const link = `${event.url.origin}/recover/${token}`;

		const port = env.SMTP_PORT ? parseInt(env.SMTP_PORT) : undefined;
		const transporter = nodemailer.createTransport({
			host: env.SMTP_HOST,
			port,
			secure: port === 465,
			auth: {
				user: env.SMTP_USER,
				pass: env.SMTP_PASSWORD
			}
		});

		try {
			console.log(link);

			await transporter.sendMail({
				from: env.SMTP_USER,
				to: result.email,
				subject: 'Pavestones - Account Recovery',
				html: `<p>Please follow this link to recover your account: <a href="${link}">${link}</a></p>`
			});
		} catch (error) {
			console.error(error);

			return { sent: false };
		}

		return { sent: true };
	}
};
