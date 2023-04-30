import { Button, Typography } from "@mui/material";
import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import classes from "./Market.module.scss";
import Service_Market from "../../Components/stateless/Service_Market/Service_Market";
import { useEffect, useState } from "react";
import { showSnackBar } from "../../next-utils/helper_functions";
import { enqueueSnackbar } from "notistack";
const Market = (props) => {
  const [services, setServices] = useState([]);
  const [result, setResults] = useState(0);
  const fetch_latest_services = async () => {
    try {
      const results = await fetch_latest_services();
      console.log(results);
      if (results.status === "success") {
        setServices(results.data);
        setResults(results.results);
      }
    } catch (error) {
      if (error.status === "error")
        return showSnackBar(enqueueSnackbar, error.message, "error");

      showSnackBar(
        enqueueSnackbar,
        "Failed to fetch latest services or products",
        "error"
      );
    }
  };

  const generateServices = (services) => {};

  useEffect(() => {
    // fetch_latest_services();
  }, []);

  return (
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
            Market Place
          </Button>
          <Button sx={{ mb: 2 }} variant="text">
            Your Products & Services
          </Button>
          <Button sx={{ mb: 2 }} variant="text">
            Your Orders
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
              Market Place
            </Typography>
          </div>
          <div className={classes["Right__Search"]}>
            <div>
              <TextField
                id="input-with-icon-textfield"
                placeholder="Search product or service"
                sx={{ width: 300 }}
                onChange={(e) => {
                  if (e.target.value === "") this.fetchLatestTasks();
                }}
                onKeyDown={(e) => {
                  if (e.code === "Enter")
                    this.searchTaskHandler(e.target.value);
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
              Total Results: {0}
            </Typography>
          </div>

          <div className={classes["Right__Results"]}>
            <Service_Market
              type={"Product"}
              heading={"This is dummy heading"}
              description={"This is dummy description"}
              fullName={"This is dummy fullName"}
              profilPicture={"default-profilePicture.jpeg"}
              provider_id={""}
            />
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export async function getServerSideProps(context) {
  return { props: {} };
}

export default Market;
