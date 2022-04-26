import GetImageById from "../api/ImageAPI";
import { Skeleton } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Item = ({ photoId, recipeId }) => {
  const { isLoading, error, data: photoUrl } = GetImageById(photoId, recipeId);
  return (
    <div>
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <Skeleton variant="rectangular" animation="wave">
          <div className="d-block w-100" />
        </Skeleton>
      ) : (
        <img
          style={{
            width: "50rem",
            height: "22rem",
            objectPosition: "center",
            objectFit: "cover",
          }}
          src={photoUrl}
          alt="recipephoto"
        />
      )}
    </div>
  );
};

const Popular = ({ recipes }) => {
  return (
    <Carousel showStatus={false}>
      {recipes.map((recipe) => {
        return <Item photoId={recipe.photos[0]} recipeId={recipe.id} />;
      })}
    </Carousel>
  );
};

export default Popular;
