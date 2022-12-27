import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import classes from "./Navbar.module.scss";

const Navbar = (props) => {
  const [profilePicture, setProfilePicture] = useState("");
  const request = async () => {
    try {
      const profile = await axios({
        url: "/api/profile/",
        method: "get",
        params: {
          select: "team,email,firstName,lastName",
          // populate:
          //   "coverPicture,profession,firstName,lastName,team,email,category,profilePicture",
        },
        data: { token: context.req.cookies.jwt },
      });
      console.log(profile);
      return profile;
    } catch (error) {
      console.log(error.response);
      return;
    }
  };

  useEffect(() => {
    console.log("your are in useefect");
    let profileData;
    request()
      .then((result) => {
        profileData = result;
        console.log("navbar:", result);
        setProfilePicture(result.profilePicture);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.navbar__container}>
      <nav className={classes.navbar}>
        <div className={classes.logo}>
          <Image src={"/assets/logo.png"} height={70} width={70} alt="logo" />
        </div>
        <ul className={classes.navbar__items}>
          <li>
            <Link href="/" passHref legacyBehavior>
              <a className={classes.navbar__item}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/team" passHref legacyBehavior>
              <a className={classes.navbar__item}>My Team</a>
            </Link>
          </li>
          <li>
            <Link href="/feeds-news" passHref legacyBehavior>
              <a className={classes.navbar__item}>Feeds & News</a>
            </Link>
          </li>
          <li>
            <Link href="/wallet" passHref legacyBehavior>
              <a className={classes.navbar__item}>Wallet</a>
            </Link>
          </li>
        </ul>

        <div className={classes.profile}>
          <Image
            src={`/storage/images/profilePicture/${profilePicture}`}
            href="Profile Picture"
            height={40}
            width={40}
            alt="profile"
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
