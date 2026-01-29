import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/** @typedef {typeof pavestone.$inferSelect} Pavestone */
export const pavestone = sqliteTable('pavestone', {
	id: integer().primaryKey({ autoIncrement: true }),
	tile: text().notNull(),
	patron: text().notNull().default(''),
	dedication: text().notNull().default(''),
	isDeceased: integer({ mode: 'boolean' }).notNull().default(false)
});
