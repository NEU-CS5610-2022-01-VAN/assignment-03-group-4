import "./css/recipeCard.css";
import { Image } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import ImageCard from "./ImageCard";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import React from "react";

import H6 from "@material-tailwind/react/Heading6";
import { url } from "inspector";

const RecipeCard = ({ recipe }) => (
  <>
    <Link to={`/recipe/${recipe.id}`}>
      <div
        className={`w-72 h-bg-white rounded-xl overflow-hdden shadow-md p-4`}
      >
        {recipe.photos.length ? (
          <ImageCard photoId={recipe.photos[0]} recipeId={recipe.id} />
        ) : (
          <div
            className={`rounded-lg -mt-9 shadow-lg`}
            style={{
              width: "255px",
              height: "240px",
              backgroundPosition: "center",
              backgroundImage: `url(https://www.maggi.co.uk/sites/default/files/styles/maggi_desktop_image_style/public/NUK1265%20maggi%20Recipes%20banner%201500x700px%20opt2A.jpg?h=4f5b30f1&itok=DcsF1RwA)`,
              backgroundSize: "cover",
            }}
          />
        )}

        <div className="p-4">
          <H6 color="gray">{recipe.title}</H6>
          <div>
            <h3>
              by&nbsp;
              <Link to={`/profile/${recipe.author.id}`}>
                {recipe.author.name}
              </Link>
            </h3>
          </div>
          {recipe.categories &&
            recipe.categories.map((category: any) => (
              <Button key={category._id}>{category.name}</Button>
            ))}

          {/* <ReactStars
            count={5}
            size={24}
            activeColor="yellow"
            value={recipe.rating}
            isHalf={true}
          />
          <>Rating: {recipe.rating}/5</> */}
        </div>
      </div>

      {/* <img
        className="recipe_card_image"
        src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F02%2F22%2F16383-basic-crepes-mfs_003.jpg"
        alt="recipe"
      /> */}

      {/* <div>
      <span>by </span>
      <Link to={`/profile/${recipe.author.id}`}>
        <h3>{recipe.author.name}</h3>
      </Link>
    </div>

    {recipe.categories &&
      recipe.categories.map((category: any) => (
        <Button key={category._id}>{category.name}</Button>
      ))}

    <ReactStars
      count={5}
      size={24}
      activeColor="yellow"
      value={recipe.rating}
      isHalf={true}
    />
    <>Rating: {recipe.rating}/5</> */}
    </Link>
  </>
);

export default RecipeCard;
