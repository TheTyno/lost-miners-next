import cache from "memory-cache";
import getHolbacks from "../../services/getHolbacks";

export default async (req, res) => {
  const cachedMiners = cache.get("cachedMiners");

  if (cachedMiners) {
    console.log("Returning miners from cache");
    return res.status(200).json(cachedMiners);
  }

  const miners = await getHolbacks();

  if (!miners) {
    return res.status(500).json({ error: "Could not retrieve holdbacks" });
  }

  // Caching MongoDB response for 5 minutes
  cache.put("cachedMiners", miners, 5 * 60 * 1000);

  return res.status(200).json(miners);
};
