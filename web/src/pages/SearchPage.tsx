import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import H3 from "@material-tailwind/react/Heading3";
import H6 from "@material-tailwind/react/Heading6";
import RecipeList from "../components/RecipeList";
import LoadingIcon from "../components/LoadingIcon";

const url = `${process.env.REACT_APP_API_BASE_URL}/recipes`;

const SearchPage = (): JSX.Element => {
  const {
    isLoading,
    error,
    data: recipes,
  } = useQuery<IRecipe[], Error>(url, () =>
    axios.get(url).then((res) => res.data)
  );

  const params = useParams();
  const initialKeyword: string | undefined = params.keyword;
  const [keyword, setKeyword] = useState<string>(initialKeyword + "");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setKeyword(e.target.value);
    }
  };

  return (
    <>
      <div className="container max-w-8xl relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 mx-auto text-center">
            <div className="mt-3">
              <H3 color="black">Find Your Recipe</H3>
            </div>
            <input
              style={{ width: "21rem" }}
              className="bg-gray-200 border-gray-200 bg-opacity-80 p-4 text-black outline-none"
              type="text"
              placeholder="Search Recipes"
              defaultValue={initialKeyword || ""}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </div>

      <div className="ml-16">
        <H6 color="black">Search Results:</H6>
      </div>

      {error ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        <LoadingIcon />
      ) : (
        <RecipeList
          recipes={recipes!.filter((recipe) =>
            recipe.title.toLowerCase().includes(keyword.toLowerCase())
          )}
        />
      )}
    </>
  );
};

export default SearchPage;
