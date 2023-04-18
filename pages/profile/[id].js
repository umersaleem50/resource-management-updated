// import { BtnFull, BtnOptions } from "../../Components/Input/Buttons/Button";
import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import { useJWTToken } from "../../next-utils/login_validation";
import classes from "./Profile.module.scss";
import Section from "../../Components/stateless/Section/Section";
import ImageBox from "../../Components/ImageBox/ImageBox";
import { useState } from "react";
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

// COMPONENT JSX
const Profile = (props) => {
  const [isEditProfileModel, setEditProfileModel] = useState(false);
  const [toggleUpdateProfileModel, setToggleUpdateProfileModel] =
    useState(true);
  const [toggleTaskModel, setToggleTaskModel] = useState(false);

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

  return (
    <>
      <Model toggle={toggleTaskModel} onClose={() => setToggleTaskModel(false)}>
        <Model_Assign_New_Task userId="" />
      </Model>
      <Model
        toggle={toggleUpdateProfileModel}
        onClose={() => setToggleUpdateProfileModel(false)}
      >
        <Model_Update_Profile userId="" />
      </Model>
      <MainContainer navbar>
        <Section className={[classes.Profile]}>
          <div className={classes.Profile__Cover}>
            {/* <Selective_Image
            isPermission={props.isUnderAdmin || props.updateOwnAccount}
            src={`/storage/images/coverPicture/${props.data?.coverPicture}`}
            htmlFor="cover-picture"
            fieldName="coverPicture"
            requestURL={`/api/profile/update-cover-picture/${props.data.id}`}
            otherData={props.data.firstName}
          /> */}

            <ImageBox
              type="card"
              src={`/storage/images/coverPicture/${props.user?.coverPicture}`}
              alt="coverPicture"
              htmlFor="coverPicture"
              requesturl={`/api/profile/update-cover-picture/${props.user.id}`}
            />
          </div>
          <div
            className={[
              classes.Profile__Profile,
              props.isUnderAdmin && classes.Profile__Profile__UnderAdmin,
            ].join(" ")}
          >
            <ImageBox
              src={`/storage/images/profilePicture/${props.user?.profilePicture}`}
              alt="profilePicture"
              htmlFor="profilePicture"
              requesturl={`/api/profile/update-profile-picture/${props.user.id}`}
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
              className={[classes.Profile__Heading]}
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
          <div className={classes.Profile__Details__Buttons}>
            <Button variant="contained" color="success" startIcon={<Add />}>
              Assign Task
            </Button>

            <Button variant="outlined" startIcon={<Edit />}>
              Update Profile
            </Button>
            <MenuOptions settings={settings_options} />
          </div>
        </div>
        <div className={classes.Profile__BioAddress}>
          <div className={classes.Profile__Bio}>
            <Typography variant="h6" component={"p"} color={grey[700]}>
              {props.user?.bio
                ? props.user.bio
                : "Please complete your profile. Ask for the admin."}
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
      </MainContainer>
    </>
  );
};

// function generate_team(team) {
//   return team.map((el, i) => {
//     return (
//       <Account
//         className={classes.Account}
//         profilePicture={el.profilePicture}
//         coverImage={el.coverPicture}
//         fullName={el.fullName}
//         profession={el.profession}
//         address={el.address}
//         key={i}
//         id={el.id}
//         member={el?.team?.length}
//       ></Account>
//     );
//   });
// }

// function generate_services(services) {
//   return services.map((el, i) => {
//     return (
//       // <div key={i}>
//       <Service
//         className={[classes.Service]}
//         key={i}
//         id={el._id}
//         coverPicture={el.coverPicture}
//         imageAlt={el.type}
//         name={el.name}
//         title={el.title}
//       />
//       // </div>
//     );
//   });
// }

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
      user = current_user_data.data;
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
    console.log(error);
    return {
      redirect: {
        permanent: true,
        destination: "/404",
      },
    };
  }
}

export default Profile;
