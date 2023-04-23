import { useState } from "react";
import classes from "./Model_Update_Profile.module.scss";
import { Divider, Typography, TextField, Button } from "@mui/material";
import MultiSelectChip from "../../Input/MultiSelectChip/MultiSelectChip";
import profession from "../../../Dev-Data/professions";
import { showSnackBar } from "../../../next-utils/helper_functions";
import { enqueueSnackbar } from "notistack";
import { update_profile_request } from "../../../services/pages/profile";
const Model_Update_Profile = (props) => {
  const INITIAL_EMAIL = props.data?.email;
  const INITIAL_FIRSTNAME = props.data?.firstName;
  const INITIAL_LASTNAME = props.data?.lastName;
  const INITIAL_PROFESSIONS = props.data?.professions;
  const INITIAL_BIO = props.data?.bio;
  const INITIAL_PHONE = props.data?.phone;
  const INITIAL_POSTAL = props.data?.postalCode;
  const INITIAL_STREET = props.data?.street;
  const INITIAL_CITY = props.data?.city;
  const INITIAL_COUNTRY = props.data?.country;

  const [email, setEmail] = useState(INITIAL_EMAIL || "");
  const [firstName, setFirstName] = useState(INITIAL_FIRSTNAME || "");
  const [lastName, setLastName] = useState(INITIAL_LASTNAME || "");
  const [bio, setBio] = useState(INITIAL_BIO || "");
  const [professions, setProfessions] = useState(INITIAL_PROFESSIONS || []);
  const [phone, setPhone] = useState(INITIAL_PHONE || "");
  const [postalCode, setPostalCode] = useState(INITIAL_POSTAL || "");
  const [street, setStreet] = useState(INITIAL_STREET || "");
  const [city, setCity] = useState(INITIAL_CITY || "");
  const [country, setCountry] = useState(INITIAL_COUNTRY || "");

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = await update_profile_request(
      {
        email: props.data.email === email ? undefined : email,
        firstName,
        lastName,
        bio,
        professions,
        phone,
        postalCode,
        street,
        city,
        country,
      },
      (props.page_data.type === "team-page" && props.data.id) || null
    );

    if (user.status === "success")
      showSnackBar(enqueueSnackbar, "Profile updated successfully!", "success");

    if (user.status === "failed") {
      // props.closeModel();
      showSnackBar(enqueueSnackbar, user.message, "error");
      return;
    }

    // } catch (error) {
    //   if (error.status === "failed") {
    //     props.closeModel();
    //     showSnackBar(enqueueSnackbar, error.message, "failed");
    //     return;
    //   }

    //   showSnackBar(
    //     enqueueSnackbar,
    //     "Something went wrong, try again later!",
    //     "error"
    //   );
    // }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={[classes["Form"], classes["Form--expend"]].join(" ")}
    >
      <div className={classes["Heading"]}>
        <Typography
          className={classes["Form__Heading"]}
          variant="h5"
          component={"h5"}
        >
          Update your profile
        </Typography>
        <Typography
          className={classes["Form__Heading"]}
          variant="body1"
          component={"p"}
        >
          Please update your profile with valid data
        </Typography>

        <Divider sx={{ m: "1rem 0" }} />
      </div>
      <TextField
        type="email"
        required
        variant="standard"
        placeholder="Enter a valid email"
        label={"Email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        type="text"
        label={"First Name"}
        required
        variant="standard"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Enter your first name"
      />
      <TextField
        type="text"
        label={"Last Name"}
        required
        variant="standard"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Enter your last name"
      />
      <MultiSelectChip
        label="Select Professions"
        options={profession}
        value={professions}
        setValue={setProfessions}
      />
      <TextField
        type="text"
        label={"Phone"}
        required
        variant="standard"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter your phone no"
      />
      <TextField
        type="number"
        label={"Postal Code"}
        required
        variant="standard"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="Enter your Postal Code"
      />
      <TextField
        type="text"
        label={"Steet"}
        required
        variant="standard"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        placeholder="Enter your Street Address"
      />
      <TextField
        type="text"
        label={"City"}
        required
        variant="standard"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter your City"
      />
      <TextField
        type="text"
        label={"Country"}
        required
        variant="standard"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Enter your Country"
      />

      <TextField
        type="text"
        label={"bio"}
        required
        multiline
        rows={5}
        variant="standard"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Enter your bio"
        className={classes["input--bio"]}
      />
      <Button
        className={classes["btn--submit"]}
        variant="contained"
        sx={{ m: "2rem 0" }}
        type="submit"
      >
        Update Profile
      </Button>
    </form>
  );
};

export default Model_Update_Profile;
