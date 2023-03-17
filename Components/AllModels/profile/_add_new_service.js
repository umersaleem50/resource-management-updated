import axios from "axios";
import Router from "next/router";
import { useRef, useState } from "react";
import { BtnFull } from "../../Input/Buttons/Button";
import {
  MultiTextBox,
  SelectInput,
  TextInputLabel,
} from "../../Input/TextInput/TextInput";
import { showNofication } from "../../stateless/Notification/Notification";
import { Heading_Large } from "../../Typography/Typography";
import classes from "./_add_new_service.module.scss";

const AddNewService = (props) => {
  const [type, setType] = useState("service");
  const titleRef = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const typeOfRef = useRef();
  const submit_new_service_request = async (e) => {
    e.preventDefault();
    try {
      const title = titleRef.current?.value;
      const name = nameRef.current?.value;
      const description = descriptionRef.current?.value;
      const typeOf = typeOfRef.current?.textContent;

      const request = await axios({
        url: `/api/service/${props.otherData}`,
        method: "POST",
        data: {
          title,
          name,
          description,
          type: typeOf,
        },
      });
      if (request) {
        props.toggleModel(false);
        showNofication(`${type} created successfully`, "success", () =>
          Router.reload()
        );
      }
    } catch (error) {
      console.log(error);
      showNofication(error?.response?.data?.message, "error");
    }
  };

  return (
    <form
      className={classes.AddNewService}
      onSubmit={submit_new_service_request}
    >
      <Heading_Large>Add new {type || "Service"}</Heading_Large>
      <SelectInput
        category={["service", "product"]}
        onSelect={(selected) => setType(selected)}
        ref={typeOfRef}
      ></SelectInput>
      <TextInputLabel
        type="text"
        ref={nameRef}
        label={`Enter the name of ${type || "service"}`}
        placeHolder={`eg. ${type === "service" ? "painting" : "paint"}`}
      ></TextInputLabel>
      <TextInputLabel
        ref={titleRef}
        type="text"
        label={`Enter the title for ${type || "service"}`}
        placeHolder={`Best ${
          type === "service" ? "painting service" : "paint product"
        } in your area`}
      />

      <MultiTextBox
        ref={descriptionRef}
        placeHolder={`Enter the details about ${
          props.type?.toLowerCase() || "service"
        }`}
      ></MultiTextBox>
      <BtnFull style={{ width: "100%" }}>Submit</BtnFull>
    </form>
  );
};

export default AddNewService;
