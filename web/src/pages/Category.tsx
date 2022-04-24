import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import RecipeList from "../components/RecipeList";

function Category() {
  const params = useParams();

  const categoryId = params.categoryId;
  const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/categories/${categoryId}`;
  const url = baseUrl + "/recipes";

  const {
    isLoading,
    error,
    data: cat,
    isFetching,
  } = useQuery(baseUrl, () => axios.get(baseUrl).then((res) => res.data));

  return (
    <>
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <h1>{cat.name}</h1>
      )}

      <RecipeList url={url} />
    </>
  );
}

export default Category;
