import { BtnFull, BtnOptions } from "../../Components/Input/Buttons/Button";
import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import Section from "../../Components/stateless/Section/Section";
import {
  Heading_Hero,
  Heading_Large,
  Paragraph,
} from "../../Components/Typography/Typography";
import Member from "../../Express-api/Models/member";
import { login_validation } from "../../next-utils/login_validation";
import classes from "./Market.module.scss";
import Notification from "../../Components/stateless/Notification/Notification";
import { useState } from "react";
import Model from "../../Components/stateless/Model/Model";
import EditProfileModel from "../../Components/AllModels/profile/_edit_profile";
import Account from "../../Components/stateless/Account/Account";
import Service from "../../Components/stateless/Service/Service";
import AddNewService from "../../Components/AllModels/profile/_add_new_service";
import Rating from "../../Components/stateless/Rating/Rating";
import Selective_Image from "../../Components/stateless/Selective_Image/Selective_Image";
import ServiceProduct from "../../Express-api/Models/serviceProduct";
import Account_Small from "../../Components/stateless/Account_Small/Account_Small";
import ImageGallery from "../../Components/stateful/ImageGallery/ImageGallery";
import ImageViewer from "../../Components/stateful/ImageViewer/ImageViewer";

// COMPONENT JSX
const Market = (props) => {
  const default_gallery = new Array(4).fill("default-gallery.jpg");
  console.log("this is props", props);
  const admin_option = [
    {
      title: "Edit Account",
      callback: () => {
        setEditProfileModel(true);
      },
    },
    {
      title: "Remove Account",
      callback: () => {},
    },
  ];

  function generate_gallery(images, id) {
    return images.map((el, i) => {
      return (
        <div className={classes.Gallery__Image} key={i}>
          <Selective_Image
            src={`/storage/images/gallery/${el}`}
            requestURL={`/api/service/update-gallery/${id}/${i}`}
            htmlFor={`service-gallery-${i}`}
            alt={i}
            isPermission={props.isUnderAdmin || props.updateOwnAccount}
            fieldName="gallery"
            autoSizer={true}
          />
        </div>
      );
    });
  }

  //   if (props.data?.otherDetails) {
  //     edit_account_model_default_values = {
  //       bio: props.data.otherDetails.bio,
  //       phone: props.data.otherDetails.phone,
  //       postalCode: props.data.otherDetails.postalCode,
  //       street: props.data.otherDetails.street,
  //       city: props.data.otherDetails.city,
  //       country: props.data.otherDetails.country,
  //     };
  //   }

  return (
    <MainContainer navbar>
      <Notification type="success" />

      <Section className={[classes.Profile]}>
        <div className={classes.Profile__Cover}>
          <Selective_Image
            isPermission={props.isUnderAdmin || props.updateOwnAccount}
            src={`/storage/images/coverPicture/${props.data?.coverPicture}`}
            htmlFor="cover-picture"
            fieldName="coverPicture"
            requestURL={`/api/service/update-cover-picture/${props.data._id}`}
            // otherData={props.data?.member.firstName}
          />
        </div>
      </Section>
      <div className={classes.Profile__Details}>
        <div className={classes.Profile__Details__Heading}>
          <Heading_Hero
            style={{ textTransform: "uppercase" }}
            className={[classes.Profile__Heading]}
          >
            {props.data.title}
          </Heading_Hero>
        </div>
        <div className={classes.Profile__Details__Buttons}>
          {props.isUnderAdmin && <BtnFull text="Order" />}
          {props.isUnderAdmin && <BtnOptions options={admin_option} />}
        </div>
      </div>

      <Section className={classes.Main_Details}>
        <div className={classes.Profile__BioAddress}>
          <div className={classes.Profile__Bio}>
            <Rating
              rating={props.data.ratingAverage || 3.5}
              ratingQuantity={props.data.ratingQuantity}
            />
            <Paragraph>
              {props.data?.description &&
                props.data.description.split(".").map((el) => {
                  return el + "." + "\n";
                })}
            </Paragraph>
          </div>
          {props.data.member.otherDetails && (
            <div className={classes.Profile__Contact}>
              <div>
                <Paragraph bold>
                  <a href={`tel:${props.data?.member?.otherDetails.phone}`}>
                    {props.data.member.otherDetails.phone}
                  </a>
                </Paragraph>
                <Paragraph bold>
                  <a href={`mail:${props.data.member.email}`}>
                    {props.data.member.email}
                  </a>
                </Paragraph>
                <Paragraph bold>
                  {props.data.member.otherDetails.address}
                </Paragraph>
              </div>
              <Account_Small
                name={props.data.member.firstName}
                type={props.data.type}
                alt="test"
                src={`/storage/images/profilePicture/${props.data.member.profilePicture}`}
              />
            </div>
          )}
        </div>
      </Section>
      {/* {props.data.team && props.data.team.length !== 0 && (
        <Section>
          <Heading_Large>Team</Heading_Large>
          <div className={classes.Team}>{generate_team(props.data.team)}</div>
        </Section>
      )} */}

      <Section>
        <Heading_Large>Gallery</Heading_Large>

        <div className={classes.Gallery}>
          {/* {generate_gallery(
            props.data?.gallery || default_gallery,
            props.data._id
          )} */}
          <ImageGallery
            images={props.data.gallery}
            mainRoute="/storage/images/gallery"
          />
        </div>
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
          {/* {generate_gallery(
            props.data?.otherDetails?.gallery || default_gallery,
            props.data.id
          )} */}
          add Details
        </div>
      </Section>
    </MainContainer>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const checkIsLogin = login_validation(context.req);

  if (!checkIsLogin.isLogged) {
    return checkIsLogin.redirect;
  }

  try {
    const adminId = checkIsLogin.isLogged;
    const data = await ServiceProduct.findById(id).populate({
      path: "member",
      //   select: "profilePicture email firstName LastName fullName",
      populate: { path: "otherDetails" },
    });

    if (!data)
      return {
        redirect: {
          permanent: false,
          destination: "/404",
        },
      };

    //THIS WILL CHECK IF THE ADMIN IS LOGIN AND REQUESTED PAGE IS UNDER HIM OR HIS TEAMMATE.
    const adminData = await Member.findById(adminId).select("team");
    // const isUnderAdmin = isAdmin && isAdmin.includes(id);
    const adminTeam = JSON.parse(JSON.stringify(adminData.team));
    console.log("isadmin", adminTeam.includes(data.member.id));

    //MAKE SURE TO FIX THIS.
    const isUnderAdmin = true || (adminTeam && adminTeam.includes(id));

    return {
      props: {
        data: JSON.parse(JSON.stringify(data)),
        isUnderAdmin,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }
}

export default Market;
