import classes from "./Service.module.scss";
import { useJWTToken } from "../../next-utils/login_validation";
import { protected_route_next } from "../../next-utils/login_validation";
import { get_one_service } from "../../services/pages/service";
import {
  get_profile_request,
  get_other_profile_request,
} from "../../services/pages/index_requests";
import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import Section from "../../Components/stateless/Section/Section";
import ImageBox from "../../Components/ImageBox/ImageBox";
import { Avatar, Typography, Button } from "@mui/material";
import { grey, blue } from "@mui/material/colors";
import { Phone, Mail, LocationCity } from "@mui/icons-material";
import Router from "next/router";
import Gallery from "../../Components/stateful/Gallery/Gallery";
import { useRef } from "react";
import Detail_Box from "../../Components/stateless/Detail_Box/Detail_Box";
import MenuOptions from "../../Components/stateful/Menu_Options/Menu_Options";
import { Edit, Delete } from "@mui/icons-material";
import Model from "../../Components/stateless/Model/Model";
import Model_Edit_Service from "../../Components/AllModels/Services/Model_Edit_Service/Model_Edit_Service";
const Service = (props) => {
  const galleryInputRef = useRef(null);
  const uploadGalleryImages = () => {};

  const settings_options = [
    {
      text: "Edit Page",
      onClick: () => {},
      icon: <Edit fontSize="small" />,
    },

    {
      text: "Delete Page",
      onClick: () => {},
      icon: <Delete fontSize="small" />,
    },
  ];

  const generate_details_section = (detailsArr) => {
    return detailsArr.map((detail, i) => {
      return (
        <Detail_Box
          src={detail.photo}
          heading={detail.heading}
          description={detail.description}
          key={i}
          reverse={i % 2 !== 0}
        />
      );
    });
  };

  return (
    <>
      <Model toggle={true}>
        <Model_Edit_Service
          name={props.data.title}
          heading={props.data.heading}
          description={props.data.description}
          detailHeading1={props.data?.details[0]?.heading || ""}
          detailText1={props.data?.details[0]?.description || ""}
          detailHeading2={props.data?.details[1]?.heading || ""}
          detailText2={props.data?.details[1]?.description || ""}
          detailHeading3={props.data?.details[2]?.heading || ""}
          detailText3={props.data?.details[2]?.heading || ""}
        />
      </Model>
      <MainContainer navbar>
        <Section className={[classes.Profile]}>
          <div className={classes.Profile__Cover}>
            <ImageBox
              type="card"
              src={`/storage/images/coverPicture/${props.data?.coverPicture}`}
              alt="coverPicture"
              htmlFor="coverPicture"
              requesturl={`/api/v1/service/${props.data._id}`}
              canupdate={props.page_data.type !== "other-page"}
            />
          </div>
        </Section>

        <div className={classes.Profile__Details}>
          <div className={classes.Profile__Details__Heading}>
            <Typography
              style={{ textTransform: "uppercase" }}
              className={classes.Profile__Heading}
              variant="h5"
              component={"h5"}
              color={grey[500]}
              sx={{ mb: 2 }}
            >
              {props.data.title}
            </Typography>
            <Typography
              fontWeight={"bold"}
              style={{ textTransform: "uppercase" }}
              className={classes.Profile__Heading}
              variant="h4"
              component={"h4"}
              color={grey[900]}
            >
              {props.data.heading}
            </Typography>
          </div>
          <div className={classes.Profile__Details__Buttons}>
            {props.page_data.type === "own-page" && (
              <MenuOptions settings={settings_options} />
            )}
            {props.page_data.type !== "own-page" && (
              <Button variant="contained">Order</Button>
            )}
          </div>
        </div>

        <Section className={classes.Main_Details}>
          <div className={classes.Profile__BioAddress}>
            <div className={classes.Profile__Bio}>
              {/* <Rating
              rating={props.data.ratingAverage || 3.5}
              ratingQuantity={props.data.ratingQuantity}
            /> */}
              <Typography color={grey[700]} variant="body1" component={"p"}>
                {props.data.description}
              </Typography>
            </div>
            {props.data.provider && (
              <div className={classes.Profile__Contact}>
                <div>
                  <Typography
                    variant="body1"
                    component={"p"}
                    fontWeight={500}
                    color={blue[500]}
                    bold={"true"}
                    className={classes["Profile__Contact__Icon"]}
                  >
                    <Phone />
                    <a href={`tel:${props.data.provider.phone}`}>
                      {props.data.provider.phone}
                    </a>
                  </Typography>
                  <Typography
                    variant="body1"
                    component={"p"}
                    fontWeight={500}
                    color={blue[500]}
                    bold={"true"}
                    className={classes["Profile__Contact__Icon"]}
                  >
                    <Mail />
                    <a href={`mail:${props.data.provider.email}`}>
                      {props.data.provider.email}
                    </a>
                  </Typography>
                  <Typography
                    variant="body1"
                    component={"p"}
                    fontWeight={500}
                    color={blue[500]}
                    bold={"true"}
                    className={classes["Profile__Contact__Icon"]}
                  >
                    <LocationCity />
                    {props.data.provider.address}
                  </Typography>
                </div>
                <div className={classes["Profile__Contact__Profile"]}>
                  <Avatar
                    src={`/storage/images/profilePicture/${props.data.provider.profilePicture}`}
                    onClick={() =>
                      Router.push("/profile/" + props.data.provider._id)
                    }
                    alt="profile picture"
                  ></Avatar>
                  <div>
                    <Typography
                      color={grey[600]}
                      sx={{ textTransform: "capitalize" }}
                    >
                      {props.data.type} by
                    </Typography>
                    <Typography variant="h6" component={"h6"}>
                      {props.data.provider.fullName}
                    </Typography>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Section>

        <Section>
          <div className={classes.Gallery}>
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
          <Gallery
            images={props.data.gallery}
            url={`/storage/images/service/gallery`}
          />
        </Section>

        <Section>
          <div className={classes.Service__Feature}>
            <Typography component={"h5"} variant="h5" fontWeight={500}>
              Features
            </Typography>
            <Button variant="contained" component="label">
              Edit Details
            </Button>
          </div>
        </Section>
        <div className={classes["Features"]}>
          {generate_details_section(props.data.details)}
        </div>
      </MainContainer>
    </>
  );
};

export async function getServerSideProps(context) {
  let page_data = {};
  const PAGE_ID = context.params.id;

  try {
    const { token } = useJWTToken(context);
    await protected_route_next(context);
    const current_user_data = await get_profile_request(token, null, [
      "service",
      "team",
    ]);
    const requestObj = await get_one_service(token, PAGE_ID);

    if (
      current_user_data.data.service &&
      current_user_data.data.service.map((el) => el._id).includes(PAGE_ID)
    ) {
      page_data.type = "own-page";
    } else {
      await get_other_profile_request(token, PAGE_ID);
      page_data.type = "other-page";
    }

    return {
      props: {
        data: requestObj.data,
        page_data,
        // token,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}

export default Service;
