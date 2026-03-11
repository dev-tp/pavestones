import { drizzle } from 'drizzle-orm/better-sqlite3';
import { parseFromString } from 'dom-parser';
import fs from 'fs/promises';

import { pavestone } from './src/lib/server/db/schema.js';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

const database = drizzle({
	casing: 'snake_case',
	connection: process.env.DATABASE_URL
});

const file = await fs.readFile('./src/lib/assets/cathedral.svg', { encoding: 'utf8' });
const paths = parseFromString(file).getElementsByTagName('path');

/** @type {Pick<typeof pavestone.$inferSelect, 'id'>[]} */
const values = [];

for (let id = 1; id <= paths.length; id++) {
	values.push({ id });
}

console.log('Inserting parsed values into `pavestone`');

for (let i = 0, limit = 6144; i < values.length; i += limit) {
	await database.insert(pavestone).values(values.slice(i, i + limit));
	process.stdout.write(`\r${Math.floor(((i + limit) / values.length) * 100)}%`);
}

console.log('\nDone!');
