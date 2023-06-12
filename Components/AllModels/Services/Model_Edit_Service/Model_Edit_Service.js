import { Typography, TextField, Divider, Button } from "@mui/material";
import { useState } from "react";
import classes from "./Model_Edit_Service.module.scss";
import { useRef } from "react";
import { service_request } from "../../../../services/pages/service";
import CustomSelectInput from "../../../Input/SelectInput/CustomSelectInput";
import { serviceType } from "../../../../Dev-Data/branches";
import { showSnackBar } from "../../../../next-utils/helper_functions";
import { enqueueSnackbar } from "notistack";
import Router from "next/router";

const Model_Edit_Service = (props) => {
  const [title, setTitle] = useState(props.title || "");
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

  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formDate = new FormData();
    formDate.append("type", type);
    formDate.append("title", title);
    formDate.append("heading", heading);
    formDate.append("description", description);
    formDate.append("details[0][heading]", detailHeading1);
    formDate.append("details[0][description]", detailText1);
    formDate.append("details[0][photo]", photo1);
    formDate.append("details[1][heading]", detailHeading2);
    formDate.append("details[1][description]", detailText2);
    formDate.append("details[1][photo]", photo2);
    formDate.append("details[2][heading]", detailHeading3);
    formDate.append("details[2][description]", detailText3);
    formDate.append("details[2][photo]", photo3);

    try {
      const results = await service_request(
        props.token,
        formDate,
        props.id,
        props.requestType || "PATCH"
      );
      console.log(results);
      if (results) {
        showSnackBar(
          enqueueSnackbar,
          "Successfully updated the service!",
          "success"
        );
        Router.reload();
      }
    } catch (error) {
      console.log(error);
      if (error.status === "error") {
        return showSnackBar(enqueueSnackbar, error.message, "error");
      }
      showSnackBar(enqueueSnackbar, "Failed to update the service.", "error");
    }
  };
  return (
    <form className={classes["Form"]} onSubmit={onSubmit}>
      <Typography
        className={classes["Form__Heading"]}
        variant="h5"
        component={"h5"}
      >
        {props.requestType === "POST" ? "Create" : "Edit"} Services
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
        placeholder="Enter the title for your service"
        label={"Title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        type="text"
        required
        variant="standard"
        placeholder="Enter the heading for service"
        label={"heading"}
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
          onChange={(e) => {
            setPhoto1(e.target.files[0]);
          }}
        />
      </Button>
      <TextField
        type="text"
        variant="standard"
        placeholder="Enter the heading for the feature"
        label={"Heading"}
        value={detailHeading1}
        onChange={(e) => setDetailHeading1(e.target.value)}
      />
      <TextField
        type="text"
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
          onChange={(e) => {
            setPhoto2(e.target.files[0]);
          }}
        />
      </Button>
      <TextField
        type="text"
        variant="standard"
        placeholder="Enter the heading for the feature"
        label={"Heading"}
        value={detailHeading2}
        onChange={(e) => setDetailHeading2(e.target.value)}
      />
      <TextField
        type="text"
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
          onChange={(e) => {
            setPhoto3(e.target.files[0]);
          }}
        />
      </Button>
      <TextField
        type="text"
        variant="standard"
        placeholder="Enter the heading for the feature"
        label={"Heading"}
        value={detailHeading3}
        onChange={(e) => setDetailHeading3(e.target.value)}
      />
      <TextField
        type="text"
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
