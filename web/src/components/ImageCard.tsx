import { Skeleton } from "@mui/material";
import GetImageById from "../apis/GetPhotoByRecipeAndPhotoId";

type Props = {
  photoId: string;
  recipeId: string;
};

const ImageCard = ({ photoId, recipeId }: Props): JSX.Element => {
  const { isLoading, error, data } = GetImageById(photoId, recipeId);

  return (
    <>
      {error ? (
        <div>Error: {error.message}</div>
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
