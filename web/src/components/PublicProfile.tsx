
import axios from "axios";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";

import RecipeRowList from "../components/RecipeRowList";
import ReviewList from "../components/ReviewList";

const baseUrl = process.env.REACT_APP_API_BASE_URL + "/users/";

const PublicProfile = ({ showRecipe, userId }) => {
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
        <div>
          <CircularProgress color="inherit" />
        </div>
      ) : showRecipe?(
        <>
          <div>
            {/* <h2>Your recipes</h2> */}
            <RecipeRowList url={url + "/recipes"} />
          </div>
        </>
      ):(
          <div>
            {/* <h2>Your reviews</h2> */}
            <ReviewList url={url + "/reviews"} />
          </div>
      )}
    </>
  );
};

export default PublicProfile;
