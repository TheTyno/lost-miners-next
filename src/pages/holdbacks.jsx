import { useState, useEffect } from "react";
import {
  Grid,
  Alert,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import TraitsFilter from "../components/TraitsFilter";
import Card from "../components/Card";
import Link from "next/link";

const CircularLoading = () => (
  <div style={{ textAlign: "center" }}>
    <CircularProgress
      sx={{ margin: "auto" }}
      thickness={5}
      disableShrink={true}
    />
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{ fontWeight: "bold" }}
    >
      Loading...
    </Typography>
  </div>
);

// Home function that is reflected across the site
export default function Holdbacks() {
  const lostMinersPicturesURL =
    "https://ipfs.io/ipfs/QmUGziYHGuwJQG9K4Buaxmh2f7gUsfi2HbAVub9yA4WQ1a";
  const traitsInitialState = {
    Background: [],
    Backpack: [],
    Body: [],
    Clothing: [],
    Eyes: [],
    Face: [],
    "Facial Hair": [],
    Hair: [],
    Head: [],
    Headlamp: [],
  };
  const [traitsState, setTraitsState] = useState(traitsInitialState);
  const [miners, setMiners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forgottensLoading, setForgottensLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    // Check if cached data and its timestamp are present in localStorage
    const cachedMiners = localStorage.getItem("cachedMiners");
    const cachedMinersTimestamp = localStorage.getItem("cachedMinersTimestamp");

    if (cachedMiners && cachedMinersTimestamp) {
      const currentTime = new Date().getTime();
      const storedTimestamp = parseInt(cachedMinersTimestamp, 10);

      // Check if the data is still valid (within the 5 min TTL)
      if (currentTime - storedTimestamp <= 5 * 60 * 1000) {
        setMiners(JSON.parse(cachedMiners));
        setLoading(false);
        setFetchError("");
        return;
      }
    }

    fetch("/api/miners")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Request failed");
        }

        return res.json();
      })
      .then((_miners) => {
        setMiners(_miners);
        // Cache the fetched miners in localStorage for 5 mins to improve performance
        localStorage.setItem("cachedMiners", JSON.stringify(_miners));
        localStorage.setItem(
          "cachedMinersTimestamp",
          new Date().getTime().toString()
        );
        setLoading(false);
        setFetchError("");
      })
      .catch((error) => {
        setFetchError(
          "Ups! We could not retrieve the miners this time, try again later :)"
        );
        setLoading(false);
      });
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ fontWeight: "bold", alignTest: "center" }}
        >
          MINERS OWNED BY BLOKPAX
        </Typography>
      </Grid>
      <Grid item>
        <Link href="/forgottens">
          {" "}
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: 1, fontWeight: "bold" }}
            disabled={forgottensLoading}
            onClick={() => setForgottensLoading(true)}
          >
            {forgottensLoading ? <CircularProgress /> : "Go to Forgottens List"}
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <TraitsFilter
          traitsState={traitsState}
          setTraitsState={setTraitsState}
        />
      </Grid>
      <Grid item>
        <Grid container direction="row">
          {!loading && !fetchError && (
            <>
              <Alert
                severity="success"
                variant="filled"
                sx={{ margin: 2, fontWeight: "bold" }}
              >
                At the moment BLOKPAX owns {miners.length} Lost Miners
              </Alert>
              <Alert
                severity="info"
                variant="filled"
                sx={{ margin: 2, fontWeight: "bold" }}
              >
                Click on any Miner to check it on OpenSea
              </Alert>
            </>
          )}
        </Grid>
      </Grid>
      {fetchError && (
        <Grid item>
          <Typography variant="h4">{fetchError}</Typography>
        </Grid>
      )}
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {miners
            .filter((miner) => {
              const traitsSelected = [];
              Object.values(traitsState).forEach((value) =>
                traitsSelected.push(...value)
              );

              const flag = Object.entries(traitsState).every(function ([
                trait,
                values,
              ]) {
                if (values.length === 0) {
                  return true;
                }

                for (let minerTrait of miner.attributes) {
                  const { trait_type, value } = minerTrait;
                  if (trait === trait_type) {
                    return values.includes(value);
                  }
                }
              });

              return traitsSelected.length === 0 ? true : flag;
            })
            .map((miner) => (
              <>
                <Card
                  key={miner.id}
                  minerId={miner.id}
                  picture={`${lostMinersPicturesURL}/${miner.id}.png`}
                />
              </>
            ))}
        </Grid>
      </Grid>
      <Grid item>{loading && <CircularLoading />}</Grid>
    </Grid>
  );
}
