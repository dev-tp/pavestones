import { connection } from '../../lib/mongodb';

export default async function handler(request, response) {
  const { database } = await connection();

  if (request.method === 'GET') {
    response
      .status(200)
      .json(await database.collection('pave_stone').find({}).toArray());
  } else if (request.method === 'POST') {
    const { insertedId } = await database
      .collection('pave_stone')
      .insertOne({ ...request.body, date: Date.now() });

    response.status(200).json({ _id: insertedId, ...request.body });
  }
}
