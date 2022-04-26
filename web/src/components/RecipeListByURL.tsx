import CircularProgress from "@mui/material/CircularProgress";
import RecipeList from "./RecipeList";
import GetRecipesByURL from "../api/RecipeListAPI";

const RecipeListByURL = ({ url }) => {
  const { isLoading, error, data: recipes, isFetching } = GetRecipesByURL(url);

  return (
    <>
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <RecipeList recipes={recipes} />
      )}
    </>
  );
};

export default RecipeListByURL;
