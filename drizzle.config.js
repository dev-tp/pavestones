import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema.js',
	dialect: 'sqlite',
	dbCredentials: { url: 'data/data.db' },
	verbose: true,
	strict: true,
	casing: 'snake_case'
});
