import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

function getStyles(option, optionsSelected, theme) {
  return {
    fontWeight:
      optionsSelected.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function TraitSelect({
  name,
  options,
  traitsState,
  setTraitsState,
}) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTraitsState((prevState) => ({
      ...prevState,
      [name]: typeof value === "string" ? value.split(",") : value,
    }));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} size="small">
        <InputLabel id="demo-multiple-chip-label" sx={{ fontWeight: "bold" }}>
          {name}
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={traitsState[name]}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={name} />}
          MenuProps={MenuProps}
          sx={{ fontWeight: "bold" }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, traitsState[name], theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
