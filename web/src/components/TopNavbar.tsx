import React, { useState } from "react";
// import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavLink from "@material-tailwind/react/NavLink";
import Icon from "@material-tailwind/react/Icon";

import UserNavbarDropdown from "./UserNavbarDropdown";
import LeftCategoryDrawer from "./LeftCategoryDrawer";

export default function TopNavbar() {
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <nav
      className={`flex flex-wrap items-center justify-between py-1 border-b`}
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <NavbarContainer>
        <LeftCategoryDrawer />

        <NavbarWrapper>
          <NavbarBrand>
            <div className="text-amber-500 text-xl">🥖 &nbsp;Recipe</div>
          </NavbarBrand>
          <NavbarToggler
            color="white"
            onClick={() => setOpenNavbar(!openNavbar)}
            ripple="dark"
          />
        </NavbarWrapper>
        <NavbarCollapse open={openNavbar}>
          <Nav>
            <NavLink href="/" rel="noreferrer" ripple="light">
              <div className="text-black flex lg:flex-row lg:items-center">
                <Icon name="description" size="xl" />
                &nbsp;Home
              </div>
            </NavLink>

            <NavLink href="/recipes" rel="noreferrer" ripple="light">
              <div className="text-black flex lg:flex-row lg:items-center">
                <Icon name="apps" size="xl" />
                &nbsp;Recipes
              </div>
            </NavLink>

            <NavLink href="/newrecipe" rel="noreferrer" ripple="light">
              <div className="text-black flex lg:flex-row lg:items-center">
                <Icon name="apps" size="xl" />
                &nbsp;New Recipe
              </div>
            </NavLink>

            <NavLink href="/profile" rel="noreferrer" ripple="light">
              <div className="text-black flex lg:flex-row lg:items-center">
                <Icon name="apps" size="xl" />
                &nbsp;Profile
              </div>
            </NavLink>
          </Nav>
        </NavbarCollapse>
        <UserNavbarDropdown />
      </NavbarContainer>
      {/* </Navbar> */}
    </nav>
  );
}
