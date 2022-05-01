import { useNavigate } from "react-router-dom";
import GetImageById from "../apis/GetPhotoByRecipeAndPhotoId";
import { Skeleton } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Item = ({ photoId, recipeId }) => {
  const { isLoading, error, data: photoUrl } = GetImageById(photoId, recipeId);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <div onClick={handleClick}>
      {error ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        <Skeleton variant="rectangular" animation="wave">
          <i
            style={{
              width: "50rem",
              height: "22rem",
              objectPosition: "center",
              objectFit: "cover",
            }}
          />
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

type Props = { recipes: IRecipe[] };

const Popular = ({ recipes }: Props): JSX.Element => {
  return (
    <Carousel showStatus={false} interval={2000} infiniteLoop={true}>
      {recipes.map((recipe) => {
        return (
          <Item
            key={recipe._id}
            photoId={recipe.photos[0]}
            recipeId={recipe._id}
          />
        );
      })}
    </Carousel>
  );
};

export default Popular;
