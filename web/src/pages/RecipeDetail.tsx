import axios from "axios";
import { Rating } from "@mui/material";

import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams } from "react-router-dom";
import ReviewList from "../components/ReviewList";
import NewComment from "../components/NewComment";
import Avatar from "@mui/material/Avatar";
import MyCarousel from "../components/MyCarousel";
import { BsDot } from "react-icons/bs";
import DeleteRecipeButton from "../components/DeleteRecipeButton";

import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

const recipeUrl = process.env.REACT_APP_API_BASE_URL + "/recipes/";

const RecipeDetail = () => {
  const recipeId = useParams().recipeId;
  const url = recipeUrl + recipeId;
  const { user, isAuthenticated, isLoading: userIsLoading } = useAuth0();

  const {
    isLoading,
    error,
    data: recipe,
  } = useQuery("recipeDetail", () => axios.get(url).then((res) => res.data));

  return (
    <div className="w-full pt-10 pb-48 ">
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className=" bg-indigo-500 fixed ml-30 p-3 ">
            <FacebookShareButton url={url} quote={recipe.title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <br />
            <TwitterShareButton title={recipe.title} url={url}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
          <div className="container max-w-4xl mx-auto px-4">
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
              {isAuthenticated &&
                !userIsLoading &&
                (user as any).sub === recipe.author.id && (
                  <div className="ml-auto font-serif">
                    <DeleteRecipeButton recipeId={recipe.id} />
                  </div>
                )}
            </div>
            <div className="text-6xl font-serif">{recipe.title}</div>
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

            <hr />
            {recipe.photos.length || recipe.youtubeVideoId ? (
              <MyCarousel
                recipeId={recipeId}
                photos={recipe.photos}
                video={recipe.youtubeVideoId}
              >
                <div
                  style={{
                    width: "200px",
                    height: "378px",
                    borderColor: "#D9D9D9",
                    backgroundColor: "#F5F1E7",
                  }}
                  className="flex flex-col mx-auto bg-amber-300 rounded"
                >
                  <div className="mt-10 font-serif flex flex-col items-center gap-2 py-2">
                    <div className="flex content-center  ">
                      <div className=" text-gray-800 font-bold mr-2">
                        {recipe.rating ? recipe.rating.toFixed(1) : "0.0"}
                      </div>
                      <Rating name="read-only" value={recipe.rating} readOnly />
                    </div>

                    <div className="items-center text-sm">
                      {recipe.reviews.length} Ratings {recipe.reviews.length}{" "}
                      reviews
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex content-center mt-5 ">
                        Total Minutes
                        <div className="text-gray-800 font-bold ml-2">{3}</div>
                      </div>
                      <div className="flex content-center ">
                        <div>Ingredients </div>
                        <div className="text-gray-800 font-bold ml-2">
                          {recipe.ingredients.length}
                        </div>
                      </div>
                      <div className="flex content-center ">
                        <div>Cooking Steps </div>
                        <div className="text-gray-800 font-bold ml-2">
                          {recipe.instructions.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </MyCarousel>
            ) : (
              <></>
            )}
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
              {recipe.ingredients.map((item) => (
                <div className="ml-10 flex items-center">
                  <BsDot />
                  <div className="ml-2">{item}</div>
                </div>
              ))}
            </div>
            <hr className="mt-2" />
            <div className="text-3xl font-serif pt-3">Directions</div>
            <div className="py-2 font-serif flex flex-col gap-2 py-4">
              {recipe.instructions.map((step, index) => (
                <>
                  <div className="text-xl font-medium">Step {index + 1}</div>
                  <div className="ml-16">{step}</div>
                </>
              ))}
            </div>

            <div
              className="mt-10 flex flex-col place-items-center w-full p-6 text-xl font-serif"
              style={{ backgroundColor: "#F5F1E7" }}
            >
              ❤️ How would you rate this recipe?
              <Rating className="pt-2" size="large" name="rate" value={0} />
            </div>
            {/* <hr className="mt-24" /> */}
            <h4 className="font-serif mt-10">
              What others say about this recipe?
            </h4>
            <ReviewList url={url + "/reviews"} />
            <hr className="mt-10" />
            <NewComment recipeId={recipeId} />
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetail;
