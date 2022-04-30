import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

import axios from "axios";
import { useQuery } from "react-query";
// import RecipeCard from "./RecipeCard";
import Section from "./Section";

const url = process.env.REACT_APP_API_BASE_URL + "/categories";

const TypeSection = ({ recipes }) => {
  const {
    isLoading,
    error,
    data: categories,
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
        categories.slice(0, 5).map((category) => (
          <div
            key={category._id}
            className="flex flex-col font-serif text-xl font-bold pt-2"
          >
            <Link to={`/categories/${category._id}`}>
              Find More on {category.name}
            </Link>
            <hr className="mt-2 mb-2" />
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
