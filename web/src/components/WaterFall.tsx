import "./css/waterFall.css";
import Search from "./Search";
import RecipeCard from "./RecipeCard";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const recipesUrl = "http://localhost:8000/recipes";

function WaterFall() {
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
    <>
      <div className="waterFall">
        <div className="waterFall_search">
          <img
            src="https://x.yummlystatic.com/web/strawberry-grain.png"
            alt=""
          />
          <div>
            <Search />
          </div>
          <img src="https://x.yummlystatic.com/web/img-fruit-bowl.png" alt="" />
        </div>

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
    </>
  );
}

export default WaterFall;
