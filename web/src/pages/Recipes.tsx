import Navibar from "../components/Navibar";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import RecipeCard from "../components/RecipeCard";

const recipesUrl = "http://localhost:8000/recipes";

function Recipes() {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Array<any>>([]);

  useEffect(() => {
    fetch(recipesUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRecipes(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error: Error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  return (
    <div>
      <Navibar />

      {error ? (
        <div>Error: {error.mesasge}</div>
      ) : !isLoaded ? (
        <div>Loading...</div>
      ) : (
        <Container>
          <Row>
            {recipes.map((recipe) => (
              <Col md="auto" key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Recipes;
