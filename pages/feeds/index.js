import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import { Typography, Button, TextField, InputAdornment } from "@mui/material";
import { PostAdd, Search } from "@mui/icons-material";
import Model from "../../Components/stateless/Model/Model";
import { useState } from "react";
import { grey } from "@mui/material/colors";
import classes from "./feeds.module.scss";
import Model_Add_Post from "../../Components/AllModels/Feeds/Model_Add_Post/Model_Add_Post";
import Feed_Post from "../../Components/stateless/Feed_Post/Feed_Post";

const Feeds = (props) => {
  const [result, setResult] = useState(0);
  const [isToggle, setToggle] = useState(false);
  return (
    <>
      <Model toggle={isToggle} onClose={() => setToggle(false)}>
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
              onClick={(e) => setToggle(true)}
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
                  placeholder="Search for the posts using tags"
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
              <Feed_Post id={`645a7cedeea9ab2d287fe257`} />
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { token } = useJWTToken(context);
    const id = await protected_route_next(context);

    return {
      props: {
        user: user.data,
        page_data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: true,
        destination: "/404",
      },
    };
  }
}

export default Feeds;
