import { Typography, TextField, Divider, Button } from "@mui/material";
import { useState } from "react";
import classes from "./Model_Edit_Service.module.scss";
import { useRef } from "react";
import { edit_service_request } from "../../../../services/pages/service";
import CustomSelectInput from "../../../Input/SelectInput/CustomSelectInput";
import { serviceType } from "../../../../Dev-Data/branches";
const Model_Edit_Service = (props) => {
  const [name, setName] = useState(props.name || "");
  const [heading, setHeading] = useState(props.heading || "");
  const [description, setDescription] = useState(props.description || "");
  const [type, setType] = useState(props.type || "");

  const [detailHeading1, setDetailHeading1] = useState(
    props.detailHeading1 || ""
  );
  const [detailHeading2, setDetailHeading2] = useState(
    props.detailHeading2 || ""
  );
  const [detailHeading3, setDetailHeading3] = useState(
    props.detailHeading3 || ""
  );

  const [detailText1, setDetailText1] = useState(props.detailText1 || "");
  const [detailText2, setDetailText2] = useState(props.detailText2 || "");
  const [detailText3, setDetailText3] = useState(props.detailText3 || "");

  const detailImage1 = useRef(null);
  const detailImage2 = useRef(null);
  const detailImage3 = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefautl();
    try {
      const results = await edit_service_request({});
    } catch (error) {}
  };
  return (
    <form className={classes["Form"]} onSubmit={onSubmit}>
      <Typography
        className={classes["Form__Heading"]}
        variant="h5"
        component={"h5"}
      >
        Create Sub Account
      </Typography>
      <Typography
        className={classes["Form__Heading"]}
        variant="body1"
        component={"p"}
      >
        Here you can create a sub account for your team member
      </Typography>

      <Divider sx={{ marginBottom: "1rem" }}></Divider>
      <CustomSelectInput
        options={serviceType}
        inputValue={type}
        setInputValue={setType}
      />
      <TextField
        type="text"
        required
        variant="standard"
        placeholder="Enter the name of your service"
        label={"Name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        type="text"
        required
        variant="standard"
        placeholder="Enter the description for service"
        label={"Description"}
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
      />
      <TextField
        type="text"
        required
        variant="standard"
        placeholder="Enter the description for service"
        label={"Description"}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Divider sx={{ mt: 2 }}></Divider>
      <Typography
        className={classes["Form__Heading"]}
        variant="h5"
        component={"p"}
        sx={{ mt: 2 }}
      >
        Feature 1
      </Typography>
      <Button variant="outlined" component="label">
        Update Image
        <input
          hidden
          accept="image/*"
          type="file"
          ref={detailImage1}
          onChange={() => {}}
        />
      </Button>
      <TextField
        type="text"
        required
        variant="standard"
        placeholder="Enter the heading for the feature"
        label={"Heading"}
        value={detailHeading1}
        onChange={(e) => setDetailHeading1(e.target.value)}
      />
      <TextField
        type="text"
        required
        variant="standard"
        placeholder="Enter the heading for the feature"
        label={"Description"}
        value={detailText1}
        onChange={(e) => setDetailText1(e.target.value)}
      />
      <Divider sx={{ mt: 2 }}></Divider>
      <Typography
        className={classes["Form__Heading"]}
        variant="h5"
        component={"p"}
        sx={{ mt: 2 }}
      >
        Feature 2
      </Typography>
      <Button variant="outlined" component="label">
        Update Image
        <input
          hidden
          accept="image/*"
          type="file"
          ref={detailImage2}
          onChange={() => {}}
        />
      </Button>
      <TextField
        type="text"
        required
        variant="standard"
        placeholder="Enter the heading for the feature"
        label={"Heading"}
        value={detailHeading2}
        onChange={(e) => setDetailHeading2(e.target.value)}
      />
      <TextField
        type="text"
        required
        variant="standard"
        placeholder="Enter the heading for the feature"
        label={"Description"}
        value={detailText2}
        onChange={(e) => setDetailText2(e.target.value)}
      />
      <Divider sx={{ mt: 2 }}></Divider>
      <Typography
        className={classes["Form__Heading"]}
        variant="h5"
        component={"p"}
        sx={{ mt: 2 }}
      >
        Feature 3
      </Typography>
      <Button variant="outlined" component="label">
        Update Image
        <input
          hidden
          accept="image/*"
          type="file"
          ref={detailImage3}
          onChange={() => {}}
        />
      </Button>
      <TextField
        type="text"
        required
        variant="standard"
        placeholder="Enter the heading for the feature"
        label={"Heading"}
        value={detailHeading3}
        onChange={(e) => setDetailHeading3(e.target.value)}
      />
      <TextField
        type="text"
        required
        variant="standard"
        placeholder="Enter the heading for the feature"
        label={"Description"}
        value={detailText3}
        onChange={(e) => setDetailText3(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Submit
      </Button>
    </form>
  );
};

export default Model_Edit_Service;
