import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserProfile from "../components/UserProfile";

const Profile = () => {
  const params = useParams();
  const userId = params.userId;
  const { isLoading, isAuthenticated, user } = useAuth0();
  return (
    <>
      {!isLoading &&
        (userId && isAuthenticated && userId !== user?.sub ? (
          <UserProfile userId={userId} isCurrentUser={false} />
        ) : (
          <>
            <UserProfile userId={user?.sub} isCurrentUser={true} />
          </>
        ))}
    </>
  );
};

export default Profile;
