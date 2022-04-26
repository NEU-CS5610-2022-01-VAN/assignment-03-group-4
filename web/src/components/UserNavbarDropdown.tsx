import "./css/userNavbarDropdown.css";

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Dropdown } from "react-bootstrap";
import { IoMdArrowDropdown } from "react-icons/io";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";

import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { MenuList, Skeleton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useUserContext } from "../hooks/UserContext";

const UserNavbarDropdown = () => {
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } =
    useAuth0();
  const { user: dbUser } = useUserContext();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuItemClick = (link) => {
    navigate(link);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        onMouseDown={(e) => e.preventDefault()}
      >
        {isLoading ? (
          <Skeleton variant="circular">
            <Avatar alt={"user avatar"} />
          </Skeleton>
        ) : (
          <Avatar
            src={
              isAuthenticated
                ? (user as any).picture
                : "https://media.istockphoto.com/vectors/user-profile-icon-vector-avatar-portrait-symbol-flat-shape-person-vector-id1270368615?k=20&m=1270368615&s=170667a&w=0&h=qpvA8Z6L164ZcKfIyOl-E8fKnfmRZ09Tks7WEoiLawA="
            }
            alt={"user avatar"}
          />
        )}
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {isAuthenticated ? (
          <MenuList className="outline-none">
            <MenuItem onClick={() => onMenuItemClick("/profile")}>
              <div>
                <p>Signed in as</p>
                {dbUser && <b>{(dbUser as any).name}</b>}
              </div>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={() => onMenuItemClick("/profile")}>
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Log out
            </MenuItem>
          </MenuList>
        ) : (
          <MenuItem onClick={() => loginWithRedirect()}>Sign in</MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default UserNavbarDropdown;
