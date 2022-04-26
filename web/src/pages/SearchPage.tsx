import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import RecipeCard from "../components/RecipeCard";
import { useParams } from "react-router-dom";
import H3 from "@material-tailwind/react/Heading3";
import H5 from "@material-tailwind/react/Heading5";
import RecipeList from "../components/RecipeList";

const url = process.env.REACT_APP_API_BASE_URL + "/recipes";
const SearchPage = () => {
  const {
    isLoading,
    error,
    data: recipes,
    isFetching,
  } = useQuery(url, () => axios.get(url).then((res) => res.data));
  
  const params = useParams();

  const [keyword, setKeyword] = useState(params.keyword + "");


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
            <input className="bg-gray-200 border-gray-200 w-96 bg-opacity-80 p-4 text-black outline-none" type = "text" 
              placeholder="Search Recipes"
              defaultValue={params.keyword===null?"":params.keyword}
              onKeyPress={handleKeyPress}
             >
            </input>
          </div>
        </div>
      </div>

      <div className="ml-16">
        <H5 color="black">Search Results:</H5>
      </div>
      
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>
          <CircularProgress color="inherit" />
        </div>
      ) : (
          <RecipeList recipes={recipes.filter((recipe) => recipe.title.toLowerCase().includes(keyword.toLowerCase()))}></RecipeList>
      )}
    </>
  );
};

export default SearchPage;
