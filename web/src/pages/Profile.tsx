import { useParams } from "react-router-dom";
import LoginButton from "../components/LoginButton";

import ProfileCard from "../components/ProfileCard";
import PublicProfile from "../components/PublicProfile";

const Profile = () => {
  const params = useParams();
  const userId = params.userId;

  return (
    <>
      <LoginButton>Log in!!!!</LoginButton>
      {!userId && <ProfileCard />}

      {userId && <PublicProfile userId={userId} />}
    </>
  );
};

export default Profile;
