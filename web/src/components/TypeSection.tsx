import Carousel from "react-bootstrap/Carousel";
import GetImageById from "../api/ImageAPI";
import { CircularProgress, Skeleton } from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";
import RecipeList from "./RecipeList";
import RecipeCard from "./RecipeCard";

const url = process.env.REACT_APP_API_BASE_URL + "/categories";

const Section = ({ recipes }) => {
  return (
    <div className="py-8 w-full justify-evenly flex flex-wrap ">
      {/* <RecipeList recipes={recipes}></RecipeList> */}
      {recipes.map((recipe) => (
        <div className="pt-6 pb-8" key={recipe._id}>
          <RecipeCard recipe={recipe} key={recipe.id} />
        </div>
      ))}
    </div>
  );
};

const TypeSection = ({ recipes }) => {
  const {
    isLoading,
    error,
    data: categories,
    isFetching,
  } = useQuery(url, () => axios.get(url).then((res) => res.data));
  return (
    <>
      {console.log(categories)}
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        categories.map((category) => (
          <div className="flex flex-col font-serif text-xl font-bold pt-2">
            <hr className="mt-8 mb-2" />
            Find More on {category.name}
            <Section
              recipes={Array.from(
                recipes
                  .filter(
                    (x) =>
                      x.categories.length > 0 &&
                      x.categories.some((item) => item.name === category.name)
                  )
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 3)
              )}
            />
          </div>
        ))
      )}
    </>
  );
};

export default TypeSection;
