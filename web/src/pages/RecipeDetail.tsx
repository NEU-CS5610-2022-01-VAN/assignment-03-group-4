import axios from "axios";
import { Rating } from "@mui/material";

import { Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams } from "react-router-dom";
import { CheckBox } from "@mui/icons-material";
import ReviewList from "../components/ReviewList";
import NewComment from "../components/NewComment";
import Avatar from "@mui/material/Avatar";
import MyCarousel from "../components/MyCarousel";

import DeleteRecipeButton from "../components/DeleteRecipeButton";
import { grey } from "@mui/material/colors";

const recipeUrl = process.env.REACT_APP_API_BASE_URL + "/recipes/";

const RecipeDetail = () => {
  const recipeId = useParams().recipeId;
  const url = recipeUrl + recipeId;
  const { user, isAuthenticated, isLoading: userIsLoading } = useAuth0();

  const {
    isLoading,
    error,
    data: recipe,
    isFetching,
  } = useQuery("recipeDetail", () => axios.get(url).then((res) => res.data));

  return (
    <div className="w-full pt-10 pb-48 ">
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="fixed float-left bg-amber-500 ml-30 p-3">share</div>
          <div className="container max-w-4xl mx-auto px-4 ml-50">
            <div className="recipe-category text-sm font-medium flex content-center pb-16">
              <div className="font-roboto px-1 py-1 text-sm uppercase ">
                FILED UNDER: &nbsp;
              </div>
              {recipe.categories &&
                recipe.categories.map((category: any) => (
                  <div
                    className="font-roboto px-1 py-1 text-sm uppercase "
                    style={{ color: "#03897B", backgroundColor: "#F0F9F8" }}
                    key={category._id}
                  >
                    {category.name}
                  </div>
                ))}
            </div>
            <div className="text-6xl font-serif">{recipe.title}</div>
            <div className="text-gray-800 pt-4 text-xl font-serif">
              This quick and easy sheet pan dinner is on the table in less than
              30 minutes and the whole family will love it!
            </div>
            {/* <hr className="mt-4" /> */}
            <div className="py-4 flex">
              <Avatar alt="avater" src="../assets/img/recipe.png" />

              <div className="px-2">
                <h3 className="flex">
                  By&nbsp;
                  <Link to={`/profile/${recipe.author.id}`}>
                    <div className="font-roboto">{recipe.author.name}</div>
                  </Link>
                </h3>
                <div className="text-gray-600 text-sm">
                  on September 20, 2021{" "}
                </div>
              </div>
            </div>
            {/* <div className="py-3 inline-flex">
              <Rating name="read-only" value={recipe.rating} readOnly />
              <div>0 Ratings</div>
              <div>1 Reviews</div>
            </div> */}
            <hr />
            <MyCarousel />
            {/* {recipe.photos.length ? (
              <>
                {recipe.photos.map((img) => (
                  <ImageCard
                    photoId={img}
                    recipeId={recipe.id}
                    card={false}
                    key={img}
                  />
                ))}
              </>
            ) : (
              <img
                className="recipe_card_image"
                src="https://x.yummlystatic.com/web/strawberry-grain.png"
                alt="recipe"
              />
            )} */}
            {/* <div>How to cook: {recipe.body}</div>
             */}
            <hr className="mt-2" />
            <div className="text-3xl font-serif pt-3">Ingredients</div>
            <div className="font-serif flex flex-col gap-2 py-4">
              <div>👌 2 slices whole grain bread </div>
              <div>👌 ½ avocado </div>
              <div>👌 2 tablespoons</div>
            </div>
            <hr className="mt-2" />
            <div className="text-3xl font-serif pt-3">Directions</div>
            <div className="py-2 font-serif flex flex-col gap-2 py-4">
              <div className="text-xl font-medium">Step 1</div>
              <div className="ml-16">
                Toast bread slices to desired doneness, 3 to 5 minutes.
              </div>
              <div className="py-2 text-xl font-medium">Step 2</div>
              <div className="ml-16">
                Mash avocado in a bowl; stir in cilantro, Meyer lemon juice,
                Meyer lemon zest, cayenne pepper, and sea salt. Spread avocado
                mixture onto toast and top with chia seeds.
              </div>
            </div>
            {isAuthenticated &&
              !userIsLoading &&
              (user as any).sub === recipe.author.id && (
                <DeleteRecipeButton recipeId={recipe.id} />
              )}
            <div
              className="mt-10 flex flex-col place-items-center w-full p-6 text-xl font-serif"
              style={{ backgroundColor: "#F5F1E7" }}
            >
              ❤️ How would you rate this recipe?
              <Rating className="pt-2" size="large" name="rate" value={0} />
            </div>
            <hr className="mt-24" />
            <h4>What others say about this recipe?</h4>
            <ReviewList url={url + "/reviews"} />
            <hr className="mt-24" />
            <NewComment recipeId={recipeId} />
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetail;
