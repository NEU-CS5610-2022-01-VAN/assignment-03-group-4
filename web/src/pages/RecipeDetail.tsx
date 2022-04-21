import axios from "axios";
import { Rating } from "@mui/material";

import { Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams } from "react-router-dom";

import ReviewList from "../components/ReviewList";
import NewComment from "../components/NewComment";
import ImageCard from "../components/ImageCard";
import Avatar from "@mui/material/Avatar";

import DeleteRecipeButton from "../components/DeleteRecipeButton";

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
    <div className="w-full pt-10 pb-48">
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="fixed float-left bg-amber-500 ml-30 p-3">share</div>
          <div className="container max-w-7xl mx-auto px-4 ml-50">
            <div className="recipe-category text-sm font-medium flex pb-8">
              FILED UNDER: &nbsp;
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

            <div className="pt-6 flex">
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
            <div className="py-3 inline-flex">
              <Rating name="read-only" value={recipe.rating} readOnly />
              <div>0 Ratings</div>
              <div>1 Reviews</div>
            </div>
            <hr />

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
            <div>How to cook: {recipe.body}</div>
            {isAuthenticated &&
              !userIsLoading &&
              (user as any).sub === recipe.author.id && (
                <DeleteRecipeButton recipeId={recipe.id} />
              )}
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
