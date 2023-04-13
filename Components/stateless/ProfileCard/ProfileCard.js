import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Skeleton } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import classes from "./ProfileCard.module.scss";

export default function ProfileCard(props) {
  console.log(props);
  return (
    <Card
      sx={{ maxWidth: 345, backgroundColor: blue[100] }}
      className={classes["Card"]}
    >
      <CardMedia
        className={classes["Card__CoverPicture"]}
        sx={{ height: 140 }}
        image={`/storage/images/coverPicture/${props.coverPicture}`}
        title={props.fullName || `User's cover picture`}
      ></CardMedia>
      <CardContent className={classes["Card__Content"]}>
        <Avatar
          src={`/storage/images/profilePicture/${props.profilePicture}`}
          className={classes["Card__Avatar"]}
          sx={{
            maxWidth: 70,
            maxHeight: 70,
            width: "100%",
            height: "100%",
          }}
        ></Avatar>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          color={grey[700]}
          fontWeight={500}
        >
          {props.fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.bio}
        </Typography>
      </CardContent>
      <CardActions className={classes["Card__Actions"]}>
        <Button size="small">Show Profile</Button>
      </CardActions>
    </Card>
  );
}
