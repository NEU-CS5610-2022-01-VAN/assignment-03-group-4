import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import Nav from '@material-tailwind/react/Nav';
import NavLink from '@material-tailwind/react/NavLink';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import Icon from '@material-tailwind/react/Icon';
import Button from '@material-tailwind/react/Button';


export default function Navibar() {
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <Navbar  color="transparent" navbar>
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
                            <NavLink
                                href="../pages/Home"
                                target="_blank"
                                rel="noreferrer"
                                ripple="light"
                            >
                                <Icon name="description" size="2xl" />
                                &nbsp;Home
                            </NavLink>
                            <NavLink
                                href="../pages/Login"
                                target="_blank"
                                rel="noreferrer"
                                ripple="light"
                            >
                                <Icon name="apps" size="2xl" />
                                &nbsp;Login
                            </NavLink>
                            <NavLink
                                href="../pages/Details"
                                target="_blank"
                                rel="noreferrer"
                                ripple="light"
                            >
                                <Icon name="apps" size="2xl" />
                                &nbsp;Details
                            </NavLink>
                           
                        </div>
                    </Nav>
                </NavbarCollapse>
        </NavbarContainer>
    </Navbar>
  );
}