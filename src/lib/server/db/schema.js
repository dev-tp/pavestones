import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/** @typedef {typeof pavestone.$inferSelect} Pavestone */
export const pavestone = sqliteTable('pavestone', {
	id: integer().primaryKey({ autoIncrement: true }),
	tile: text().notNull(),
	donor: text().notNull().default(''),
	dedicatedTo: text().notNull().default(''),
	inMemoriam: integer({ mode: 'boolean' }).notNull().default(false)
});
