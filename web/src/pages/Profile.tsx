import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import RecipeList from "../components/RecipeList";
import ReviewList from "../components/ReviewList";
import ProfileCard from "../components/ProfileCard";
import PublicProfile from "../components/PublicProfile";

const Profile = () => {
  const params = useParams();
  const userId = params.userId;

  // const {
  //   isLoading,
  //   error,
  //   data: user,
  //   isFetching,
  // } = useQuery("user", () => axios.get(url).then((res) => res.data));

  return (
    <>
      {!userId && <ProfileCard />}

      {userId && <PublicProfile userId={userId} />}
    </>
  );
};

export default Profile;
