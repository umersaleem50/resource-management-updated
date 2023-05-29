import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import React from "react";
// import OptionModel from "../../Input/OptionModel/OptionModel";

import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";

import classes from "./Navbar.module.scss";
import { blue, grey, red } from "@mui/material/colors";
import { useSnackbar } from "notistack";
import { logout_callback } from "../../../services/request_function";
import { showSnackBar } from "../../../next-utils/helper_functions";
const Navbar = (props) => {
  const [user, setUser] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const logoutProfile = async (e) => {
    closeSnackbar();
    const results = await logout_callback();

    if (results.status === "success")
      showSnackBar(enqueueSnackbar, `Logging out profile!`, "warning");

    if (results.status === "failed") {
      showSnackBar(enqueueSnackbar, results.message, "error");
    }
  };

  const settings = [
    { text: "Profile", color: grey[700], onClick: () => {} },
    {
      text: "Settings",
      color: grey[700],
      onClick: () => {},
      icon: <Settings fontSize="small" />,
    },
    {
      text: "Logout",
      color: red[700],
      onClick: logoutProfile,
      icon: <Logout fontSize="small" />,
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    // const navRequest = async () => {
    //   try {
    //     const profile = await axios({
    //       url: "/api/profile",
    //     });
    //     if (profile) {
    //       setUser(profile.data.data);
    //     }
    //   } catch (error) {
    //     // console.log("error", error);
    //   }
    // };
    // navRequest();
  }, []);

  return (
    <div className={classes.main} style={{ backgroundColor: blue[600] }}>
      <nav className={classes.navbar}>
        <div className={classes.logo}>
          <Image src={"/assets/logo.png"} height={70} width={70} alt="logo" />
        </div>

        <ul className={classes.navbar__items}>
          <li>
            <Link href="/" passHref legacyBehavior>
              <a className={classes.navbar__item}>
                <Typography
                  variant="body1"
                  fontWeight={"500"}
                  color={grey["A100"]}
                >
                  Home
                </Typography>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/team" passHref legacyBehavior>
              <a className={classes.navbar__item}>
                <Typography
                  variant="body1"
                  fontWeight={"500"}
                  color={grey["A100"]}
                >
                  Team
                </Typography>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/feeds-news" passHref legacyBehavior>
              <a className={classes.navbar__item}>
                <Typography
                  variant="body1"
                  fontWeight={"500"}
                  color={grey["A100"]}
                >
                  Community
                </Typography>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/wallet" passHref legacyBehavior>
              <a className={classes.navbar__item}>
                <Typography
                  variant="body1"
                  fontWeight={"500"}
                  color={grey["A100"]}
                >
                  Posts
                </Typography>
              </a>
            </Link>
          </li>
        </ul>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Remy Sharp"
                src={
                  "/storage/images/profilePicture/Sadeem 2-972393.1975688296-1671391613915-profilePicture.jpeg"
                }
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={setting.onClick}>
                {setting.icon && <ListItemIcon>{setting.icon}</ListItemIcon>}
                <Typography
                  variant="body1"
                  textAlign="center"
                  color={setting.color}
                >
                  {setting.text}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        {/* {user && (
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
        )} */}
      </nav>
    </div>
  );
};

export default Navbar;
