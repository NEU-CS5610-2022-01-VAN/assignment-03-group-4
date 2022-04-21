import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
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
        <div>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <Container>
          <Row>
            {recipes.map((recipe) => (
              <Col md="auto" key={recipe.id}>
                <RecipeCard recipe={recipe} key={recipe.id} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default RecipeList;
