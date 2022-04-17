import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import RecipeList from "../components/RecipeList";
import ReviewList from "../components/ReviewList";
import ProfileCard from "../components/ProfileCard";
import LoginButton from "../components/LoginButton";

const baseUrl = process.env.REACT_APP_API_BASE_URL + "/users/";

const Profile = () => {
  const params = useParams();
  const userId = params.userId;
  const url = baseUrl + params.userId;

  const {
    isLoading,
    error,
    data: user,
    isFetching,
  } = useQuery("user", () => axios.get(url).then((res) => res.data));

  return (
    <>
      {!userId && <ProfileCard />}

      {userId && !isLoading && !error && (
        <>
          <div>
            <h2>{user.name}'s recipes</h2>
            <RecipeList url={url + "/recipes"} />
          </div>

          <div>
            <h2>{user.name}'s reviews</h2>
            <ReviewList url={url + "/reviews"} />
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
