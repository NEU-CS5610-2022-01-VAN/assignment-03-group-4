import "./css/userNavbarDropdown.css";
import { useState, MouseEvent } from "react";
import { To, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  MenuList,
  Skeleton,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from "@mui/material";
import { CgProfile } from "react-icons/cg";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { useUserContext } from "../hooks/UserContext";

const defaultPicture =
  "https://media.istockphoto.com/vectors/user-profile-icon-vector-avatar-portrait-symbol-flat-shape-person-vector-id1270368615?k=20&m=1270368615&s=170667a&w=0&h=qpvA8Z6L164ZcKfIyOl-E8fKnfmRZ09Tks7WEoiLawA=";

const UserNavbarDropdown = () => {
  const { logout, loginWithRedirect } = useAuth0();
  const { isLoading, isAuthenticated, user, userPicture } = useUserContext();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuItemClick = (link: To) => {
    navigate(link);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        onMouseDown={(e) => e.preventDefault()}
      >
        {isAuthenticated ? (
          <>
            {isLoading ? (
              <Skeleton variant="circular">
                <Avatar alt={"user avatar"} />
              </Skeleton>
            ) : (
              <Avatar
                src={userPicture ? userPicture : defaultPicture}
                alt={"user avatar"}
              />
            )}
          </>
        ) : (
          <Avatar src={defaultPicture} alt={"user avatar"} />
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
                {user && <b>{user.name}</b>}
              </div>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />

            <MenuItem onClick={() => onMenuItemClick("/profile")}>
              <CgProfile size={18} style={{ marginRight: "6px" }} />
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              <FiLogOut size={18} style={{ marginRight: "6px" }} />
              Log out
            </MenuItem>
          </MenuList>
        ) : (
          <MenuItem onClick={() => loginWithRedirect()}>
            <FiLogIn size={18} style={{ marginRight: "6px" }} />
            Sign in
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default UserNavbarDropdown;
