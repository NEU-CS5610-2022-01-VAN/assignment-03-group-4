import H2 from "@material-tailwind/react/Heading2";
import Popular from "../components/Popular";
import TypeSection from "../components/TypeSection";
import GetRecipesByURL from "../api/RecipeListAPI";
import { CircularProgress } from "@mui/material";

const url = process.env.REACT_APP_API_BASE_URL + "/recipes";

// .sort((a, b) => b.rating - a.rating).slice(0, 3)
const sortRating = (recipes) => {
  recipes.sort((a, b) => b.rating - a.rating);
  return recipes.slice(0, 3);
};

const Home = () => {
  const { isLoading, error, data: recipes, isFetching } = GetRecipesByURL(url);

  return (
    <>
      {}
      <main>
        <div className="relative flex content-center items-center h-half-screen">
          <div className="bg-landing-background bg-cover bg-center absolute top-0 w-full h-full" />
          <div className="container max-w-8xl relative mx-auto">
            <div className="w-full lg:w-6/12 px-4 mx-auto text-center">
              <H2 color="white">Find Your Recipe.</H2>
              <input
                className="bg-amber-100 w-96 bg-opacity-80 p-3 text-white outline-none"
                type="text"
                placeholder="Search recipes"
              ></input>
            </div>
          </div>
        </div>
      </main>

      {console.log(recipes)}
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <div className="pt-16 mx-auto m-full md:w-9/12 ">
            <div className="flex flex-col place-items-center font-serif text-3xl font-bold pt-6 pb-3 mb-4">
              Most Popular
            </div>
            <div className=" flex flex-col place-items-center mb-8">
              <Popular
                recipes={Array.from(
                  recipes
                    .filter((x) => x.photos.length > 0)
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 3)
                )}
              />
            </div>
            <TypeSection recipes={recipes} />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
