import Header from "../components/Header";
import H2 from "@material-tailwind/react/Heading2";
import Welcome from "../components/Welcome";
import RecipeList from "../components/RecipeList";

const url = process.env.REACT_APP_API_BASE_URL + "/recipes";

const Home = () => {
  return (
    <>
      <main>
        <div className="relative flex content-center items-center h-half-screen">
          <div className="bg-landing-background bg-cover bg-center absolute top-0 w-full h-full" />
          <div className="container max-w-8xl relative mx-auto">
            <div className="w-full lg:w-6/12 px-4 mx-auto text-center">
              <H2 color="white">Find Your Recipe.</H2>
              <input
                className="bg-amber-100 w-96 bg-opacity-80 p-4 text-white outline-none"
                type="text"
                placeholder="Search recipes"
              ></input>
            </div>
          </div>
        </div>
      </main>
      {/* <Welcome /> */}

      <div className="pt-16 mx-auto m-full md:w-8/12 flex flex-col place-items-center">
        <hr />
        <div className="font-serif text-xl font-bold pb-4">Most Popular</div>
        <img src="https://assets.epicurious.com/photos/6058d90df2b833b1d0cc27fc/9:4/w_2008,h_892,c_limit/GemCakes_HERO_031821_10783.jpg" />
      </div>
      {/* <RecipeList url={url} /> */}
    </>
  );
};

export default Home;
