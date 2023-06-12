import Image from "next/image";
import Link from "next/link";

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
import { enqueueSnackbar, useSnackbar } from "notistack";
import { showSnackBar } from "../../../next-utils/helper_functions";
import { signOut, useSession } from "next-auth/react";
import Router from "next/router";

const Navbar = (props) => {
  const { closeSnackbar } = useSnackbar();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { data: session } = useSession();

  const logoutProfile = async (e) => {
    closeSnackbar();
    showSnackBar(enqueueSnackbar, "Signing out your account...", "success");
    signOut();
  };

  const settings = [
    {
      text: session?.user?.fullName,
      color: grey[700],
      onClick: () => {
        Router.push(`/profile/${session?.user?._id}`);
      },
    },
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
            <Link href="/feeds" passHref legacyBehavior>
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
                src={`/storage/images/profilePicture/${session?.user?.profilePicture}`}
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
