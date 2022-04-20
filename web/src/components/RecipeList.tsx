import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";

import RecipeCard from "./RecipeCard";

const RecipeList = ({ url }) => {
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
        <div>Loading...</div>
      ) : (
        <section className=" pt-10 pb-48">
          <div className=" flex flex-wrap container max-w-7xl mx-auto px-4">
            {recipes.map((recipe) => (
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

export default RecipeList;
