const { MongoClient, ServerApiVersion } = require("mongodb");

/**
 * Opens a connection to a MongoDB database
 * @param {string} mongoEndpoint
 * @returns
 */
const createMongoClient = async (mongoEndpoint) => {
  try {
    console.log("Opening connection to MongoDB");

    const client = new MongoClient(mongoEndpoint, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();

    console.log("Connected to MongoDB successfully");

    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    return null;
  }
};

module.exports = createMongoClient;
