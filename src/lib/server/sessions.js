/** @import { Session, User } from '$lib/server/db/schema' */

import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { eq } from 'drizzle-orm';

import { db } from './db';
import * as schema from './db/schema';

const FIFTEEN_DAYS_IN_SECONDS = 1000 * 60 * 60 * 24 * 15;
const THIRTY_DAYS_IN_SECONDS = 1000 * 60 * 60 * 24 * 30;

/** @type {(token: string) => string} */
function encode(token) {
	return encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
}

/** @type {(token: string, userId: number) => Promise<Session>} */
export async function create(token, userId) {
	return (
		await db
			.insert(schema.session)
			.values({
				id: encode(token),
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

/** @type {(token: string) => Promise<void>} */
export async function invalidate(token) {
	const id = encode(token);
	await db.delete(schema.session).where(eq(schema.session.id, id));
}

/** @type {(token?: string) => Promise<User | null>} */
export async function validate(token) {
	if (!token) {
		return null;
	}

	const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session = await db.query.session.findFirst({ where: { id }, with: { user: true } });

	if (!session) {
		return null;
	}

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

	return session.user;
}

export default {
	create,
	generateToken,
	invalidate,
	validate
};
