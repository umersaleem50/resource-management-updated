import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import { Typography, Button, TextField, InputAdornment } from "@mui/material";
import { PostAdd, Search } from "@mui/icons-material";
import Model from "../../Components/stateless/Model/Model";
import { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import classes from "./feeds.module.scss";
import Model_Add_Post from "../../Components/AllModels/Feeds/Model_Add_Post/Model_Add_Post";
import Feed_Post from "../../Components/stateless/Feed_Post/Feed_Post";
import { protected_route_next } from "../../next-utils/login_validation";
import { useJWTToken } from "../../next-utils/login_validation";
import { fetch_new_posts } from "../../services/pages/feeds";
import { func } from "prop-types";
import { showSnackBar } from "../../next-utils/helper_functions";
import { enqueueSnackbar } from "notistack";
const Feeds = (props) => {
  const [result, setResult] = useState(0);
  const [isToggle, setToggle] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [tags, setTags] = useState("");
  const fetchLatestFeeds = async (tag) => {
    try {
      const new_feeds = await fetch_new_posts(tag);
      if (new_feeds.status === "success") {
        setResult(new_feeds.results);
        setFeeds(new_feeds.data);
      }
    } catch (error) {
      if (error.status === "error") {
        return showSnackBar(enqueueSnackbar, error.message, "error");
      }
      return showSnackBar(
        enqueueSnackbar,
        "Failed to fetch the posts",
        "error"
      );
    }
  };

  const generate_posts = () => {
    return feeds.map((el, i) => {
      return (
        <Feed_Post
          key={i}
          id={`645a7cedeea9ab2d287fe257`}
          data={el}
          comments={el.comments}
        />
      );
    });
  };

  useEffect(() => {
    fetchLatestFeeds();
  }, []);

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
                    if (e.target.value === "") fetchLatestFeeds();
                  }}
                  onKeyDown={(e) => {
                    if (e.code === "Enter") fetchLatestFeeds(e.target.value);
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
              {generate_posts(feeds)}
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
    const id = await protected_route_next(context, false);

    return {
      props: {
        user_id: id,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: true,
        destination: "/auth/login",
      },
    };
  }
}

export default Feeds;
