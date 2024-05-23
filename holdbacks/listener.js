const createMongoClient = require("./createMongoClient");

const updateMongo = async (miner, strategy) => {
  const { MONGO_ENDPOINT, MONGO_DB_NAME, MONGO_COLLECTION } = process.env;
  let mongoClient;

  try {
    mongoClient = await createMongoClient(MONGO_ENDPOINT);

    const mongoDb = await mongoClient.db(MONGO_DB_NAME);
    const collection = await mongoDb.collection(MONGO_COLLECTION);
    console.log(`Collection instance generated successfully`);
    if (strategy === "add") {
      const found = await collection.findOne({ id: miner.id });
      if (found) {
        console.log(`Miner ${miner.id} already exists on MongoDB`);
        return true;
      }
      return await collection.insertOne(miner);
    } else if (strategy === "remove") {
      return await collection.deleteOne({ id: miner.id });
    }
  } catch (error) {
    console.log(`Could not update MongoDB: ${error}`);
  } finally {
    if (mongoClient) {
      try {
        await mongoClient.close();
      } catch (error) {
        console.log(`Error closing MongoDB client: ${error}`);
      }
    }
  }
};


