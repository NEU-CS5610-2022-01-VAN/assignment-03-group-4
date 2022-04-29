import axios from "axios";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import RecipeRow from "./RecipeRow";
import RecipeCard from "./RecipeCard";
import { Box } from "@mui/material";

const RecipeRowList = ({ url }) => {
  const {
    isLoading,
    error,
    data: recipes,
    isFetching,
  } = useQuery(url, () => axios.get(url).then((res) => res.data));

  return (
    <>
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <div className="flex flex-col container mt-6 mx-auto gap-2 w-full">
            {recipes.map((recipe) => (
              <div className="my-6" key={recipe._id}>
                <Box
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <RecipeCard recipe={recipe} />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: { xs: "none", md: "block" },
                  }}
                >
                  <Box>
                    <RecipeRow recipe={recipe} key={recipe.id} />
                  </Box>
                </Box>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default RecipeRowList;
