import RecipeList from "./RecipeList";
import GetRecipesByURL from "../api/RecipeListAPI";
import LoadingIcon from "./LoadingIcon";

const RecipeListByURL = ({ url }) => {
  const { isLoading, error, data: recipes, isFetching } = GetRecipesByURL(url);

  return (
    <>
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <LoadingIcon />
      ) : (
        <RecipeList recipes={recipes} />
      )}
    </>
  );
};

export default RecipeListByURL;
