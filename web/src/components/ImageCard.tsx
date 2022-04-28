import { Skeleton } from "@mui/material";
import GetImageById from "../api/ImageAPI";
import "./css/recipeCard.css";

const ImageCard = ({ photoId, recipeId }) => {
  const { isLoading, error, data } = GetImageById(photoId, recipeId);
  return (
    <>
    {console.log(data)}
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <Skeleton variant="rectangular" animation="wave">
          <div
            className={`rounded-lg -mt-9 shadow-lg`}
            style={{
              width: "15rem",
              height: "14rem",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </Skeleton>
      ) : (
        // <img className="recipe_card_image" src={data} alt="recipe" />
        <div
          className={`rounded-lg -mt-9 shadow-lg`}
          style={{
            width: "15rem",
            height: "14rem",
            backgroundPosition: "center",
            backgroundImage: `url(${data})`,
            backgroundSize: "cover",
          }}
        />
      )}
    </>
  );
};
export default ImageCard;