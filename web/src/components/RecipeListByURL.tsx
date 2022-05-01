import RecipeList from "./RecipeList";
import GetRecipesByURL from "../apis/GetRecipesByUrl";
import LoadingIcon from "./LoadingIcon";

type Props = { url: string };

const RecipeListByURL = ({ url }: Props): JSX.Element => {
  const { isLoading, error, data: recipes } = GetRecipesByURL(url);

  return (
    <>
      {error ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        <LoadingIcon />
      ) : (
        <>{recipes && <RecipeList recipes={recipes} />}</>
      )}
    </>
  );
};

export default RecipeListByURL;
