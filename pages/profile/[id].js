// import { BtnFull, BtnOptions } from "../../Components/Input/Buttons/Button";
import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import { useJWTToken } from "../../next-utils/login_validation";
import classes from "./Profile.module.scss";
import Section from "../../Components/stateless/Section/Section";
import ImageBox from "../../Components/ImageBox/ImageBox";
import { useRef, useState } from "react";
import Model from "../../Components/stateless/Model/Model";
import Model_Assign_New_Task from "../../Components/AllModels/General/Model_Assign_New_Task";
import { protected_route_next } from "../../next-utils/login_validation";
import {
  get_other_profile_request,
  get_profile_request,
} from "../../services/pages/index_requests";
import { Button, Typography } from "@mui/material";
import MenuOptions from "../../Components/stateful/Menu_Options/Menu_Options";
import { blue, grey } from "@mui/material/colors";
import {
  Add,
  Edit,
  Message,
  Lock,
  DisabledByDefault,
  Phone,
  Mail,
  LocationCity,
} from "@mui/icons-material";
import Model_Update_Profile from "../../Components/AllModels/profile/Model_Update_Profile";
import ProfileCard from "../../Components/stateless/ProfileCard/ProfileCard";
import Service, {
  ServiceTemplate,
} from "../../Components/stateless/Service/Service";
import Model_Add_Service from "../../Components/AllModels/profile/Model_Add_Service";
import Model_Change_Password from "../../Components/AllModels/profile/Model_Chanage_Password.js/Model_Change_Password";
import Gallery from "../../Components/stateful/Gallery/Gallery";
import { request_upload_gallery } from "../../services/pages/profile";
import { showSnackBar } from "../../next-utils/helper_functions";
import { enqueueSnackbar } from "notistack";
import Router from "next/router";
// COMPONENT JSX
const Profile = (props) => {
  // const [isEditProfileModel, setEditProfileModel] = useState(false);
  const [toggleUpdateProfileModel, setToggleUpdateProfileModel] =
    useState(false);
  const [toggleTaskModel, setToggleTaskModel] = useState(false);
  const [changePasswordModel, setChangePasswordModel] = useState(false);
  const galleryInputRef = useRef(null);
  const settings_options = [
    {
      text: "Message",

      onClick: () => {},
      icon: <Message fontSize="small" />,
    },

    {
      text: "Deactivate Account",

      onClick: () => {},
      icon: <DisabledByDefault fontSize="small" />,
    },
  ];

  settings_options.push({
    text: "Update Password",
    onClick: () => {
      alert("working");
    },
    icon: <Lock fontSize="small" />,
  });

  const uploadGalleryImages = async (e) => {
    const images = Object.values(e.target.files);
    const formData = new FormData();

    images.forEach((img, i) => {
      formData.append("gallery", img);
    });

    try {
      const results = await request_upload_gallery(
        formData,
        props.page_data.type === "team-page" ? props.user.id : ""
      );
      if (results.status === "success") {
        showSnackBar(
          enqueueSnackbar,
          "Successfully uploaded the gallery images",
          "success"
        );
        Router.reload();
      }
    } catch (error) {
      if (error.status === "error") {
        return showSnackBar(enqueueSnackbar, error.message, "error");
      }
      showSnackBar(
        enqueueSnackbar,
        "Failed to upload the gallery images",
        "error"
      );
    }
  };

  return (
    <>
      <Model
        toggle={changePasswordModel}
        onClose={() => setChangePasswordModel(false)}
      >
        <Model_Change_Password
          data={{ id: props.user.id, page_data: props.page_data }}
          closeModel={() => setToggleTaskModel(false)}
        />
      </Model>
      <Model toggle={toggleTaskModel} onClose={() => setToggleTaskModel(false)}>
        <Model_Assign_New_Task
          data={{ id: props.user.id }}
          closeModel={() => setToggleTaskModel(false)}
        />
      </Model>
      <Model toggle={false} onClose={() => setS(false)}>
        <Model_Add_Service />
      </Model>
      <Model
        toggle={toggleUpdateProfileModel}
        onClose={() => setToggleUpdateProfileModel(false)}
      >
        <Model_Update_Profile
          data={props.user}
          page_data={props.page_data}
          closeModel={() => setToggleUpdateProfileModel(false)}
        />
      </Model>
      <MainContainer navbar>
        <Section className={[classes.Profile]}>
          <div className={classes.Profile__Cover}>
            <ImageBox
              type="card"
              src={`/storage/images/coverPicture/${props.user?.coverPicture}`}
              alt="coverPicture"
              htmlFor="coverPicture"
              requesturl={`/api/v1/profile${
                props.page_data.type === "team-page" ? "/" + props.user.id : ""
              }`}
              canupdate={props.page_data.type !== "other-page"}
            />
          </div>
          <div
            className={[
              classes.Profile__Profile,
              props.isUnderAdmin && classes.Profile__Profile__UnderAdmin,
            ].join(" ")}
          >
            <ImageBox
              src={`/storage/images/profilePicture/${
                props.user?.profilePicture || "default-profilePicture.jpg"
              }`}
              alt="profilePicture"
              htmlFor="profilePicture"
              requesturl={`/api/v1/profile${
                props.page_data.type === "team-page" ? "/" + props.user.id : ""
              }`}
              canupdate={props.page_data.type !== "other-page"}
            />
          </div>
        </Section>
        <div className={classes.Profile__Details}>
          <div className={classes.Profile__Details__Heading}>
            <Typography
              variant="h4"
              fontWeight={"bold"}
              component={"h6"}
              color={grey[800]}
              style={{ textTransform: "uppercase" }}
              className={classes.Profile__Heading}
            >
              {props.user.fullName}
            </Typography>
            <Typography
              style={{ textTransform: "uppercase" }}
              variant="body1"
              component={"p"}
            >
              {props.user?.professions?.join(", ")}
            </Typography>
          </div>

          {props.page_data.type !== "other-page" && (
            <div className={classes.Profile__Details__Buttons}>
              {props.page_data.type === "team-page" && (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<Add />}
                  onClick={() => setToggleTaskModel(true)}
                >
                  Assign Task
                </Button>
              )}

              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setToggleUpdateProfileModel(true)}
              >
                Update Profile
              </Button>
              <MenuOptions settings={settings_options} />
            </div>
          )}
        </div>
        <div className={classes.Profile__BioAddress}>
          <div className={classes.Profile__Bio}>
            <Typography variant="h6" component={"p"} color={grey[700]}>
              {props.user?.bio
                ? props.user.bio
                : "Please update your profile. Otherwise you will not able to perform certain tasks. You may need to contact your admin."}
            </Typography>
          </div>
          {
            <div className={classes.Profile__Contact}>
              {props.user.phone && (
                <Typography
                  variant="body1"
                  component={"p"}
                  fontWeight={500}
                  color={blue[500]}
                  className={classes["Profile__Contact__Content"]}
                >
                  <Phone />
                  <a href={`tel:${props.user.phone}`}>{props.user.phone}</a>
                </Typography>
              )}
              {props.user.email && (
                <Typography
                  variant="body1"
                  component={"p"}
                  fontWeight={500}
                  color={blue[500]}
                  className={classes["Profile__Contact__Content"]}
                >
                  <Mail />
                  <a href={`mail:${props.user.email}`}>{props.user.email}</a>
                </Typography>
              )}
              {props.user.address && (
                <Typography
                  variant="body1"
                  component={"p"}
                  fontWeight={500}
                  color={blue[500]}
                  className={classes["Profile__Contact__Content"]}
                >
                  <LocationCity />
                  {props.user.address}
                </Typography>
              )}
            </div>
          }
        </div>
        {props.user.team && props.user.team.length !== 0 && (
          <Section className={classes["Team"]}>
            <Typography component={"h5"} variant="h5" fontWeight={500}>
              Team
            </Typography>
            <div className={classes["Team__container"]}>
              {generate_team(props.user.team)}
            </div>
          </Section>
        )}
        <Section>
          <div className={classes.Services__Top}>
            <Typography component={"h5"} variant="h5" fontWeight={500}>
              Services
            </Typography>
            <Button
              variant="contained"
              onClick={() => setWannaAddServiceModel((prev) => !prev)}
            >
              Add Service
            </Button>
          </div>
          <div className={classes.Services}>
            {(props.user?.service &&
              props.user.service.length &&
              generate_services(props.user.service)) || <ServiceTemplate />}
          </div>
        </Section>
        <Section>
          <div className={classes.Services__Top}>
            <Typography component={"h5"} variant="h5" fontWeight={500}>
              Gallery
            </Typography>
            {props.page_data.type !== "other-page" && (
              <Button variant="contained" component="label">
                Upload Gallery
                <input
                  hidden
                  multiple
                  accept="image/*"
                  type="file"
                  ref={galleryInputRef}
                  onChange={uploadGalleryImages}
                />
              </Button>
            )}
          </div>
          <Gallery images={props.user.gallery} />
        </Section>
      </MainContainer>
    </>
  );
};

function generate_team(team) {
  return team.map((user, i) => {
    return (
      <ProfileCard
        key={i}
        id={user.id}
        bio={user.bio}
        fullName={user.fullName}
        coverPicture={user.coverPicture}
        profilePicture={user.profilePicture}
      />
    );
  });
}

function generate_services(services) {
  return services.map((el, i) => {
    return (
      <Service
        className={[classes.Service]}
        key={i}
        id={el._id}
        coverPicture={el.coverPicture}
        imageAlt={el.type}
        name={el.name}
        title={el.title}
      />
    );
  });
}

export async function getServerSideProps(context) {
  let page_data = {};
  const PAGE_ID = context.params.id;

  let user;
  try {
    const { token } = useJWTToken(context);
    const id = await protected_route_next(context);
    const current_user_data = await get_profile_request(token);

    // if the user is accessing it own profile page
    if (PAGE_ID === id) {
      page_data.type = "own-page";
      user = current_user_data;
    } else if (
      current_user_data.data &&
      current_user_data.data.team.map((el) => el.id).includes(PAGE_ID)
    ) {
      user = await get_profile_request(token, PAGE_ID);
      page_data.type = "team-page";
    } else {
      user = await get_other_profile_request(token, PAGE_ID);
      page_data.type = "other-page";
    }

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

export default Profile;
