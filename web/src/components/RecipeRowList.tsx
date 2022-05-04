import axios from "axios";
import { useQuery } from "react-query";
import { Box } from "@mui/material";
import { IoFastFoodOutline } from "react-icons/io5";
import LoadingIcon from "./LoadingIcon";
import RecipeRow from "./RecipeRow";
import RecipeCard from "./RecipeCard";

type Props = { url: string };

const RecipeRowList = ({ url }: Props): JSX.Element => {
  const {
    isLoading,
    error,
    data: recipes,
  } = useQuery<IRecipe[], Error>(url, () =>
    axios.get(url).then((res) => res.data)
  );

  return (
    <>
      {error ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        <LoadingIcon />
      ) : recipes!.length !== 0 ? (
        <div className="flex flex-col container mt-6 mx-auto gap-2 w-full">
          {recipes!.map((recipe) => (
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
                  <RecipeRow recipe={recipe} key={recipe._id} />
                </Box>
              </Box>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center text-gray-600 my-16 p-2 items-center">
          <IoFastFoodOutline size={25} />
          <p> No Recipe yet.</p>
        </div>
      )}
    </>
  );
};

export default RecipeRowList;
