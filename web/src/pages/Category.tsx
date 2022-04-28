import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";




import { BiFoodMenu } from "react-icons/bi";

import { BsPeople, BsThreeDots } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";


import RecipeList from "../components/RecipeList";
import { useEffect, useState } from "react";


const buttonShown = false;
const Category = () => {
  const params = useParams();
  const navigate = useNavigate();

  const categoryId = params.categoryId;
  const baseUrl = `${process.env.REACT_APP_API_BASE_URL}/categories/${categoryId}`;
  const url = baseUrl + "/recipes";

  const {
    isLoading,
    error,
    data: cat,
  } = useQuery(baseUrl, () => axios.get(baseUrl).then((res) => res.data));

  const {
    isLoading: isLoadingRecipes,
    data: recipes,
  } = useQuery(url, () => axios.get(url).then((res) => res.data));

  const [totalRecipes, setTotalRecipes] = useState();
  const [totalComments, setTotalComments] = useState();

  useEffect(() => {
    if (recipes && recipes.length) {
      setTotalRecipes(recipes.length);
      const newTotalCommnets = recipes.reduce(
        (preValue, recipe) => preValue + recipe.reviews.length,
        0
      );
      setTotalComments(newTotalCommnets);
    }
  }, [recipes]);

  return (
    <>
      <Box
        sx={{
          mt: 3,
          mx: "8vw",
        }}
      >
        {error ? (
          <div>Error: {(error as any).mesasge}</div>
        ) : isLoading ? (
          <div>
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <div>
            <div className="flex flex-row">
              <Typography
                variant="h4"
                sx={{ fontSize: 40, marginBottom: "6px", width: "60%" }}
              >
                {cat.name}
              </Typography>
              <IconButton
                aria-label="more options"
                // onClick={() => arrayHelpers.remove(index)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
                sx={{ height: "100%", ml: "auto", mr: 2 }}
              >
                <BsThreeDots />
              </IconButton>
            </div>

            <Typography variant="h6" color="#777">
              Check out our {cat.name.toLowerCase()} recipes.
            </Typography>

            <div className="flex flex-row">
              <div
                className="flex flex-row items-center mt-3"
                style={{ color: "#666" }}
              >
                <BiFoodMenu size={18} />
                <Typography sx={{ ml: 0.4 }}>{totalRecipes} recipes</Typography>
              </div>

              <div
                className="flex flex-row items-center mt-3 ml-4"
                style={{ color: "#666" }}
              >
                <BsPeople size={18} />
                <Typography sx={{ ml: 0.5 }}>
                  {totalComments} comments
                </Typography>
              </div>
              {buttonShown && (
                <Button
                  onClick={() => navigate("/newrecipe")}
                  color="success"
                  variant="contained"
                  size="medium"
                  onMouseDown={(e) => e.preventDefault()}
                  sx={{
                    display: "flex",
                    backgroundColor: "#3dc795",
                    mr: 2,
                    marginLeft: "auto",
                  }}
                  startIcon={<IoMdAdd size={20} />}
                >
                  Add
                </Button>
              )}
            </div>

            <Divider sx={{ marginTop: "22px", marginBottom: "6px" }} />
          </div>
        )}
      </Box>

      {!isLoadingRecipes && <RecipeList recipes={recipes} />}
    </>
  );
};

export default Category;
