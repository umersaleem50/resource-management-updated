import React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { bool } from "prop-types";
import { object } from "prop-types";

function CustomSelectInput(props) {
  // const [inputValue, setInputValue] = React.useState("");
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
          required={props.required}
          {...params}
          label="Select"
          variant="outlined"
          onKeyDown={(e) => {
            if (
              !props.anyValue &&
              e.key === "Enter" &&
              props.options.findIndex(
                (o) => (o.title === props.inputValue) === -1
              )
            ) {
              props.setOptions((o) => o.concat({ title: props.inputValue }));
            }
          }}
        />
      )}
    />
  );
}

CustomSelectInput.propTypes = {
  required: bool,
  options: object,
};

export default CustomSelectInput;
