import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Settings from "@mui/icons-material/Settings";
import { Person } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import classes from "./Navbar.module.scss";
import { blue, grey, red } from "@mui/material/colors";
import { useSnackbar } from "notistack";
import { logout_callback } from "../../../services/pages/auth";
import { showSnackBar } from "../../../next-utils/helper_functions";
import { get_profile_request } from "../../../services/pages/index_requests";
import { navLinks } from "../../../Dev-Data/navlinks";

const Navbar = (props) => {
  const [user, setUser] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const logoutProfile = async (e) => {
    closeSnackbar();
    const results = await logout_callback();

    if (results.status === "success")
      showSnackBar(enqueueSnackbar, `Logging out profile!`, "success");
    Router.push("/auth/login");
    if (results.status === "failed") {
      showSnackBar(enqueueSnackbar, results.message, "error");
    }
  };

  const settings = [
    {
      text: "Show Profile",
      color: grey[700],
      onClick: () => {},
      icon: <Person fontSize="small" />,
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
  if (user)
    settings.unshift({
      text: user.email,
      color: grey[700],
      onClick: () => {
        Router.push(`/profile/${user.id}`);
      },
    });

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const generateNavLinks = (links) => {
    return links.map((link, i) => {
      return (
        <li key={i}>
          <Link href={link.href} passHref legacyBehavior>
            <a className={classes.navbar__item}>
              <Typography
                variant="body1"
                fontWeight={"500"}
                color={grey["A100"]}
              >
                {link.text}
              </Typography>
            </a>
          </Link>
        </li>
      );
    });
  };

  const navRequest = async () => {
    try {
      const profile = await get_profile_request(null, null, [
        "firstName",
        "lastName",
        "fullName",
        "profilePicture",
      ]);

      if (profile) {
        setUser(profile.data);
      }
    } catch (error) {
      showSnackBar(enqueueSnackbar, "Failed to some data.", "warning");
    }
  };

  useEffect(() => {
    navRequest();
  }, []);

  return (
    <div className={classes.main} style={{ backgroundColor: blue[600] }}>
      <nav className={classes.navbar}>
        <div className={classes.logo}>
          <Image src={"/assets/logo.png"} height={70} width={70} alt="logo" />
        </div>

        <ul className={classes.navbar__items}>{generateNavLinks(navLinks)}</ul>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={"Profile Picture"}
                src={`/storage/images/profilePicture/${user.profilePicture}`}
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
            {settings.map((setting, i) => (
              <MenuItem key={i} onClick={setting.onClick}>
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
      </nav>
    </div>
  );
};

export default Navbar;
