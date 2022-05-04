import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { BiFoodMenu } from "react-icons/bi";
import { BsPeople, BsThreeDots } from "react-icons/bs";
import RecipeList from "../components/RecipeList";
import LoadingIcon from "../components/LoadingIcon";

const Category = (): JSX.Element => {
  const params = useParams();
  const categoryId = params.categoryId;

  const categoryUrl = `${process.env.REACT_APP_API_BASE_URL}/categories/${categoryId}`;
  const recipesByCategoryIdUrl = `${categoryUrl}/recipes`;

  const {
    isLoading,
    error,
    data: cat,
  } = useQuery<ICategory, Error>(categoryUrl, () =>
    axios.get(categoryUrl).then((res) => res.data)
  );

  const { isLoading: isLoadingRecipes, data: recipes } = useQuery<
    IRecipe[],
    Error
  >(recipesByCategoryIdUrl, () =>
    axios.get(recipesByCategoryIdUrl).then((res) => res.data)
  );

  const [totalRecipes, setTotalRecipes] = useState<number>();
  const [totalComments, setTotalComments] = useState<number>();

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
          <div>Error: {error.message}</div>
        ) : isLoading ? (
          <LoadingIcon />
        ) : (
          <div>
            <div className="flex flex-row">
              <Typography
                variant="h4"
                sx={{ fontSize: 40, marginBottom: "6px", width: "60%" }}
              >
                {cat?.name}
              </Typography>
              <IconButton
                aria-label="more options"
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
                sx={{ height: "100%", ml: "auto", mr: 2 }}
              >
                <BsThreeDots />
              </IconButton>
            </div>

            <Typography variant="h5" color="#777" sx={{ fontSize: "1.4rem" }}>
              Check out our {cat?.name.toLowerCase()} recipes.
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
            </div>

            <Divider sx={{ marginTop: "22px", marginBottom: "6px" }} />
          </div>
        )}
      </Box>

      {!isLoadingRecipes && recipes && <RecipeList recipes={recipes} />}
    </>
  );
};

export default Category;
