import { useState } from "react";
import {
  Grid,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "../components/Card";
import unclaimedMiners from "../assets/forgottens.json";
import traits from "../assets/traits.json";
import TraitsSelect from "../components/TraitSelect";
import Link from "next/link";

// Home function that is reflected across the site
export default function Home() {
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

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h2" color="text.secondary">
          THE FORGOTTENS
        </Typography>
      </Grid>
      <Grid item>
        <Link href="/holdbacks">
          {" "}
          <Button variant="contained" color="primary" sx={{ margin: 1 }}>
            Go to BPX Holdbacks List
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          >
            Traits Filter
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {Object.keys(traits).map((trait) => (
                <TraitsSelect
                  key={trait}
                  name={trait}
                  options={traits[trait]}
                  setTraitsState={setTraitsState}
                />
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item>
        <Alert severity="info" variant="filled" sx={{ margin: 2 }}>
          Click on any Miner to check it on OpenSea
        </Alert>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {unclaimedMiners
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

                for (let minerTrait of miner.metadata.attributes) {
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
                  key={miner.minerId}
                  minerId={miner.minerId}
                  claimPassId={miner.claimPassId}
                  picture={`${lostMinersPicturesURL}/${miner.minerId}.png`}
                />
              </>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}