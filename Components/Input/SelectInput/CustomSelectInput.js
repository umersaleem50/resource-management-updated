import React from "react";
import ReactDOM from "react-dom";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { branches as initialOptions } from "../../../Dev-Data/branches";
function CustomSelectInput(props) {
  const [inputValue, setInputValue] = React.useState("");
  // const [options, setOptions] = React.useState(props.options || initialOptions);

  return (
    <Autocomplete
      options={props.options}
      noOptionsText="Enter to create a new option"
      getOptionLabel={(option) => option.title}
      onInputChange={(e, newValue) => {
        props.setInputValue(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select"
          variant="outlined"
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              props.options.findIndex((o) => o.title === props.inputValue) ===
                -1
            ) {
              props.setOptions((o) => o.concat({ title: props.inputValue }));
            }
          }}
        />
      )}
    />
  );
}

export default CustomSelectInput;
