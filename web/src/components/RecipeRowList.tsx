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
        <section className="">
          <div className="flex flex-wrap container mt-16 mx-auto gap-6">
            {recipes.map((recipe) => (
              <div className="w-full my-6" key={recipe._id}>
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
