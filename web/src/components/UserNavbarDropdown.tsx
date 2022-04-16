import "./css/userNavbarDropdown.css";

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Dropdown } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { IoMdArrowDropdown } from "react-icons/io";

import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = (React.forwardRef as any)(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const UserNavbarDropdown = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          <div className="dropdown-card">
            <Image
              className="avatar"
              src={
                isAuthenticated
                  ? (user as any).picture
                  : "https://media.istockphoto.com/vectors/user-profile-icon-vector-avatar-portrait-symbol-flat-shape-person-vector-id1270368615?k=20&m=1270368615&s=170667a&w=0&h=qpvA8Z6L164ZcKfIyOl-E8fKnfmRZ09Tks7WEoiLawA="
              }
              alt={"user avatar"}
              roundedCircle={true}
            />
            <IoMdArrowDropdown color="white" size={25} />
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {isAuthenticated ? (
            <>
              <Dropdown.Item href="/profile">
                <>Signed in as</>
                <br />
                <b>{(user as any).name}</b>
              </Dropdown.Item>
              <Dropdown.Item href="/profile">Your Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <LogoutButton>Sign out</LogoutButton>
              </Dropdown.Item>
            </>
          ) : (
            <Dropdown.Item>
              <LoginButton>Log in</LoginButton>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserNavbarDropdown;
