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
import { CgProfile } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { makeStyles } from "@material-ui/styles";
import { InputAdornment, TextField } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    fontSize: 22,
    color: "#444",
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginBottom: "0.3vh",
  },
  textField: {},
}));

export default function TopNavbar() {
  const classes = useStyles();
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
                <Icon name="home" size="xl" />
                &nbsp;Home
              </div>
            </NavLink>

            <NavLink href="/newrecipe" rel="noreferrer" ripple="light">
              <div className="text-black flex lg:flex-row lg:items-center">
                <Icon name="add" family="material-icons" size="xl" />
                &nbsp;New Recipe
              </div>
            </NavLink>

            <NavLink href="/profile" rel="noreferrer" ripple="light">
              <div className="text-black flex lg:flex-row lg:items-center">
                <Icon name="account_circle" size="xl" />
                &nbsp;Profile
              </div>
            </NavLink>
          </Nav>
        </NavbarCollapse>
        {/* <BsSearch size={20} /> */}
        <TextField
          id="title"
          color="success"
          InputLabelProps={{ shrink: true }}
          sx={{ width: 180 }}
          type="text"
          name="title"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FiSearch size={20} />
                {/* </IconButton> */}
              </InputAdornment>
            ),
          }}
          // placeholder="Give your recipe a name"
          // onChange={handleChange}
          // onBlur={handleBlur}
          // value={values.title}
          // error={Boolean(errors.title) && Boolean(touched.title)}
          // helperText={
          //   Boolean(errors.title) && Boolean(touched.title)
          //     ? errors.title
          //     : " "
          // }
        />
        {/* <FiSearch size={20} /> */}
        <UserNavbarDropdown />
      </NavbarContainer>
      {/* </Navbar> */}
    </nav>
  );
}
