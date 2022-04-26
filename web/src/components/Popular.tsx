import Carousel from "react-bootstrap/Carousel";
import GetImageById from "../api/ImageAPI";
import { Skeleton } from "@mui/material";

const Item = ({ photoId, recipeId }) => {
  const { isLoading, error, data: photoUrl } = GetImageById(photoId, recipeId);
  return (
    <>
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <Skeleton variant="rectangular" animation="wave">
          <div className="d-block w-100" />
        </Skeleton>
      ) : (
        <div
          className={`d-block `}
          style={{
            width: "50rem",
            height: "26rem",
            backgroundPosition: "center",
            backgroundImage: `url(${photoUrl})`,
            backgroundSize: "cover",
          }}
        ></div>
      )}
    </>
  );
};

const Popular = ({ recipes }) => {
  return (
    <Carousel
      style={{
        width: "50rem",
        height: "26rem",
      }}
    >
      {recipes.map((recipe) => {
        return (
          <Carousel.Item key={recipe.id} interval={2000}>
            <Item photoId={recipe.photos[0]} recipeId={recipe.id} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default Popular;
