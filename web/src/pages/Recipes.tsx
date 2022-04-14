import { useEffect, useState } from "react";
import RecipeList from "../components/RecipeList";

const recipesUrl = process.env.REACT_APP_API_BASE_URL + "/recipes";

function Recipes() {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Array<any>>([]);

  useEffect(() => {
    fetch(recipesUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setRecipes(result);
          setIsLoaded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error: Error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <div>
      {error ? (
        <div>Error: {error.mesasge}</div>
      ) : !isLoaded ? (
        <div>Loading...</div>
      ) : (
        <RecipeList recipes={recipes} />
      )}
    </div>
  );
}

export default Recipes;
