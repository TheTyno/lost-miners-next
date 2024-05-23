import { useState } from "react";
import { Grid, Alert } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "../components/Card";
import unclaimedMiners from "../assets/forgottens.json";
import traits from "../assets/traits.json";
import TraitsSelect from "../components/TraitSelect";

import type { TraitsFields } from "../types/types"

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

  return <Grid item>
    <h1
      style={{
        textAlign: "center",
        color: "white",
      }}
    >
      THE FORGOTTENS
    </h1>
    <br />
    <Accordion
      sx={{
        backgroundColor: "#202121",
        color: "white",
        boxShadow: "none",
        borderStyle: "hidden",
        borderColor: "silver",
        fontSize: 14,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}>
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
              options={traits[trait as keyof TraitsFields]}
              setTraitsState={setTraitsState}
            />
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
    <Alert severity="info" variant="filled">
      Click on any Miner to check it on OpenSea
    </Alert>
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {unclaimedMiners
        .filter((miner) => {
          const traitsSelected = [];
          Object.values(traitsState).forEach((value) =>
            traitsSelected.push(...value)
          );

          const flag = Object.entries(traitsState).every(function([trait, values]: [string, string[]]){
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
  </Grid>;
}
