import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from "@mui/material/CircularProgress";


const ProfileCard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      {isAuthenticated && (
        <div className="flex flex-row">
          <img style={{width:120, height:120}}className="rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRLEBz8dv7exnpLc4qsK_KITdJsCuttgr-Pw&usqp=CAU" alt={(user as any).name} />
          <div className="flex flex-col text-lg ml-10 mt-3">
              <div className="mt-3" style={{fontSize: 24,fontWeight: 500}}>{(user as any).name}</div>
              <div className="flex flex-row  mt-3" style={{fontSize: 28,fontWeight: 500}}>
                <div style={{color: "#233748", fontSize: 18, }}>0 Recipes</div>
                <div className="ml-7" style={{color: "#233748", fontSize: 18, }}>0 Reviews</div>
              </div>
              {/* <div className="text-lg">{(user as any).email}</div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
