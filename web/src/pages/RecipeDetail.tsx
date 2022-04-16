import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

const recipeUrl = process.env.REACT_APP_API_BASE_URL + "/recipes/";

const RecipeDetail = () => {
  const params = useParams();
  const url = recipeUrl + params.recipeId;

  const {
    isLoading,
    error,
    data: recipe,
    isFetching,
  } = useQuery("recipe", () => axios.get(url).then((res) => res.data));

  return (
    <div>
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <RecipeCard recipe={recipe} />
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
