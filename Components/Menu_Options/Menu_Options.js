import { Typography } from "@mui/material";
import classes from "./Menu_Options.module.scss";
import { useState } from "react";
import Image from "next/image";
import MenuItem from "@mui/material/MenuItem";
import { grey } from "@mui/material/colors";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";

const MenuOptions = (props) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  //   const settings = [
  //     { text: "Profile", color: grey[700], onClick: () => {} },
  //     {
  //       text: "Settings",
  //       color: grey[700],
  //       onClick: () => {},
  //       icon: <Settings fontSize="small" />,
  //     },
  //     {
  //       text: "Logout",
  //       color: red[700],
  //       onClick: () => {},
  //       icon: <Logout fontSize="small" />,
  //     },
  //   ];

  return (
    <Box sx={{ flexGrow: 0 }} className={classes["MenuOption"]}>
      <div className={classes["MenuOption__Menu"]} onClick={handleOpenUserMenu}>
        {props.text && (
          <Typography sx={{ mr: 1 }} fontWeight={500} color={grey[`A100`]}>
            {props.text}
          </Typography>
        )}
        <Image
          className={classes["MenuOptions__Icon"]}
          src={`/assets/${props.white ? "menu-white.svg" : "menu-blue.svg"}`}
          width={20}
          height={20}
        />
      </div>
      <Menu
        sx={{ mt: "25px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: props.origin || "left",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {props.settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={() => {
              setting.onClick();
              handleCloseUserMenu();
            }}
          >
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
  );
};

export default MenuOptions;
