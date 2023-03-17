import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import OptionModel from "../../Input/OptionModel/OptionModel";

import classes from "./Navbar.module.scss";

const Navbar = (props) => {
  const [user, setUser] = useState();
  const [isToggleProfile, setToggleProfile] = useState(false);
  // const router = useRouter();
  console.log("prevent reload in navbar.js .14");
  // Router.events.on("routeChangeComplete", () => {
  //   Router.reload();
  // });
  const options = [
    // { title: user?.fullName, callback: () => {} },
    {
      title: "Show Profile",
      callback: () => {
        Router.replace(`/profile/${user.id}`);
      },
    },
    {
      title: "Logout",
      color: "red",
      callback: async () => {
        try {
          const data = await axios({
            url: "/api/profile/logout",
            method: "post",
          });
          if (data.data.status === "success") {
          }
          Router.replace("/auth/login");
        } catch (error) {
          console.log("my error", error);
        }
      },
    },
  ];

  useEffect(() => {
    const navRequest = async () => {
      try {
        const profile = await axios({
          url: "/api/profile",
        });
        if (profile) {
          setUser(profile.data.data);
        }
      } catch (error) {
        // console.log("error", error);
      }
    };
    navRequest();
  }, []);

  return (
    <div className={classes.navbar__container}>
      <nav className={classes.navbar}>
        <div className={classes.logo}>
          <Image src={"/assets/logo.png"} height={70} width={70} alt="logo" />
        </div>
        {user && (
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
        )}

        {user && (
          <div className={classes.profile}>
            <div
              className={classes.profile__Image}
              onClick={() => setToggleProfile((prev) => !prev)}
            >
              <Image
                src={`/storage/images/profilePicture/${
                  user.profilePicture || "default-profilePicture.jpg"
                }`}
                href="Profile Picture"
                height={40}
                width={40}
                alt="profile"
              />
            </div>
            <div className={classes.profile__details}>
              {isToggleProfile && (
                <OptionModel
                  options={options}
                  closeToggle={setToggleProfile}
                ></OptionModel>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
