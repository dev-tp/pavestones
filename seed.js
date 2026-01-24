import fs from 'fs/promises';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import { pavestone } from './src/lib/server/db/schema.js';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

const database = drizzle({
	casing: 'snake_case',
	connection: process.env.DATABASE_URL
});

const file = await fs.readFile('./images/cathedral-color.svg', { encoding: 'utf8' });
const matches = [];

for (const match of file.matchAll(/d="(?<tile>[^"]+)"/g)) {
	matches.push({ tile: match.groups.tile });
}

for (let i = 0, limit = 8191, processed = 0; i < matches.length; i += limit) {
	const values = matches.slice(i, i + limit);
	await database.insert(pavestone).values(values);

	processed += values.length;

	console.log(Math.floor((processed / matches.length) * 100) + '%');
}
