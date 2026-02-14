/** @import { Session, User } from '$lib/server/db/schema' */

import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';

import { db } from './db';
import * as schema from './db/schema';

const FIFTEEN_DAYS_IN_SECONDS = 1000 * 60 * 60 * 24 * 15;
const THIRTY_DAYS_IN_SECONDS = 1000 * 60 * 60 * 24 * 30;

/** @type {(token: string, userId: number) => Promise<Session>} */
export async function create(token, userId) {
	return (
		await db
			.insert(schema.session)
			.values({
				id: encodeHexLowerCase(sha256(new TextEncoder().encode(token))),
				userId,
				expires: new Date(Date.now() + THIRTY_DAYS_IN_SECONDS)
			})
			.returning()
	)[0];
}

/** @type {() => string} */
export function generateToken() {
	return encodeBase32LowerCaseNoPadding(crypto.getRandomValues(new Uint8Array(20)));
}

/** @type {(sessionId: string) => Promise<void>} */
export async function invalidate(sessionId) {
	await db.delete(schema.session).where(eq(schema.session.id, sessionId));
}

/** @type {(token: string | undefined) => Promise<Omit<User, 'hash'> | null>} */
export async function validate(token) {
	if (!token) {
		return null;
	}

	const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const results = await db
		.select()
		.from(schema.session)
		.innerJoin(schema.user, eq(schema.session.userId, schema.user.id))
		.where(eq(schema.session.id, id));

	if (results.length === 0) {
		return null;
	}

	const { session, user } = results[0];

	if (Date.now() >= session.expires.getTime()) {
		await invalidate(session.id);
		return null;
	}

	if (Date.now() >= session.expires.getTime() - FIFTEEN_DAYS_IN_SECONDS) {
		await db
			.update(schema.session)
			.set({ expires: new Date(Date.now() + THIRTY_DAYS_IN_SECONDS) })
			.where(eq(schema.session.id, session.id));
	}

	return user;
}

export default {
	create,
	generateToken,
	invalidate,
	validate
};
