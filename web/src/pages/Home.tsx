import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import H2 from "@material-tailwind/react/Heading2";
import { FiLogIn } from "react-icons/fi";
import { IoFastFoodOutline } from "react-icons/io5";
import GetRecipesByURL from "../apis/RecipeListAPI";
import LoadingIcon from "../components/LoadingIcon";
import Popular from "../components/Popular";
import TypeSection from "../components/TypeSection";
import LoginButton from "../components/LoginButton";
import Section from "../components/Section";

const recipeUrl = `${process.env.REACT_APP_API_BASE_URL}/recipes`;

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
        <LoadingIcon />
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
                {recipes.filter((x) => x.author._id === user?.sub).length >
                0 ? (
                  <Section
                    recipes={Array.from(
                      recipes.filter((x) => x.author._id === user?.sub)
                    ).slice(0, 3)}
                  />
                ) : (
                  <div className="flex flex-col justify-center text-base font-normal text-gray-600 my-16 p-2 items-center">
                    <IoFastFoodOutline size={25} />
                    <p>You have no recipe yet. </p>
                    <p>
                      Create your first recipe{" "}
                      <Link style={{ color: "#2F7D31" }} to="./NewRecipe">
                        here.
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          {!isAuthenticated && (
            <div
              className="font-serif flex flex-wrap text-semibold w-full justify-center gap-2"
              style={{ backgroundColor: "#F5F1E7", padding: "2%" }}
            >
              <div>
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
