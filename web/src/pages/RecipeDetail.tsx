import axios from "axios";
import { Rating } from "@mui/material";
import React, { useState, useRef } from "react";

import "./css/RecipeDetail.css";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams } from "react-router-dom";
import ReviewList from "../components/ReviewList";
import NewComment from "../components/NewComment";
import Avatar from "@mui/material/Avatar";
import MyCarousel from "../components/MyCarousel";
import { BsDot } from "react-icons/bs";
import { BiCommentDots } from "react-icons/bi";

import DeleteRecipeButton from "../components/DeleteRecipeButton";

import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const recipeUrl = process.env.REACT_APP_API_BASE_URL + "/recipes/";
const executeScroll = (myRef) => scrollToRef(myRef);

const Note = ({ recipe, myRef, ingredientRef, directionRef }) => {
  return (
    <div className=" font-serif flex flex-col items-center gap-8">
      <div className=" flex flex-col items-center">
        <div className="inline-flex ">
          <div className=" text-gray-800 font-bold mr-2">
            {recipe.rating ? recipe.rating.toFixed(1) : "0.0"}
          </div>
          <Rating name="read-only" defaultValue={recipe.rating} readOnly />
        </div>
        <div
          onClick={() => executeScroll(myRef)}
          className="items-center text-sm hover:text-light-green-700"
        >
          {recipe.reviews.length} reviews
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div
          onClick={() => executeScroll(ingredientRef)}
          className="flex content-center  hover:text-light-green-700"
        >
          <div>Ingredients </div>
          <div className="text-gray-800 font-bold ml-2 ">
            {recipe.ingredients.length}
          </div>
        </div>
        <div
          onClick={() => executeScroll(directionRef)}
          className="flex content-center hover:text-light-green-700"
        >
          <div>Cooking Steps </div>
          <div className="text-gray-800 font-bold ml-2 ">
            {recipe.instructions.length}
          </div>
        </div>
        <div className="flex content-center ">
          Total Minutes
          <div className="text-gray-800 font-bold ml-2">没改</div>
        </div>
      </div>
    </div>
  );
};

const RecipeDetail = () => {
  const recipeId = useParams().recipeId;
  const url = recipeUrl + recipeId;
  const { user, isAuthenticated, isLoading: userIsLoading } = useAuth0();
  const {
    isLoading,
    error,
    data: recipe,
  } = useQuery("recipeDetail", () => axios.get(url).then((res) => res.data));

  const myRef = useRef(null);
  const ingredientRef = useRef(null);
  const directionRef = useRef(null);
  const newCommentRef = useRef(null);
  const [rating, setRating] = useState(0);

  return (
    <div className="w-full pt-10 pb-48 ">
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="container max-w-4xl mx-auto px-4">
            <div className="share relative flex gap-3 ">
              <FacebookShareButton url={url} quote={recipe.title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton title={recipe.title} url={url}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
            {recipe.categories.length > 0 && (
              <div className="mt-2 recipe-category text-sm font-medium flex content-center pb-16">
                <div className="font-roboto px-1 py-1 text-sm uppercase ">
                  FILED UNDER: &nbsp;
                </div>
                {recipe.categories &&
                  recipe.categories.map((category: any) => (
                    <Link to={`/categories/${category._id}`}>
                      <div
                        className="mr-2 font-roboto px-1 py-1 text-sm uppercase "
                        style={{ color: "#03897B", backgroundColor: "#F0F9F8" }}
                        key={category._id}
                      >
                        {category.name}
                      </div>
                    </Link>
                  ))}
                {isAuthenticated &&
                  !userIsLoading &&
                  (user as any).sub === recipe.author.id && (
                    <div className="ml-auto font-serif">
                      <DeleteRecipeButton recipeId={recipe.id} />
                    </div>
                  )}
              </div>
            )}
            <div className="mt-6 text-6xl font-serif">{recipe.title}</div>
            <div className="text-gray-800 pt-4 text-xl font-serif">
              {recipe.body}
            </div>
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
                  on {recipe.createdAt.split("T")[0]}
                </div>
              </div>
            </div>

            {recipe.photos.length || recipe.youtubeVideoId ? (
              <>
                <hr />
                <MyCarousel
                  recipeId={recipeId}
                  photos={recipe.photos}
                  video={recipe.youtubeVideoId}
                >
                  <Note
                    recipe={recipe}
                    myRef={myRef}
                    ingredientRef={ingredientRef}
                    directionRef={directionRef}
                  />
                </MyCarousel>
              </>
            ) : (
              <></>
            )}

            <hr className="mt-2" />
            <div ref={ingredientRef} className="text-3xl font-serif pt-3">
              Ingredients
            </div>
            <div className="font-serif flex flex-col gap-2 py-4">
              {recipe.ingredients.map((item) => (
                <div className="ml-10 flex items-center" key={item}>
                  <BsDot />
                  <div className="ml-2">{item}</div>
                </div>
              ))}
            </div>
            <hr className="mt-2" />
            <div ref={directionRef} className="text-3xl font-serif pt-3">
              Directions
            </div>
            <div className="py-2 font-serif flex flex-col gap-2 py-4">
              {recipe.instructions.map((step, index) => (
                <div key={index}>
                  <div className="text-xl font-medium">Step {index + 1}</div>
                  <div className="ml-16">{step}</div>
                </div>
              ))}
            </div>
            <hr className="mt-16" />

            <div
              className="mt-2 flex flex-col place-items-center w-full p-6 text-xl font-serif"
              style={{ backgroundColor: "#F5F1E7" }}
            >
              ❤️ How would you rate this recipe?
              <Rating
                onChange={(e, value) => {
                  scrollToRef(newCommentRef);
                  if (value != null) setRating(value);
                }}
                className="pt-2"
                size="large"
                name="rate"
                defaultValue={0}
              />
            </div>

            <hr className="mt-16" />
            <h4 className="font-serif font-semibold text-xl flex items-end text-gray-800">
              <div ref={myRef}>Reviews</div>
              <div style={{ marginBottom: 3 }} className="ml-1 text-sm ">
                ({recipe.reviews.length})
              </div>
            </h4>
            {recipe.reviews.length > 0 ? (
              <ReviewList url={url + "/reviews"} />
            ) : (
              <>
                <div className="flex flex-col justify-center text-gray-600 my-16 p-2 items-center">
                  <BiCommentDots size={25} />
                  <p> There is no review here.</p>
                  <p>Come and be the first to comment.</p>
                </div>
              </>
            )}
            <hr className="mt-10" />
            <div>
              <h4
                ref={newCommentRef}
                className="font-serif font-semibold  text-xl text-gray-800"
              >
                Leave comment
              </h4>
            </div>
            <NewComment rating={rating} recipeId={recipeId} />
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetail;
