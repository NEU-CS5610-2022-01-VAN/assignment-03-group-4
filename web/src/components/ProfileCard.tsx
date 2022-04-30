import React from "react";
import { BiFoodMenu } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { IoBookmarksOutline } from "react-icons/io5";
import { Avatar, Box, Typography } from "@mui/material";
import GetAvatarById from "../apis/UserAvatarAPI";
import LoadingIcon from "./LoadingIcon";

const defaultPicture =
  "https://media.istockphoto.com/vectors/user-profile-icon-vector-avatar-portrait-symbol-flat-shape-person-vector-id1270368615?k=20&m=1270368615&s=170667a&w=0&h=qpvA8Z6L164ZcKfIyOl-E8fKnfmRZ09Tks7WEoiLawA=";

const ProfileCard = ({ user }) => {
  const { data } = GetAvatarById(user._id);
  if (!user) {
    return <LoadingIcon />;
  }

  return (
    <>
      <div
        className="flex flex-row "
        style={{
          marginRight: "2%",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            width: 120,
            height: 120,
            marginRight: "3.5vw",
            marginLeft: "3vw",
          }}
          src={data ? data : defaultPicture}
          alt={"user avatar"}
        />

        <div className="flex flex-col text-lg " style={{ width: 230 }}>
          <div className="mt-3" style={{ fontWeight: "500" }}>
            {user.name}
          </div>
          <div className="flex w-full flex-col mt-3 gap-2 ">
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
