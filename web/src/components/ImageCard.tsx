import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import "./css/recipeCard.css";

const ImageCard = ({ photoId, recipeId }) => {
  const url =
    process.env.REACT_APP_API_BASE_URL +
    "/recipes/" +
    recipeId +
    "/files/" +
    photoId;

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
        <div>Loading...</div>
      ) : (
        <img className="recipe_card_image" src={data} alt="recipe" />
      )}
    </>
  );
};
export default ImageCard;
