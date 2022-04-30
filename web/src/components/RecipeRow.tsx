import "./css/recipeCard.css";
import ImageCard from "./ImageCard";

import { Link } from "react-router-dom";

import { Rating } from "@mui/material";
import { BsThreeDots } from "react-icons/bs";

const RecipeRow = ({ recipe }) => (
  <>
    <Link to={`/recipes/${recipe.id}`}>
      <div className="flex flex-row  gap-8 w-full ">
        <div style={{ flexShrink: 0 }}>
          {recipe.photos.length ? (
            <ImageCard photoId={recipe.photos[0]} recipeId={recipe.id} />
          ) : (
            <div
              className={`rounded-lg -mt-9 shadow-lg`}
              style={{
                width: "15rem",
                height: "14rem",
                backgroundPosition: "center",
                backgroundImage: `url(https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F02%2F22%2F16383-basic-crepes-mfs_003.jpg)`,
                backgroundSize: "cover",
              }}
            />
          )}
        </div>

        <div style={{ width: "100%" }}>
          <BsThreeDots className="mr-2 ml-auto" />

          <div
            className="recipe-category mt-2 recipe-category flex "
            style={{ color: "#03897B" }}
          >
            {recipe.categories &&
              recipe.categories.map((category: any) => (
                <div
                  className="font-roboto pr-1 text-xs font-medium uppercase "
                  key={category._id}
                >
                  {category.name}
                </div>
              ))}
          </div>
          <div className="recipe-title font-serif text-xl font-semibold pb-1">
            {recipe.title}
          </div>
          <div
            style={{ fontSize: 18, fontWeight: 400 }}
            className="recipe-title font-serif text-xl font-semibold pb-1"
          >
            {recipe.body}
          </div>
          <Rating
            style={{ marginTop: "5%" }}
            name="read-only"
            value={recipe.rating}
            readOnly
          />
        </div>
      </div>
    </Link>
  </>
);

export default RecipeRow;
