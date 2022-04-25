import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import "./css/recipeCard.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Skeleton } from "@mui/material";

const ImageCard = ({ photoId, recipeId, card }) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/recipes/${recipeId}/files/${photoId}`;

  const { isLoading, error, data, isFetching } = useQuery(url, () =>
    axios
      .get(url, { responseType: "blob" })
      .then((res) => URL.createObjectURL(res.data as any))
  );

  return (
    <>
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
