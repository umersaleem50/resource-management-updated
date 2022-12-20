import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import classes from "./Navbar.module.scss";

const Navbar = (props) => {
  return (
    <div className={classes.navbar__container}>
      <nav className={classes.navbar}>
        <div className={classes.logo}>
          <Image src={"/assests/logo.png"} height={70} width={70} alt="logo" />
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
            src={
              "/storage/images/profilePicture/Sadeem-876074.3559991106-1671290417835-profilePicture.jpeg"
            }
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
