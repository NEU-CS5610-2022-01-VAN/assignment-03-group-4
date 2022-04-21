import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import "./css/recipeCard.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Skeleton } from "@mui/material";

const ImageCard = ({ photoId, recipeId }) => {
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
              width: "255px",
              height: "240px",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </Skeleton>
      ) : (
        //* <CircularProgress color="inherit" /> */

        <div
          className={`rounded-lg -mt-9 shadow-lg`}
          style={{
            width: "255px",
            height: "200px",
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
