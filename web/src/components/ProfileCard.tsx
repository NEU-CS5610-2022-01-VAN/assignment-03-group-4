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
        <div>
          <img src={(user as any).picture} alt={(user as any).name} />
          <h2>{(user as any).name}</h2>
          <p>{(user as any).email}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
