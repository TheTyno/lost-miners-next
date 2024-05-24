# LOST MINERS FORGOTTENS AND HOLDBACKS

This repository consist of 2 different Apps:

- A NextJS app that host the actual Lost Miners Holdbacks and forgottens pages
- A listener script that listens onchain data in real time to update the holdbakcs list

## Whats needed

### an EVM endpoint like Infura

In order to listen for onchain data, we need to connect to an EVM endpoint. I recomend using Infura and set the websock endpoint into an env var called `EVM_ENDPOINT`

### MongoDB

As BPX owns about 3500 different wallets where HoldBacks miners are stored, then we need a way to track those holdbacks as requesting those 3500 wallets on runtime is impossible because of the amount of wallets.

Thats why we use MongoDB to store the holdbacks list and everytime the listener script intercept a new transfer from any BPX wallet, it updates MongoDB to be in sync.

We need the folling env variables:

`MONGO_ENDPOINT`: MongoDB endpint, **I suggest using MongoDB Atlas Free tier**
`MONGO_DB_NAME`: The name of the mongo database on the cluster we're connected to
`MONGO_COLLECTION` The name of the collection where to store the list of holdbakcs miners

### About the holdbacks directory

That directore holds the listener script that will listen for real time on chain data and update the MongoDB accordingly.

However, The MongDB has to be first initialized with the current BPX owned miners snapshot, thats why there's another util script called `initializeMongo` that receives this snapshot and populates MongoDB with those miners that are currently owned by BPX. This script should be ran once as after that the listener script should keep the mongodb in sync
