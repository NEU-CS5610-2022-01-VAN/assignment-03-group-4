import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { BiFoodMenu } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { useUserContext } from "../hooks/UserContext";

const ProfileCard = () => {
  const { user, userPicture } = useUserContext();

  if (!user) {
    return <CircularProgress />;
  }

  return (
    <>
      <div className="flex flex-row">
        {userPicture && (
          <img
            style={{ width: 120, height: 120 }}
            className="rounded-full"
            src={userPicture}
            alt={"user avatar"}
          />
        )}

        <div className="flex flex-col text-lg ml-10 mt-3">
          <div className="mt-3" style={{ fontSize: 24, fontWeight: 500 }}>
            {user.name}
          </div>
          <div
            className="flex flex-row  mt-3"
            style={{ fontSize: 28, fontWeight: 500 }}
          >
            <div
              className="flex flex-row"
              style={{ color: "#233748", fontSize: 18 }}
            >
              <div>
                <BiFoodMenu size={18} />
              </div>
              <div>{user.recipes.length}Recipes</div>
            </div>
            <div
              className="flex flex-row ml-7"
              style={{ color: "#233748", fontSize: 18 }}
            >
              <div>
                <BsPeople size={18} />
              </div>
              <div>{user.reviews.length}Comments</div>
            </div>
          </div>
          <div className="text-lg">{(user as any).email}</div>
        </div>
      </div>
      <div className="text-lg mt-3">Bio: {user.bio}</div>
    </>
  );
};

export default ProfileCard;
