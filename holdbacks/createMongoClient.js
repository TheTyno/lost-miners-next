const { MongoClient, ServerApiVersion } = require("mongodb");

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

    // Connect to MongoDB
    await client.connect();

    console.log("Connected to MongoDB successfully");

    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    return null; // Returning null instead of false for better consistency
  }
};

module.exports = createMongoClient;
