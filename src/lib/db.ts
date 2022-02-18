import { Db, MongoClient } from 'mongodb';
import config from 'src/config';

let db: Db;
async function getDB() {
  if (!db) {
    const mongoClient = new MongoClient(config.mongoConnectURL, {
      maxPoolSize: 10,
    });
    await mongoClient.connect();

    db = mongoClient.db(config.mongoDBName);
  }

  return db;
}

export async function getCollection<T = any>(collectionName: string) {
  const db = await getDB();
  return db.collection<T>(collectionName);
}
