const fs = require("fs/promises");
const _ = require("lodash");
const bpxWallets = require("./bpxWallets.json");

const openseaEndpoint = "https://api.opensea.io/api/v2";
const headers = { "x-api-key": process.env.OPENSEA_KEY };

async function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

/**
 * Takes a snapshot of the current miners being held on the provided list of BPX wallets.
 * Use Opensea API for simplicity
 */
async function main() {
  const holdbackMiners = [];

  for (let i = 0; i < bpxWallets.length; i++) {
    const currentWallet = bpxWallets[i];

    const response = await fetch(
      `${openseaEndpoint}/chain/ethereum/account/${currentWallet}/nfts?${new URLSearchParams(
        {
          collection: "lostminers",
        }
      )}`,
      { headers }
    );

    const { nfts } = await response.json();

    if (nfts.length > 0) {
      console.log(
        `Found ${nfts.length} Miners for wallet ${currentWallet}: ${nfts.map(
          (nft) => nft.identifier
        )}`
      );
      for (let j = 0; j < nfts.length; j++) {
        let success = false;
        while (!success) {
          const { metadata_url } = nfts[j];
          const metadataResponse = await fetch(metadata_url);
          if (metadataResponse.ok) {
            success = true;
            const metadata = await metadataResponse.json();
            holdbackMiners.push(metadata);
          } else {
            console.log(
              `Request for ${metadata_url} failed with status ${metadataResponse.status}, retrying.`
            );
            await sleep(5);
          }

          await sleep(0.1);
        }
      }
    }

    await sleep(0.1);
  }

  const jsonData = JSON.stringify(
    _.orderBy(holdbackMiners, "id", "asc"),
    null,
    2
  );

  await fs.writeFile("holdbacksSnapshot.json", jsonData);
}

main();
