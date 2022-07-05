import { ObjectId } from 'mongodb';

import { connection } from '../../lib/mongodb';

export default async function handler(request, response) {
  const { database } = await connection();

  switch (request.method) {
    case 'DELETE': {
      const result = await database
        .collection('pave_stone')
        .deleteOne({ _id: ObjectId(request.query.id) });

      return response.status(200).json({ ok: result.deletedCount === 1 });
    }
    case 'GET': {
      const results = await database
        .collection('pave_stone')
        .find({ _id: ObjectId(request.query.id) })
        .toArray();

      return response.status(200).json(results[0]);
    }
    case 'POST': {
      const { _id, ...values } = request.body;

      await database
        .collection('pave_stone')
        .updateOne({ _id: ObjectId(_id) }, { $set: values });

      return response.status(200).json(request.body);
    }
    default:
      return response.status(404).json({ message: 404 });
  }
}
