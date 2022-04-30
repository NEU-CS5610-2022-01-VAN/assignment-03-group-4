import H2 from "@material-tailwind/react/Heading2";
import Popular from "../components/Popular";
import TypeSection from "../components/TypeSection";
import GetRecipesByURL from "../api/RecipeListAPI";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReviewList from "../components/ReviewList";
import LoginButton from "../components/LoginButton";
import { FiLogIn } from "react-icons/fi";
import { text } from "stream/consumers";
import Section from "../components/Section";
import { useAuth0 } from "@auth0/auth0-react";

const recipeUrl = process.env.REACT_APP_API_BASE_URL + "/recipes";

const Home = () => {
  const { isLoading, error, data: recipes } = GetRecipesByURL(recipeUrl);
  const { isLoading: userLoading, isAuthenticated, user } = useAuth0();

  const navigate = useNavigate();
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${e.target.value}`);
    }
  };

  return (
    <>
      <main>
        <div className="relative flex content-center items-center h-half-screen">
          <div className="bg-landing-background bg-cover bg-center absolute top-0 w-full h-full" />
          <div className="container max-w-8xl relative mx-auto">
            <div className="w-full lg:w-6/12 px-4 mx-auto text-center">
              <H2 color="white">Find Your Recipe.</H2>
              <input
                style={{ width: "21rem" }}
                className="bg-amber-100 bg-opacity-80 p-3 text-white outline-none"
                type="text"
                placeholder="Search recipes"
                onKeyPress={handleKeyPress}
              ></input>
            </div>
          </div>
        </div>
      </main>

      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <div className="pt-16 mx-auto m-full md:w-9/12 ">
            <div className="flex flex-col place-items-center ">
              <div className="font-serif text-3xl font-bold pt-6 pb-3 mb-4">
                Most Popular
              </div>
              <div className="max-w-3xl  mb-8">
                <Popular
                  recipes={Array.from(
                    recipes
                      .filter((x) => x.photos.length > 0 && x.rating != null)
                      .sort(function (a, b) {
                        return a.rating > b.rating ? 1 : -1;
                      })
                      .reverse()
                      .slice(0, 3)
                  )}
                />
              </div>
            </div>
            <TypeSection recipes={recipes} />

            {!userLoading && isAuthenticated && (
              <div className=" font-serif text-xl font-bold pt-6 pb-3 mb-4">
                Your Latest Recipe
                <hr className="mt-2 mb-2" />
                <Section
                  recipes={Array.from(
                    recipes.filter((x) => x.author._id === (user as any).sub)
                  ).slice(0, 3)}
                />
              </div>
            )}
          </div>
          {!isAuthenticated && (
            <div
              className="font-serif flex flex-wrap text-semibold w-full justify-center gap-2"
              style={{ backgroundColor: "#F5F1E7", padding: "2%" }}
            >
              <div className="">
                Get our latest recipes and expert tips starting from here.
              </div>
              <div className="w-40">
                <LoginButton>
                  <div
                    style={{ color: "#2F7D31" }}
                    className="flex justify-center items-center gap-2"
                  >
                    <FiLogIn />
                    Log in / Register
                  </div>
                </LoginButton>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
