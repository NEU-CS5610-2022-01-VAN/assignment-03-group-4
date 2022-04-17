import { useParams } from "react-router-dom";

import ProfileCard from "../components/ProfileCard";
import PublicProfile from "../components/PublicProfile";

const Profile = () => {
  const params = useParams();
  const userId = params.userId;

  return (
    <>
      {!userId && <ProfileCard />}

      {userId && <PublicProfile userId={userId} />}
    </>
  );
};

export default Profile;
