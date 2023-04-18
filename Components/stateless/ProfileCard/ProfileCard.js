import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Skeleton } from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";
import classes from "./ProfileCard.module.scss";
import Router from "next/router";

export default function ProfileCard(props) {
  return (
    <Card
      sx={{ maxWidth: 345, backgroundColor: grey["A200"] }}
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
            width: 70,
            height: 70,
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
        <Typography
          variant="body2"
          color={props.bio ? "text.secondary" : red[500]}
        >
          {props.bio ||
            "Please complete the profile, otherwise you won't able to perform certain tasks"}
        </Typography>
      </CardContent>
      <CardActions className={classes["Card__Actions"]}>
        <Button
          size="small"
          onClick={() => Router.push(`/profile/${props.id}`)}
        >
          Show Profile
        </Button>
      </CardActions>
    </Card>
  );
}
