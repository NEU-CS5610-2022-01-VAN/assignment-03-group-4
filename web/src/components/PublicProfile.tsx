import axios from "axios";
import { useQuery } from "react-query";

import RecipeList from "../components/RecipeList";
import ReviewList from "../components/ReviewList";

const baseUrl = process.env.REACT_APP_API_BASE_URL + "/users/";

const PublicProfile = ({ userId }) => {
  const url = baseUrl + userId;

  const {
    isLoading,
    error,
    data: user,
    isFetching,
  } = useQuery(url, () => axios.get(url).then((res) => res.data));

  return (
    <>
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>{user.name}'s Public Profile</h1>
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

export default PublicProfile;
