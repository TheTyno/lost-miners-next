
/**
 * This function listens in real time all transactions 
 * within the Lost Miners collection an updates a MongoDB dataset
 * @param {string} evmEndpoint example: https://mainnet.infura.io/v3/<<personal_key>>
 * @param {string} mongoEndpoint example: mongodb+srv://<user>:<password>@<user>.ekui24q.mongodb.net/?retryWrites=true&w=majority&appName=<ClusterName>
 */
const listen = async (evmEndpoint, mongoEndpoint) => {

}

const { EVM_ENDPOINT, MONGO_ENDPOINT } = process.env

listen(EVM_ENDPOINT, MONGO_ENDPOINT)