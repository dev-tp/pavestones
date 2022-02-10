import { connection } from '../../lib/mongodb';

export default async function handler(_, response) {
  const { database } = await connection();

  response
    .status(200)
    .json(await database.collection('pave_stone').find({}).toArray());
}
