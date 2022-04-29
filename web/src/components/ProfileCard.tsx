import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { BiFoodMenu } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { useUserContext } from "../hooks/UserContext";
import { IoBookmarksOutline } from "react-icons/io5";
import { Avatar, Box, Typography } from "@mui/material";

const defaultPicture =
  "https://media.istockphoto.com/vectors/user-profile-icon-vector-avatar-portrait-symbol-flat-shape-person-vector-id1270368615?k=20&m=1270368615&s=170667a&w=0&h=qpvA8Z6L164ZcKfIyOl-E8fKnfmRZ09Tks7WEoiLawA=";

const ProfileCard = () => {
  const { isLoading, user, userPicture } = useUserContext();

  if (!user) {
    return <CircularProgress />;
  }

  return (
    <>
      <div className="flex flex-row " style={{ marginRight: "2%" }}>
        <Avatar
          sx={{ width: 120, height: 120, marginRight: "2vw" }}
          src={userPicture ? userPicture : defaultPicture}
          alt={"user avatar"}
        />

        <div className="flex flex-col text-lg ">
          <div className="mt-3">{user.name}</div>
          <div className="flex w-full flex-wrap mt-3 gap-2 ">
            <div className="flex flex-row">
              <div className="mt-1">
                <BiFoodMenu size={18} />
              </div>
              <div>&nbsp;{user.recipes.length}&nbsp;Recipes</div>
            </div>
            <div className="flex flex-row">
              <div className="mt-1">
                <BsPeople size={18} />
              </div>
              <div>&nbsp;{user.reviews.length}&nbsp;Comments</div>
            </div>
          </div>
          <div className="mt-2 items-center flex flex-row">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <div style={{ alignSelf: "start" }}></div>
            </div>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box sx={{ paddingTop: "4px" }}>
                <IoBookmarksOutline size={18} />
              </Box>
              <Typography>&nbsp;Bio: "{user.bio}"</Typography>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
