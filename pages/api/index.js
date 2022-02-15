import { connection } from '../../lib/mongodb';

export default async function handler(request, response) {
  const { database } = await connection();

  if (request.method === 'GET') {
    const filters = {};

    let limit = 0;

    if (request.query.search) {
      filters['dedicated_to'] = new RegExp(request.query.search, 'i');
      limit = 10;
    }

    response
      .status(200)
      .json(
        await database
          .collection('pave_stone')
          .find(filters)
          .limit(limit)
          .sort({ dedicated_to: 1 })
          .toArray()
      );
  } else if (request.method === 'POST') {
    const { insertedId } = await database
      .collection('pave_stone')
      .insertOne({ ...request.body, date: Date.now() });

    response.status(200).json({ _id: insertedId, ...request.body });
  }
}
