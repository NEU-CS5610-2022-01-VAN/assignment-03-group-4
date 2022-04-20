import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import "./css/recipeCard.css";
import CircularProgress from "@mui/material/CircularProgress";

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
        <div>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        // <img className="recipe_card_image" src={data} alt="recipe" />

        <div
          className={`rounded-lg -mt-9 shadow-lg`}
          style={{
            width: "255px",
            height: "240px",
            backgroundPosition: "center",
            backgroundImage: `url(https://www.maggi.co.uk/sites/default/files/styles/maggi_desktop_image_style/public/NUK1265%20maggi%20Recipes%20banner%201500x700px%20opt2A.jpg?h=4f5b30f1&itok=DcsF1RwA)`,
            backgroundSize: "cover",
          }}
        />
      )}
    </>
  );
};
export default ImageCard;
