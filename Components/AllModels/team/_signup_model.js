import { useRef } from "react";
import { Heading_Large } from "../../../Components/Typography/Typography";
import {
  SelectInput,
  MultiSelect,
  TextInputLabel,
} from "../../../Components/Input/TextInput/TextInput";
import { BtnFull } from "../../../Components/Input/Buttons/Button";
import profession from "../../../Dev-Data/professions";
import { showNofication } from "../../../Components/stateless/Notification/Notification";
import classes from "./_signup_model.module.scss";
import axios from "axios";
import Router from "next/router";

const SignupModel = (props) => {
  const categoryRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const permissionRef = useRef();
  const professionRef = useRef();

  const send_request_create_account = async (e) => {
    e.preventDefault();
    let category = categoryRef.current.textContent;
    let firstName = firstNameRef.current.value;
    let lastName = lastNameRef.current.value;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    let permissions = permissionRef.current.textContent.split(",");
    let profession = [professionRef.current.textContent];
    // profession[0] = professionRef.current.textContent;

    try {
      const results = await axios({
        url: `/api/auth/signup/${props.otherData.id}`,
        method: "POST",
        data: {
          category,
          firstName,
          lastName,
          email,
          password,
          passwordConfirm: password,
          permissions,
          profession,
        },
      });
      console.log(results);
      if (results.status === 201) {
        // props.showNofication();
        return showNofication(
          "Account Created Successfully. Automatically reloading page.",
          "success",
          () => {
            Router.reload();
          }
        );
      }
    } catch (error) {
      if (error) {
        const { message } = error.response.data;
        return showNofication(message, "error", () => {});
      }
      console.log(error.response.data);
    }
  };

  return (
    <form className={classes.Main} onSubmit={send_request_create_account}>
      <Heading_Large>Create a sub account</Heading_Large>
      <div className={classes.Main__Container}>
        <SelectInput
          label="Select a category"
          category={props.category}
          ref={categoryRef}
          add
        ></SelectInput>
        <SelectInput
          category={profession}
          label="Choose profession"
          ref={professionRef}
        ></SelectInput>
        <MultiSelect
          category={props.otherData.permissions}
          label={"Select permissions"}
          ref={permissionRef}
          // title={"Choose the permissions"}
        ></MultiSelect>

        <TextInputLabel
          label="First Name"
          type="text"
          required
          htmlFor="firstname"
          placeHolder="Type Firstname"
          ref={firstNameRef}
        ></TextInputLabel>
        <TextInputLabel
          label="Last Name"
          ref={lastNameRef}
          type="text"
          required
          htmlFor="lastname"
          placeHolder="Type Lastname"
        ></TextInputLabel>
        <TextInputLabel
          label="Email"
          ref={emailRef}
          type="email"
          required
          htmlFor="email"
          placeHolder="Enter the email"
        ></TextInputLabel>
        <TextInputLabel
          ref={passwordRef}
          label="Password"
          type="password"
          htmlFor="password"
          placeHolder="Enter the password"
          minLength="8"
        ></TextInputLabel>

        <BtnFull width="full">Submit</BtnFull>
      </div>
    </form>
  );
};

export default SignupModel;
