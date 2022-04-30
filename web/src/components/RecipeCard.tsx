import "./css/recipeCard.css";
import { Link } from "react-router-dom";
import { Box, Rating } from "@mui/material";
import ImageCard from "./ImageCard";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const handleKeyPress = (e) => {
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <Box onClick={handleKeyPress}>
      <div className={`w-72 h-96 rounded-xl overflow-hdden shadow-md p-4`}>
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

        <div className="p-2">
          <div className="recipe-category flex" style={{ color: "#03897B" }}>
            {recipe.categories &&
              recipe.categories.map((category: any) => (
                <div
                  className="font-roboto pt-2 pr-1 text-xs font-medium uppercase "
                  key={category._id}
                >
                  {category.name}
                </div>
              ))}
          </div>
          <div className="recipe-title font-serif text-xl font-semibold pb-1">
            {recipe.title}
          </div>

          <Rating name="read-only" value={recipe.rating} readOnly />

          <div className="text-sm font-medium">
            By&nbsp;
            <Link to={`/profile/${recipe.author.id}`}>
              {recipe.author.name}
            </Link>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default RecipeCard;
