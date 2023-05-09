import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import { Typography, Button, TextField, InputAdornment } from "@mui/material";
import { PostAdd, Search } from "@mui/icons-material";
import Model from "../../Components/stateless/Model/Model";
import { useState } from "react";
import { grey } from "@mui/material/colors";
import classes from "./feeds.module.scss";
import Model_Add_Post from "../../Components/AllModels/Feeds/Model_Add_Post/Model_Add_Post";

const Feeds = (props) => {
  const [result, setResult] = useState(0);
  return (
    <>
      <Model toggle={true}>
        <Model_Add_Post />
      </Model>
      <MainContainer navbar>
        <div className={classes["Container"]}>
          <div className={classes["Left"]}>
            <div className={classes["Left__Top"]}>
              <Typography
                variant="body1"
                component={"p"}
                color={grey[800]}
                style={{ fontWeight: "500" }}
              >
                Menu
              </Typography>
            </div>
            <Button sx={{ mb: 2 }} variant="contained">
              Latest Feeds
            </Button>
            <Button
              sx={{ mb: 2 }}
              variant="outlined"
              color="success"
              startIcon={<PostAdd />}
            >
              Create a Post
            </Button>
            {/* <Button sx={{ mb: 2 }} variant="text">
          Your Products & Services
        </Button>
        <Button sx={{ mb: 2 }} variant="text">
          Your Orders
        </Button> */}
          </div>
          <div className={classes["Right"]}>
            <div className={classes["Left__Top"]}>
              <Typography
                variant="body1"
                component={"p"}
                color={grey[800]}
                style={{ fontWeight: "500" }}
              >
                Feeds
              </Typography>
            </div>
            <div className={classes["Right__Search"]}>
              <div>
                <TextField
                  id="input-with-icon-textfield"
                  placeholder="Search for the post"
                  sx={{ width: 300 }}
                  onChange={(e) => {
                    if (e.target.value === "") this.fetchLatestTasks();
                  }}
                  onKeyDown={(e) => {
                    if (e.code === "Enter") fetch_services(e.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
              </div>
              <Typography variant="body1" component={"p"}>
                Total Results: {result || 0}
              </Typography>
            </div>

            <div className={classes["Right__Results"]}>
              <p>put your feeds here</p>
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
};

export default Feeds;
