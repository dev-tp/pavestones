import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (!process.env.MONGODB_DB_NAME) {
  throw new Error('Please add your Mongo database name to .env.local');
}

let client = null;
let database = null;

export async function connection() {
  if (client && database) {
    return { client, database };
  }

  client = await MongoClient.connect(process.env.MONGODB_URI);
  database = client.db(process.env.MONGODB_DB_NAME);

  return { client, database };
}
