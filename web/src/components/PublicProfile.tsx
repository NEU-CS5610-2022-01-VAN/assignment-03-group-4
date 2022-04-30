import axios from "axios";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";

import RecipeRowList from "../components/RecipeRowList";
import ReviewList from "../components/ReviewList";
import LoadingIcon from "./LoadingIcon";
const baseUrl = process.env.REACT_APP_API_BASE_URL + "/users/";

const PublicProfile = ({ showRecipe, userId }) => {
  const url = baseUrl + userId;

  const { isLoading, error } = useQuery(url, () =>
    axios.get(url).then((res) => res.data)
  );

  return (
    <>
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <LoadingIcon />
      ) : showRecipe ? (
        <>
          <div>
            <RecipeRowList url={url + "/recipes"} />
          </div>
        </>
      ) : (
        <div>
          <ReviewList
            url={url + "/reviews"}
            showDeleteButton={true}
            showRecipe={true}
          />
        </div>
      )}
    </>
  );
};

export default PublicProfile;
