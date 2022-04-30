import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

import UserProfile from "../components/UserProfile";

const Profile = () => {
  const params = useParams();
  const userId = params.userId;
  const { isLoading, isAuthenticated, user } = useAuth0();
  return (
    <>
      {!isLoading &&
        (userId && isAuthenticated && userId !== (user as any).sub ? (
          <UserProfile userId={userId} isCurrentUser={false} />
        ) : isAuthenticated ? (
          <>
            <UserProfile userId={(user as any).sub} isCurrentUser={true} />
          </>
        ) : (
          <UserProfile userId={userId} isCurrentUser={false} />
        ))}
    </>
  );
};

export default Profile;
