const createMongoClient = require('./createMongoClient')

const holdbacksSnapshot = require('./holdbacksSnapshot.json')

/**
 * This script will initialize a MongoDB with the current BPX holdback miners,
 * a snapshot of that miners list is needed.
 * @param {object} snapshot array of miners metadata
 * @param {string} mongoEndpoint example: mongodb+srv://<user>:<password>@<user>.ekui24q.mongodb.net/?retryWrites=true&w=majority&appName=<ClusterName>
 * @param {string} mongoCollection name of the collection where holdback miners will be stored
 */
const main = async (snapshot, mongoEndpoint, mongoDbName ,mongoCollectionName) => {
  const mongoClient = await createMongoClient(mongoEndpoint)

  if(!mongoClient) throw new Error('Could not get MongoDB collection instance')

  // Insert all miners into the collection
  try{
    console.log(`Getting database ${mongoDbName} and collection ${mongoCollectionName} instances`)
    const mongoDb = await mongoClient.db(mongoDbName)
    const collection = await mongoDb.collection(mongoCollectionName)

    console.log(`Inserting Miners into MongoDB ${mongoCollectionName} collection `)
    await collection.insertMany(snapshot)
    console.log('All miners inserted')
  }catch(error){
    console.error(`Failed inserting miners list: ${error.message}`)
  }

  console.log('Closing connection to MongoDB')
  await mongoClient.close()
}

const { MONGO_ENDPOINT, MONGO_DB_NAME ,MONGO_COLLECTION } = process.env

main(holdbacksSnapshot, MONGO_ENDPOINT, MONGO_DB_NAME, MONGO_COLLECTION)