import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserProfile from "../components/UserProfile";
import LoadingIcon from "../components/LoadingIcon";

const Profile = (): JSX.Element => {
  const params = useParams();
  const userId = params.userId;
  const { isLoading, isAuthenticated, user } = useAuth0();

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <>
      {/* not logged in user with route params */}
      {!isAuthenticated && userId && (
        <UserProfile userId={userId} isCurrentUser={false} />
      )}

      {/* Logged in user view other's profile with rout params */}
      {isAuthenticated && user?.sub && userId && userId !== user.sub && (
        <UserProfile userId={userId!} isCurrentUser={false} />
      )}

      {/* user view his own proifle with route params */}
      {isAuthenticated && user?.sub && userId === user.sub && (
        <UserProfile userId={user.sub} isCurrentUser={true} />
      )}

      {/* Logged in user view his own profile without route params */}
      {isAuthenticated && user?.sub && !userId && (
        <UserProfile userId={user?.sub} isCurrentUser={true} />
      )}
    </>
  );
};

export default Profile;
