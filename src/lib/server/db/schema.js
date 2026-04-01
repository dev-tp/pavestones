import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/** @typedef {typeof donor.$inferSelect} Donor */
export const donor = sqliteTable('donor', {
	id: integer().primaryKey({ autoIncrement: true }),
	fullName: text().notNull().default('')
});

/** @typedef {typeof entry.$inferSelect} Entry */
export const entry = sqliteTable('entry', {
	id: integer().primaryKey({ autoIncrement: true }),
	dedicatedTo: text().notNull().default(''),
	inMemoriam: integer({ mode: 'boolean' }).notNull().default(false),
	donorId: integer()
		.notNull()
		.references(() => donor.id, { onDelete: 'cascade' }),
	createdAt: text()
		.notNull()
		.default(sql`(current_timestamp)`),
	updatedAt: text().$onUpdate(() => sql`(current_timestamp)`)
});

/** @typedef {typeof pavestone.$inferSelect} Pavestone */
export const pavestone = sqliteTable('pavestone', {
	id: integer().primaryKey({ autoIncrement: true }),
	entryId: integer()
		.unique()
		.references(() => entry.id, { onDelete: 'set null' })
});

/** @typedef {typeof session.$inferSelect} Session */
export const session = sqliteTable('session', {
	id: text().primaryKey(),
	userId: integer()
		.notNull()
		.references(() => user.id, { onDelete: 'set default', onUpdate: 'no action' }),
	expires: integer({ mode: 'timestamp' }).notNull()
});

/** @typedef {typeof user.$inferSelect} User */
export const user = sqliteTable('user', {
	id: integer().primaryKey({ autoIncrement: true }),
	email: text().notNull().unique(),
	hash: text().notNull(),
	username: text().notNull().unique()
});

/** @typedef {Pavestone & {entry: Entry & {donor: Donor} | null}} Data */
