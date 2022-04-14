import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

const recipeUrl = process.env.REACT_APP_API_BASE_URL + "/recipes/";

const RecipeDetail = () => {
  const params = useParams();
  const recipeId = params.recipeId;

  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    axios
      .get(recipeUrl + recipeId)
      .then((res) => {
        setRecipe(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        setIsLoaded(true);
        setError(err);
      });
  }, [recipeId]);

  return (
    <div>
      {error ? (
        <div>Error: {error.mesasge}</div>
      ) : !isLoaded ? (
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
