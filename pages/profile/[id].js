import { BtnFull, BtnOptions } from "../../Components/Input/Buttons/Button";
import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import Section from "../../Components/stateless/Section/Section";
import {
  Heading_Hero,
  Heading_Large,
  Paragraph,
} from "../../Components/Typography/Typography";
import Member from "../../Express-api/Models/member";
import {
  check_have_permission,
  check_if_edit_own_account,
  login_validation,
} from "../../next-utils/login_validation";
import classes from "./Profile.module.scss";
import Notification from "../../Components/stateless/Notification/Notification";
import { useState } from "react";
import Model from "../../Components/stateless/Model/Model";
import EditProfileModel from "../../Components/AllModels/profile/_edit_profile";
import Account from "../../Components/stateless/Account/Account";
import Service from "../../Components/stateless/Service/Service";
import AddNewService from "../../Components/AllModels/profile/_add_new_service";
import Selective_Image from "../../Components/stateless/Selective_Image/Selective_Image";
import permissions from "../../Dev-Data/permissions";
import AssignTaskModel from "../../Components/AllModels/profile/_assign_task";
import ImageBox from "../../Components/ImageBox/ImageBox";

// COMPONENT JSX
const Profile = (props) => {
  const [isEditProfileModel, setEditProfileModel] = useState(false);
  const [isWannaAddServiceModel, setWannaAddServiceModel] = useState(false);
  const [isWannaAssignTask, setWannaAssignTask] = useState(false);
  const default_gallery = new Array(5).fill("default-gallery.jpg");
  const admin_option = [
    {
      title: "Edit Account",
      callback: () => {
        setEditProfileModel(true);
      },
    },
    {
      title: "Remove Account",
      // type:'critical'
      callback: () => {},
    },
  ];

  function generate_gallery(images, id) {
    return images.map((el, i) => {
      return (
        <div className={classes.Gallery__Image} key={i}>
          <Selective_Image
            src={`/storage/images/gallery/${el}`}
            requestURL={`/api/profile/update-gallery/${id}/${i}`}
            htmlFor={`gallery-${i}`}
            alt={i}
            isPermission={
              (props.data.otherDetails && props.isUnderAdmin) ||
              props.updateOwnAccount
            }
            fieldName="gallery"
            autoSizer={true}
          />
        </div>
      );
    });
  }

  let edit_account_model_default_values;
  if (props.data?.otherDetails) {
    edit_account_model_default_values = {
      bio: props.data.otherDetails.bio,
      phone: props.data.otherDetails.phone,
      postalCode: props.data.otherDetails.postalCode,
      street: props.data.otherDetails.street,
      city: props.data.otherDetails.city,
      country: props.data.otherDetails.country,
    };
  }

  return (
    <MainContainer navbar>
      <Notification type="success" />
      {isWannaAssignTask && (
        <Model toggleModel={setWannaAssignTask}>
          <AssignTaskModel
            toggleModel={setWannaAssignTask}
            assignToId={props.data.id}
          ></AssignTaskModel>
        </Model>
      )}
      {isEditProfileModel && (
        <Model toggleModel={setEditProfileModel}>
          <EditProfileModel
            toggleModel={setEditProfileModel}
            userId={props.data.id}
            defaultValues={edit_account_model_default_values}
          />
        </Model>
      )}

      {isWannaAddServiceModel && (
        <Model toggleModel={setWannaAddServiceModel}>
          <AddNewService
            otherData={props.data.id}
            toggleModel={setWannaAddServiceModel}
          />
        </Model>
      )}
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
            src={`/storage/images/coverPicture/${props.data?.coverPicture}`}
            alt="coverPicture"
            htmlFor="coverPicture"
            requesturl={`/api/profile/update-cover-picture/${props.data.id}`}
          />
        </div>
        <div
          className={[
            classes.Profile__Profile,
            props.isUnderAdmin && classes.Profile__Profile__UnderAdmin,
          ].join(" ")}
        >
          {/* <Selective_Image
            isPermission={props.isUnderAdmin || props.updateOwnAccount}
            src={`/storage/images/profilePicture/${props.data?.profilePicture}`}
            htmlFor="profile-picture"
            fieldName="profilePicture"
            requestURL={`/api/profile/update-profile-picture/${props.data.id}`}
            otherData={props.data.firstName}
          /> */}
          <ImageBox
            src={`/storage/images/profilePicture/${props.data?.profilePicture}`}
            alt="profilePicture"
            htmlFor="profilePicture"
            requesturl={`/api/profile/update-profile-picture/${props.data.id}`}
          />
        </div>
      </Section>
      <div className={classes.Profile__Details}>
        <div className={classes.Profile__Details__Heading}>
          <Heading_Hero
            style={{ textTransform: "uppercase" }}
            className={[classes.Profile__Heading]}
          >
            {props.data.fullName}
          </Heading_Hero>
          <Paragraph style={{ textTransform: "uppercase" }}>
            {props.data.profession.join("")}
          </Paragraph>
        </div>
        <div className={classes.Profile__Details__Buttons}>
          {props.isUnderAdmin && (
            <BtnFull
              text="Assign Task"
              clicked={() => setWannaAssignTask(true)}
            />
          )}
          {props.updateOwnAccount && (
            <BtnFull
              text="Update Account"
              clicked={() => {
                setEditProfileModel(true);
              }}
            />
          )}
          {props.isUnderAdmin && <BtnOptions options={admin_option} />}
        </div>
      </div>

      <div className={classes.Profile__BioAddress}>
        <div className={classes.Profile__Bio}>
          <Paragraph>
            {props.data?.otherDetails?.bio &&
              props.data.otherDetails.bio.split(".").map((el) => {
                return el + "." + "\n";
              })}
          </Paragraph>
          {!props.data?.otherDetails && (
            <Paragraph>
              You need to complete the profile before offering your services or
              product.
            </Paragraph>
          )}
          {!props.data?.otherDetails?.bio && (
            <Paragraph>
              Please ask your admin to complete your profile
            </Paragraph>
          )}
        </div>
        {props.data.otherDetails && (
          <div className={classes.Profile__Contact}>
            <Paragraph bold>
              <a href={`tel:${props.data.otherDetails.phone}`}>
                {props.data.otherDetails.phone}
              </a>
            </Paragraph>
            <Paragraph bold>
              <a href={`mail:${props.data.email}`}>{props.data.email}</a>
            </Paragraph>
            <Paragraph bold>{props.data.otherDetails.address}</Paragraph>
          </div>
        )}
      </div>
      {props.data.team && props.data.team.length !== 0 && (
        <Section>
          <Heading_Large>Team</Heading_Large>
          <div className={classes.Team}>{generate_team(props.data.team)}</div>
        </Section>
      )}

      <Section>
        <div className={classes.Services__Top}>
          <Heading_Large>Services</Heading_Large>
          <BtnFull
            disabled={!props.data.otherDetails && true}
            clicked={() => setWannaAddServiceModel((prev) => !prev)}
          >
            Add Service
          </BtnFull>
        </div>
        <div className={classes.Services}>
          {/* {console.log("this is service", props.data.otherDetails.service)} */}
          {(props.data.otherDetails?.service &&
            props.data.otherDetails?.service.length &&
            generate_services(props.data.otherDetails.service)) || (
            <Paragraph>
              {props.data.firstName} currently have no service to offer.
            </Paragraph>
          )}
        </div>
      </Section>

      <Section>
        <Heading_Large>Gallery</Heading_Large>
        <div className={classes.Gallery}>
          {generate_gallery(
            props.data?.otherDetails?.gallery || default_gallery,
            props.data.id
          )}
        </div>
      </Section>
    </MainContainer>
  );
};

function generate_team(team) {
  return team.map((el, i) => {
    return (
      <Account
        className={classes.Account}
        profilePicture={el.profilePicture}
        coverImage={el.coverPicture}
        fullName={el.fullName}
        profession={el.profession}
        address={el.address}
        key={i}
        id={el.id}
        member={el?.team?.length}
      ></Account>
    );
  });
}

function generate_services(services) {
  return services.map((el, i) => {
    return (
      // <div key={i}>
      <Service
        className={[classes.Service]}
        key={i}
        id={el._id}
        coverPicture={el.coverPicture}
        imageAlt={el.type}
        name={el.name}
        title={el.title}
      />
      // </div>
    );
  });
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const checkIsLogin = login_validation(context.req);
  const UPDATE_OWN_ACCOUNT_PERMISSION = permissions[1]; //update-own-account
  let checkIfEditOwnAccount;

  if (!checkIsLogin.isLogged) {
    return checkIsLogin.redirect;
  }

  try {
    const adminId = checkIsLogin.isLogged;
    const data = await Member.findById(id)
      // .populate("otherDetails")
      // .populate("service")
      .populate({ path: "otherDetails", populate: { path: "service" } })
      .populate("team");

    if (!data)
      return {
        redirect: {
          permanent: false,
          destination: "/404",
        },
      };

    const adminData = await Member.findById(adminId).select("team");
    // const isUnderAdmin = isAdmin && isAdmin.includes(id);
    const adminTeam = JSON.parse(JSON.stringify(adminData.team));

    const isUnderAdmin = adminTeam && adminTeam.includes(id);

    if (data.id === id) {
      checkIfEditOwnAccount = check_have_permission(
        data,
        UPDATE_OWN_ACCOUNT_PERMISSION
      );
    }

    return {
      props: {
        data: JSON.parse(JSON.stringify(data)),
        isUnderAdmin,
        updateOwnAccount: checkIfEditOwnAccount.updateOwnAccount,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }
}

export default Profile;
