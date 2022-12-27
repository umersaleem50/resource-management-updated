import axios from "axios";
import Image from "next/legacy/image";
import { BtnFull } from "../../Components/Input/Buttons/Button";
import MainContainer from "../../Components/stateless/MainContainer/MainContainer";
import Section from "../../Components/stateless/Section/Section";
import {
  Heading_Hero,
  Paragraph,
} from "../../Components/Typography/Typography";
import classes from "./Profile.module.scss";
const Profile = (props) => {
  return (
    <MainContainer navbar>
      <Section className={[classes.Profile]}>
        <div className={classes.Profile__Cover}>
          <Image
            alt="Cover Picture"
            src={`/storage/images/coverPicture/${props.data.coverPicture}`}
            width={1140}
            height={275}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className={classes.Profile__Profile}>
          <Image
            alt="Profile Picture"
            src={`/storage/images/profilePicture/${props.data.profilePicture}`}
            width={200}
            height={200}
            sizes="(max-width:900px) 100px"
            layout="responsive"
            objectFit="cover"
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
          {props.adminAccess && <BtnFull text="Edit Profile" />}
        </div>
      </div>

      <div className={classes.Profile__BioAddress}>
        <div className={classes.Profile__Bio}>
          <Paragraph>
            {props?.data?.bio}
            This is the test bio for the account of the amir. We would like to
            edit this if this is editable
          </Paragraph>
          <Paragraph>
            This is the test bio for the account of the amir. We would like to
            edit this if this is editable
          </Paragraph>
        </div>
      </div>
    </MainContainer>
  );
};

export async function getServerSideProps(context) {
  // console.log(context.req);
  const protocol = context.req.secure ? "https" : "http";
  try {
    const profileData = await axios({
      url: `${protocol}://${context.req.headers.host}/api/user/${context.params.id}`,
      method: "get",
      // withCredentials: true,
      data: { token: context.req.cookies.jwt },
      params: { adminAccess: true },
      // data:{}
    });

    return {
      props: {
        data: profileData.data.data,
        adminAccess: profileData.data.adminAccess,
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
  return { props: {} };
}

export default Profile;
