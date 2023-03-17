import { BtnFull } from "../../Input/Buttons/Button";
import { MultiTextBox, TextInputLabel } from "../../Input/TextInput/TextInput";
import { Heading_Large } from "../../Typography/Typography";
import classes from "./_edit_profile.module.scss";
import { useRef } from "react";
import axios from "axios";
import { showNofication } from "../../stateless/Notification/Notification";
import Router from "next/router";
const EditProfileModel = (props) => {
  const bioRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const postalCodeRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();

  const edit_profile_request = async (e) => {
    e.preventDefault();
    const bio = bioRef.current.value;
    const phone = phoneRef.current.value;
    const postalCode = postalCodeRef.current.value;
    const street = streetRef.current.value;
    const city = cityRef.current.value;
    const country = countryRef.current.value;

    try {
      const data = await axios({
        url: `/api/profile/complete/${props.userId}`,
        method: props.defaultValues ? "PATCH" : "POST",
        data: {
          bio,
          phone,
          postalCode,
          street,
          city,
          country,
        },
      });

      if (data) props.toggleModel(false);
      showNofication(
        "Profile edit successfully. Automatically reloading page.",
        "success",
        () => {
          Router.reload();
        }
      );
    } catch (error) {
      if (error) {
        showNofication(error.response.data.message, "error", () => {});
      }
    }
  };

  return (
    <form className={classes.Main} onSubmit={edit_profile_request}>
      <Heading_Large>Edit Profile</Heading_Large>
      <div
        className={[
          classes.Main__Container,
          classes.Main__Container__Custom,
        ].join(" ")}
      >
        <MultiTextBox
          label="Type a brief bio"
          htmlFor="bio"
          rows={5}
          required
          ref={bioRef}
          value={props?.defaultValues?.bio}
        />
        <div className={classes.TopRight}>
          <TextInputLabel type="email" label="Enter your email" />
          <TextInputLabel
            label="Enter your phone number"
            type="tel"
            required
            ref={phoneRef}
            value={props?.defaultValues?.phone}
          />
        </div>
        <TextInputLabel
          label="Enter your postal code"
          required
          ref={postalCodeRef}
          value={props?.defaultValues?.postalCode}
        />
        <TextInputLabel
          label="Enter your street address"
          required
          ref={streetRef}
          value={props?.defaultValues?.street}
        />
        <TextInputLabel
          label="Enter your city"
          required
          ref={cityRef}
          value={props?.defaultValues?.city}
        />
        <TextInputLabel
          label="Enter your country"
          required
          ref={countryRef}
          value={props?.defaultValues?.country}
        />
        <BtnFull>Update Profile</BtnFull>
        {/* <div className={classes.Map}>Map</div> */}
      </div>
    </form>
  );
};

export default EditProfileModel;
