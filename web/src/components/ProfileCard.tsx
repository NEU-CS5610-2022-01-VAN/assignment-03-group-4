import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { BiFoodMenu } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { useUserContext } from "../hooks/UserContext";
import {IoBookmarksOutline} from "react-icons/io5";

const ProfileCard = () => {
  const { user, userPicture } = useUserContext();

  if (!user) {
    return <CircularProgress />;
  }

  return (
    <>
      <div className="flex flex-row " style={{gap:"8%", marginRight:"2%"}}>
        {userPicture && (
          <img
            style={{ width: 120, height: 120 }}
            className="rounded-full"
            src={userPicture}
            alt={"user avatar"}
          />
        )}
        <div className="flex flex-col text-lg ">
          <div className="mt-3">
            {user.name}
          </div>
          <div className="flex w-full flex-col mt-3 gap-2 lg:flex-row">
            <div
              className="flex flex-row"
            >
              <div className="mt-1">
                <BiFoodMenu size={18} />
              </div>
              <div>&nbsp;{user.recipes.length}&nbsp;Recipes</div>
            </div>
            <div
              className="flex flex-row"
            >
              <div className="mt-1">
                <BsPeople size={18} />
              </div>
              <div>&nbsp;{user.reviews.length}&nbsp;Comments</div>
            </div>
          </div>
          <div className="mt-2 items-center flex flex-row">
            <div className="">
              <IoBookmarksOutline size={18}/>
            </div>
            <div>&nbsp;Bio:&nbsp;"{user.bio}"</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
