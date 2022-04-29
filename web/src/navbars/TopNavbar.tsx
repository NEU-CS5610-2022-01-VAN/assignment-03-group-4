import React, { useState } from "react";
// import Navbar from "@material-tailwind/react/Navbar";

import { Box, Button, IconButton, Typography } from "@mui/material";

import UserNavbarDropdown from "./UserNavbarDropdown";
import LeftCategoryDrawer from "./LeftCategoryDrawer";
import { CgProfile } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { makeStyles } from "@material-ui/styles";
import { InputAdornment, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "@material-tailwind/react/Navbar";

import { IoMdAdd } from "react-icons/io";
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
  const [openNavbar, setOpenNavbar] = useState(false);
  const navigate = useNavigate();
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${e.target.value}`);
    }
  };

  return (
    <nav className="flex flex-row items-center justify-between py-1 border-b bg-white">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          ml: "2%",
        }}
      >
        <LeftCategoryDrawer />
        <Box sx={{ ml: "2vw" }}>
          <Button className="outline-none" href="/">
            <div className="text-amber-500 text-2xl">🥖 &nbsp;Recipe</div>
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mr: "2%",
        }}
      >
        <TextField
          id="title"
          color="success"
          InputLabelProps={{ shrink: true }}
          sx={{
            width: "30vw",
            mr: 1,
            maxWidth: 200,
            display: { xs: "none", md: "block" },
          }}
          type="text"
          name="title"
          size="small"
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FiSearch size={20} />
              </InputAdornment>
            ),
          }}
          placeholder="find your recipe"
        />
        <IconButton
          href="/search"
          className="outline-none"
          size="large"
          sx={{ display: { xs: "block", md: "none" }, alignItems: "center" }}
          aria-label="new recipe page"
        >
          <FiSearch size={20} style={{ color: "#444" }} />
        </IconButton>

        <Button
          href="/newrecipe"
          className="outline-none"
          size="large"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IoMdAdd size={20} style={{ color: "#444" }} />
            <Box
              sx={{
                color: "#444",
                ml: 0.5,
                fontSize: 14,
              }}
            >
              New Recipe
            </Box>
          </Box>
        </Button>

        <IconButton
          href="/newrecipe"
          className="outline-none"
          size="large"
          sx={{ display: { xs: "block", md: "none" }, alignItems: "center" }}
          aria-label="search page"
        >
          <IoMdAdd size={20} style={{ color: "#444" }} />
        </IconButton>
        <UserNavbarDropdown />
      </Box>
    </nav>
  );
}
