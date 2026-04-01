import { defineRelations } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import { env } from '$env/dynamic/private';
import * as schema from '$lib/server/db/schema';

if (!env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

const relations = defineRelations(schema, (relation) => ({
	donor: {
		entries: relation.many.entry()
	},
	entry: {
		donor: relation.one.donor({
			from: relation.entry.donorId,
			to: relation.donor.id
		})
	},
	pavestone: {
		entry: relation.one.entry({
			from: relation.pavestone.entryId,
			to: relation.entry.id
		})
	}
}));

export const db = drizzle({
	casing: 'snake_case',
	connection: env.DATABASE_URL,
	relations,
	schema
});
