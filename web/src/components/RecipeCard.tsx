import "./css/recipeCard.css";

import ReactStars from "react-rating-stars-component";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import React from "react";
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import H6 from "@material-tailwind/react/Heading6";

const RecipeCard = ({ recipe }) => (
  <>
    <Link to={`/recipe/${recipe.id}`}>
      <Card className=" w-72">
        <CardImage
          className="bg-contain w-64"
          src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F02%2F22%2F16383-basic-crepes-mfs_003.jpg"
          alt="Card Image"
        />

        <CardBody>
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
          {console.log(recipe)}

          {/* <ReactStars
            count={5}
            size={24}
            activeColor="yellow"
            value={recipe.rating}
            isHalf={true}
          />
          <>Rating: {recipe.rating}/5</> */}
        </CardBody>
      </Card>
      {/* <img
        className="recipe_card_image"
        src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F02%2F22%2F16383-basic-crepes-mfs_003.jpg"
        alt="recipe"
      /> */}
    </Link>

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
  </>
);

export default RecipeCard;
