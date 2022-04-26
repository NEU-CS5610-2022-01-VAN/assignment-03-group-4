import axios from "axios";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes }) => {
  return (
    <>
      <section className="pt-10 pb-48">
        <div className="justify-evenly md:justify-start flex flex-wrap container max-w-8xl mx-auto px-4 ">
          {recipes.map((recipe) => (
            <div className="px-2 pt-6 pb-8" key={recipe._id}>
              <RecipeCard recipe={recipe} key={recipe.id} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default RecipeList;
