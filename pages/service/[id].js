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
import { Avatar, Typography } from "@mui/material";
import { grey, blue } from "@mui/material/colors";
import { Phone, Mail, LocationCity } from "@mui/icons-material";

const Service = (props) => {
  console.log("this is props", props);

  //   function generate_gallery(images, id) {
  //     return images.map((el, i) => {
  //       return (
  //         <div className={classes.Gallery__Image} key={i}>
  //           <Selective_Image
  //             src={`/storage/images/gallery/${el}`}
  //             requestURL={`/api/service/update-gallery/${id}/${i}`}
  //             htmlFor={`service-gallery-${i}`}
  //             alt={i}
  //             isPermission={props.isUnderAdmin || props.updateOwnAccount}
  //             fieldName="gallery"
  //             autoSizer={true}
  //           />
  //         </div>
  //       );
  //     });
  //   }

  return (
    <MainContainer navbar>
      <Section className={[classes.Profile]}>
        <div className={classes.Profile__Cover}>
          <ImageBox
            type="card"
            src={`/storage/images/coverPicture/${props.data?.coverPicture}`}
            alt="coverPicture"
            htmlFor="coverPicture"
            requesturl={`/api/v1/service${
              props.page_data.type === "own-page" ? "/" + props.data.id : ""
            }`}
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
          {props.isUnderAdmin && <BtnFull text="Order" />}
          {props.isUnderAdmin && <BtnOptions options={admin_option} />}
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
                  bold
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
                  bold
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
                  bold
                  className={classes["Profile__Contact__Icon"]}
                >
                  <LocationCity />
                  {props.data.provider.address}
                </Typography>
              </div>
              <div className={classes["Profile__Contact__Profile"]}>
                <Avatar
                  src={`/storage/images/profilePicture/${props.data.provider.profilePicture}`}
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
              {/* <Account_Small
                name={props.data.provider.firstName}
                type={props.data.type}
                alt="test"
                src={`/storage/images/profilePicture/${props.data.member.profilePicture}`}
              /> */}
            </div>
          )}
        </div>
      </Section>
      {/*
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

      <Section>
        <div className={classes.Details__Top}>
          <Heading_Large>Details</Heading_Large>
          <BtnFull
            disabled={!props.data.otherDetails && true}
            clicked={() => setWannaAddServiceModel((prev) => !prev)}
          >
            Edit Details
          </BtnFull>
        </div>
        <div className={classes.Details__Container}>
         
          add Details
        </div>
      </Section> */}
      {props.page_data.type}
    </MainContainer>
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
        token,
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
