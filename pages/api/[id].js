import { ObjectId } from 'mongodb';

import { connection } from '../../lib/mongodb';

export default async function handler(request, response) {
  const { database } = await connection();

  if (request.method === 'GET') {
    const results = await database
      .collection('pave_stone')
      .find({ _id: ObjectId(request.query.id) })
      .toArray();

    response.status(200).json(results[0]);
  } else if (request.method === 'POST') {
    const { _id, ...values } = request.body;

    await database
      .collection('pave_stone')
      .updateOne({ _id: ObjectId(_id) }, { $set: values });

    response.status(200).json(request.body);
  }
}
