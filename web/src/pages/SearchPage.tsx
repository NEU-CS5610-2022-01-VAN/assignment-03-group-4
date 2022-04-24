import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import RecipeCard from "../components/RecipeCard";
import { useParams } from "react-router-dom";
import H2 from "@material-tailwind/react/Heading2";
import H4 from "@material-tailwind/react/Heading4";



const url = process.env.REACT_APP_API_BASE_URL + "/recipes";
const SearchPage = () => {
  const {
    isLoading,
    error,
    data: recipes,
    isFetching,
  } = useQuery(url, () => axios.get(url).then((res) => res.data));

  const [keyword, setKeyword] = useState("");
  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      setKeyword(e.target.value);
    }
  }
  return (
    <>
      <div className="container max-w-8xl relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <H2 color="black">Find Your Recipe.</H2>
            <input className="bg-amber-100 w-96 bg-opacity-80 p-4 text-black" type = "text" 
              placeholder="Search recipes"   
              onKeyPress={handleKeyPress}>
            </input>
          </div>
        </div>
      </div>
      
      <H4 color="black">Search Results:</H4>
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <section className=" pt-10 pb-48">
          <div className=" flex flex-wrap container max-w-7xl mx-auto px-4">
            {
              recipes.filter((recipe) => recipe.title.includes(keyword)).map((recipe) => (
                <div className="px-3 pt-6 pb-8" key={recipe._id}>
                  <RecipeCard recipe={recipe} key={recipe.id} />
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchPage;

