import { json } from '@sveltejs/kit';
import { eq, getTableColumns } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { donor, entry, pavestone } from '$lib/server/db/schema';

/** @type {import('../$types').RequestHandler} */
export async function GET() {
	return json(
		await db
			.select({ ...getTableColumns(pavestone), entry, donor })
			.from(pavestone)
			.leftJoin(entry, eq(pavestone.entryId, entry.id))
			.leftJoin(donor, eq(entry.donorId, donor.id))
	);
}
