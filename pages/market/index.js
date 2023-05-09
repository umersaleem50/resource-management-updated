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
import { fetch_latest_services } from "../../services/pages/service";
const Market = (props) => {
  const [services, setServices] = useState([]);
  const [result, setResults] = useState(0);
  const [searchTags, setSearchTags] = useState({});
  const fetch_services = async () => {
    try {
      const results = await fetch_latest_services(searchTags);

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

  const generateServices = (services) => {
    return services.map((service, i) => {
      return (
        <Service_Market
          key={i}
          type={service.type}
          heading={service.heading}
          description={service.description}
          fullName={service.provider.fullName}
          profilPicture={service.provider.profilePicture}
          provider_id={service.provider._id}
          coverPicture={service.coverPicture}
          service_id={service._id}
        />
      );
    });
  };

  useEffect(() => {
    // fetch_latest_services();
    fetch_services();
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
              Market Place
            </Typography>
          </div>
          <div className={classes["Right__Search"]}>
            <div>
              <TextField
                id="input-with-icon-textfield"
                placeholder="Search product or service"
                sx={{ width: 300 }}
                onChange={async (e) => {
                  if (e.target.value === "") {
                    setSearchTags({});
                    await fetch_services();
                  }
                }}
                onKeyDown={async (e) => {
                  if (e.code === "Enter") {
                    setSearchTags({ tags: e.target.value });

                    await fetch_services();
                  }
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
            {generateServices(services)}
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
