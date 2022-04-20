import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { useAuthToken } from "./AuthTokenContext";
import { useNavigate } from "react-router-dom";

const DeleteRecipeButton = ({ recipeId }) => {
  const { accessToken } = useAuthToken();
  const navigate = useNavigate();

  const url = process.env.REACT_APP_API_BASE_URL + "/recipes/" + recipeId;

  const onDeleteButtonClick = () => {
    setTimeout(() => {
      axios
        .delete(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          alert("Success");
          navigate(-1);
        })
        .catch((err) => console.log(err));
    }, 200);
  };

  return (
    <>
      <Button variant="danger" onClick={onDeleteButtonClick}>
        Delete
      </Button>
    </>
  );
};
export default DeleteRecipeButton;
