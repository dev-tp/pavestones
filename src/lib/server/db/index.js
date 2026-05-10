import { defineRelations } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import * as schema from '$lib/server/db/schema';

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
	},
	session: {
		user: relation.one.user({
			from: relation.session.userId,
			to: relation.user.id
		})
	}
}));

export const db = drizzle({
	casing: 'snake_case',
	connection: 'data/data.db',
	relations,
	schema
});
