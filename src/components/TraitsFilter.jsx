import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import traits from "../assets/traits.json";
import TraitsSelect from "./TraitSelect";

const _removeTrait = (trait, value, setTraitsState) => {
  return setTraitsState((prevState) => {
    const newState = {
      ...prevState,
      [trait]: prevState[trait].filter((element) => element !== value),
    };
    return newState;
  });
};

const TraitsFilter = ({ traitsState, setTraitsState }) => (
  <>
    <Accordion>
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
              options={traits[trait]}
              traitsState={traitsState}
              setTraitsState={setTraitsState}
            />
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      {Object.entries(traitsState).map(([trait, values]) =>
        values.map((value) => (
          <Chip
            key={value}
            variant="outlined"
            label={`${trait}: ${value}`}
            sx={{ color: "silver" }}
            onDelete={() => _removeTrait(trait, value, setTraitsState)}
          />
        ))
      )}
    </Box>
  </>
);

export default TraitsFilter;
