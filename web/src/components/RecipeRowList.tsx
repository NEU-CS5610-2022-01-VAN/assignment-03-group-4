import axios from "axios";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import RecipeRow from "./RecipeRow";

const RecipeRowList = ({ url }) => {
  const {
    isLoading,
    error,
    data: recipes,
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
      ) : (
        <section className=" pt-10 pb-48">
          <div className="flex flex-wrap container max-w-7xl mx-auto px-4">
            {recipes.map((recipe) => (
              <div className="px-3 pt-6 pb-8" key={recipe._id}>
                <RecipeRow recipe={recipe} key={recipe.id} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default RecipeRowList;
