import "./css/RecipeDetail.css";
import axios from "axios";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Rating, Avatar } from "@mui/material";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { BsDot } from "react-icons/bs";
import { BiCommentDots } from "react-icons/bi";
import {
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
} from "react-share";
import MyAvatar from "../components/MyAvatar";
import ReviewList from "../components/ReviewList";
import NewComment from "../components/NewComment";
import MyCarousel from "../components/MyCarousel";
import LoadingIcon from "../components/LoadingIcon";
import RecipeNote from "../components/RecipeNote";
import DeleteRecipeButton from "../components/DeleteRecipeButton";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const RecipeDetail = (): JSX.Element => {
  const recipeId = useParams().recipeId;
  const url = `${process.env.REACT_APP_API_BASE_URL}/recipes/${recipeId}`;

  const { user, isAuthenticated, isLoading: userIsLoading } = useAuth0();

  const {
    isLoading,
    error,
    data: recipe,
  } = useQuery<IRecipe, Error>("recipeDetail", () =>
    axios.get(url).then((res) => res.data)
  );

  const myRef = useRef(null);
  const ingredientRef = useRef(null);
  const directionRef = useRef(null);
  const newCommentRef = useRef(null);

  const defaultPicture =
    "https://media.istockphoto.com/vectors/user-profile-icon-vector-avatar-portrait-symbol-flat-shape-person-vector-id1270368615?k=20&m=1270368615&s=170667a&w=0&h=qpvA8Z6L164ZcKfIyOl-E8fKnfmRZ09Tks7WEoiLawA=";

  return (
    <div className="w-full pt-10 pb-48">
      {error ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        <LoadingIcon />
      ) : (
        <div className="container max-w-4xl mx-auto px-4">
          <div className="share relative flex gap-3 ">
            <FacebookShareButton url={url} quote={recipe?.title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton title={recipe?.title} url={url}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
          {recipe && recipe.categories.length > 0 && (
            <div className="mt-2 recipe-category text-sm font-medium flex content-center pb-16">
              <div className="font-roboto px-1 py-1 text-sm uppercase ">
                FILED UNDER: &nbsp;
              </div>
              {recipe.categories.map((category: any) => (
                <Link key={category._id} to={`/categories/${category._id}`}>
                  <div
                    className="mr-2 font-roboto px-1 py-1 text-sm uppercase "
                    style={{ color: "#03897B", backgroundColor: "#F0F9F8" }}
                    key={category._id}
                  >
                    {category.name}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {isAuthenticated &&
            !userIsLoading &&
            user?.sub === recipe!.author._id && (
              <div className="ml-auto w-12 font-serif hover:text-light-green-700">
                <DeleteRecipeButton recipeId={recipe!._id} />
              </div>
            )}

          <div className=" text-6xl font-serif">{recipe!.title}</div>
          <div className="text-gray-800 pt-4 text-xl font-serif">
            {recipe!.body}
          </div>
          <div className="py-4 flex">
            {recipe?.author.picture ? (
              <MyAvatar userId={recipe.author._id} />
            ) : (
              <Avatar src={defaultPicture} />
            )}
            <div className="px-2">
              <h3 className="flex">
                By&nbsp;
                <Link to={`/profile/${recipe!.author._id}`}>
                  <div className="font-roboto">{recipe!.author.name}</div>
                </Link>
              </h3>
              <div className="text-gray-600 text-sm">
                on {recipe!.createdAt.split("T")[0]}
              </div>
            </div>
          </div>

          {(recipe!.photos.length || recipe!.youtubeVideoId) && (
            <>
              <hr />
              <MyCarousel
                recipeId={recipeId!}
                photos={recipe!.photos}
                video={recipe!.youtubeVideoId}
              >
                <RecipeNote
                  recipe={recipe!}
                  myRef={myRef}
                  ingredientRef={ingredientRef}
                  directionRef={directionRef}
                />
              </MyCarousel>
            </>
          )}

          <hr className="mt-2" />
          <div ref={ingredientRef} className="text-3xl font-serif pt-3">
            Ingredients
          </div>
          <div className="font-serif flex flex-col gap-2 py-4">
            {recipe!.ingredients.map((item) => (
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
            {recipe!.instructions.map((step, index) => (
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
            onClick={() => {
              scrollToRef(newCommentRef);
            }}
          >
            ❤️ How would you rate this recipe?
            <Rating
              onChange={(e) => {}}
              id="rating"
              name="rating"
              className="pt-2"
              size="large"
              value={0}
            />
          </div>

          <hr className="mt-16" />
          <h4 className="font-serif font-semibold text-xl flex items-end text-gray-800">
            <div ref={myRef}>Reviews</div>
            <div style={{ marginBottom: 3 }} className="ml-1 text-sm ">
              ({recipe!.reviews.length})
            </div>
          </h4>
          {recipe!.reviews.length > 0 ? (
            <ReviewList
              url={url + "/reviews"}
              showDeleteButton={false}
              showRecipe={false}
            />
          ) : (
            <div className="flex flex-col justify-center text-gray-600 my-16 p-2 items-center">
              <BiCommentDots size={25} />
              <p> There is no review here.</p>
              <p>Come and be the first to comment.</p>
            </div>
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
          {recipeId && <NewComment recipeId={recipeId} />}
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
