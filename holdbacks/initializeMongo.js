const createMongoClient = require("./createMongoClient");

const holdbacksSnapshot = require("./holdbacksSnapshot.json");

/**
 * This script will initialize a MongoDB with the current BPX holdback miners,
 * a snapshot of that miners list is needed.
 * @param {object} snapshot array of miners metadata
 */
const main = async (snapshot) => {
  const { MONGO_ENDPOINT, MONGO_DB_NAME, MONGO_COLLECTION } = process.env;

  const mongoClient = await createMongoClient(MONGO_ENDPOINT);

  if (!mongoClient)
    throw new Error("Could not get MongoDB collection instance");

  // Insert all miners into the collection
  try {
    console.log(
      `Getting database ${MONGO_DB_NAME} and collection ${MONGO_COLLECTION} instances`
    );
    const mongoDb = await mongoClient.db(MONGO_DB_NAME);
    const collection = await mongoDb.collection(MONGO_COLLECTION);

    console.log(
      `Inserting Miners into MongoDB ${MONGO_COLLECTION} collection `
    );
    await collection.insertMany(snapshot);
    console.log("All miners inserted");
  } catch (error) {
    console.error(`Failed inserting miners list: ${error.message}`);
  }

  console.log("Closing connection to MongoDB");
  await mongoClient.close();
};

main(holdbacksSnapshot);
