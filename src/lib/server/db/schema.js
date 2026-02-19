import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/** @typedef {typeof pavestone.$inferSelect} Pavestone */
export const pavestone = sqliteTable('pavestone', {
	id: integer().primaryKey({ autoIncrement: true }),
	tile: text().notNull(),
	donor: text().notNull().default(''),
	dedicatedTo: text().notNull().default(''),
	inMemoriam: integer({ mode: 'boolean' }).notNull().default(false),
	sectionId: integer()
		.notNull()
		.default(0)
		.references(() => section.id, { onDelete: 'set default' })
});

/** @typedef {typeof section.$inferSelect} Section */
export const section = sqliteTable('section', {
	id: integer().primaryKey({ autoIncrement: true }),
	color: text().notNull()
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
