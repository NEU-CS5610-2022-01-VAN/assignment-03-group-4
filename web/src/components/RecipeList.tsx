import { Col, Container, Row } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes }) => {
  return (
    <Container>
      <Row>
        {recipes.map((recipe) => (
          <Col md="auto" key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RecipeList;
