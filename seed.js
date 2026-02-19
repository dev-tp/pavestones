import fs from 'fs/promises';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { parseFromString } from 'dom-parser';

import { pavestone, section } from './src/lib/server/db/schema.js';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

const database = drizzle({
	casing: 'snake_case',
	connection: process.env.DATABASE_URL
});

const file = await fs.readFile('./images/cathedral-color.svg', { encoding: 'utf8' });
const paths = parseFromString(file).getElementsByTagName('path');

console.log('Parsing SVG tree...');

const sections = {
	'#527ca5': 1, // Cyan
	'#5f7f3f': 2, // Green
	'#a5527c': 3, // Magenta
	'#5f007f': 4, // Purple
	'#ff9f7f': 5 // Rose
};

/** @type {Pick<import('./src/lib/server/db/schema.js').Pavestone, 'sectionId' | 'tile'>[]} */
const values = [];

for (let i = 0; i < paths.length; i++) {
	const path = paths[i];
	let fill = path.getAttribute('fill');

	if (fill === null) {
		fill = path.parentNode.getAttribute('fill');
	}

	values.push({
		sectionId: sections[fill],
		tile: path.getAttribute('d')
	});
}

console.log('Populating `section` table');

await database
	.insert(section)
	.values([
		{ color: 'cyan' },
		{ color: 'green' },
		{ color: 'magenta' },
		{ color: 'purple' },
		{ color: 'rose' }
	]);

console.log('Inserting parsed values into `pavestone`');

for (let i = 0, limit = 6144; i < values.length; i += limit) {
	await database.insert(pavestone).values(values.slice(i, i + limit));
	process.stdout.write(`\r${Math.floor(((i + limit) / values.length) * 100)}%`);
}

console.log('\nDone!');
