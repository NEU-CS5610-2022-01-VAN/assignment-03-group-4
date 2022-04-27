import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from "@mui/material/CircularProgress";
import { BiFoodMenu } from "react-icons/bi";
import { BsPeople, BsThreeDots } from "react-icons/bs";
import { useUserContext } from "../hooks/UserContext";

const ProfileCard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { user: dbUser } = useUserContext();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      {isAuthenticated && (
        <>
        <div className="flex flex-row">
          <img style={{width:120, height:120}}className="rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRLEBz8dv7exnpLc4qsK_KITdJsCuttgr-Pw&usqp=CAU" alt={dbUser&&dbUser.name} />
          <div className="flex flex-col text-lg ml-10 mt-3">
              <div className="mt-3" style={{fontSize: 24,fontWeight: 500}}>{dbUser&&dbUser.name}</div>
              <div className="flex flex-row  mt-3" style={{fontSize: 28,fontWeight: 500}}>
                <div className="flex flex-row" style={{color: "#233748", fontSize: 18, }}>   
                  <div><BiFoodMenu size={18} /></div>
                  <div>{dbUser&&dbUser.recipes.length}Recipes</div>
                </div>
                <div className="flex flex-row ml-7" style={{color: "#233748", fontSize: 18, }}>
                <div><BsPeople size={18} /></div>
                  <div>{dbUser&&dbUser.reviews.length}Comments</div>
                  </div>
              </div>
              {/* <div className="text-lg">{(user as any).email}</div> */}
          </div>
        </div>
        <div className="text-lg mt-3">
          Bio: {dbUser&&dbUser.bio}
        </div>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
