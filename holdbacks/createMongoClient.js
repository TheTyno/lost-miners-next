const { MongoClient, ServerApiVersion } = require('mongodb');

const createMongoClient = async (mongoEndpoint) => {
    try{
        console.log('Opening connection to MongoDB')
        const client = new MongoClient(mongoEndpoint, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });
        
        return await client.connect();
    }catch(error){
        console.error(error.message)
        return false
    }
}

module.exports = createMongoClient