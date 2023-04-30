import { Button, Typography } from "@mui/material";
import Profile_Mini from "../Profile_Mini/Profile_Mini";
import MenuOptions from "../../stateful/Menu_Options/Menu_Options";
import classes from "./Service_Market.module.scss";
import { Save } from "@mui/icons-material";
import PropTypes from "prop-types";
import { grey } from "@mui/material/colors";
const settings_options = [
  {
    text: "Save to favourite",
    onClick: () => {},
    icon: <Save fontSize="small" />,
  },
];

const Service_Market = (props) => {
  return (
    <div
      className={classes["Container"]}
      style={{ backgroundColor: grey["A200"] }}
    >
      <div className={classes["Left"]}>
        <Typography variant="h6" component={"h6"} sx={{ marginBottom: 2 }}>
          {props.heading}
        </Typography>
        <Typography variant="body1" component={"p"} color={grey[700]}>
          {props.description}
        </Typography>
      </div>

      <div className={classes["Right"]}>
        <Profile_Mini
          profilPicture={props.profilePicture}
          type={props.type}
          fullName={props.fullName}
          id={props.provider_id}
        />
        <div className={classes["Right__Bottom"]}>
          <Button variant="contained">Show Details</Button>
          <MenuOptions settings={settings_options} />
        </div>
      </div>
    </div>
  );
};

Service_Market.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
  profilPicture: PropTypes.string,
  type: PropTypes.string,
  fullName: PropTypes.string,
  provider_id: PropTypes.string,
};

export default Service_Market;
