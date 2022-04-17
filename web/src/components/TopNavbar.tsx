import React, { useState } from "react";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavLink from "@material-tailwind/react/NavLink";
import Icon from "@material-tailwind/react/Icon";

import UserNavbarDropdown from "./UserNavbarDropdown";

export default function TopNavbar() {
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
      }}
    >
      <Navbar color="blue" navbar>
        <NavbarContainer>
          <NavbarWrapper>
            <NavbarBrand>Navbar</NavbarBrand>
            <NavbarToggler
              color="white"
              onClick={() => setOpenNavbar(!openNavbar)}
              ripple="light"
            />
          </NavbarWrapper>

          <NavbarCollapse open={openNavbar}>
            <Nav>
              <div className="flex flex-col z-50 lg:flex-row lg:items-center">
                <NavLink href="/" rel="noreferrer" ripple="light">
                  <Icon name="description" size="2xl" />
                  &nbsp;Home
                </NavLink>

                <NavLink href="/recipes" rel="noreferrer" ripple="light">
                  <Icon name="apps" size="2xl" />
                  &nbsp;Recipes
                </NavLink>

                <NavLink href="/newrecipe" rel="noreferrer" ripple="light">
                  <Icon name="apps" size="2xl" />
                  &nbsp;New Recipe
                </NavLink>

                <NavLink href="/profile" rel="noreferrer" ripple="light">
                  <Icon name="apps" size="2xl" />
                  &nbsp;Profile
                </NavLink>
              </div>
            </Nav>
          </NavbarCollapse>

          <UserNavbarDropdown />
        </NavbarContainer>
      </Navbar>
    </div>
  );
}
