import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import axios from "axios";

import ReviewCard from "./ReviewCard";

const ReviewList = ({ url }) => {
  const {
    isLoading,
    error,
    data: reviews,
    isFetching,
  } = useQuery(url, () => axios.get(url).then((res) => res.data));

  return (
    <>
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <Container>
          <Row>
            {reviews.map((review) => (
              <Col md="auto" key={review._id}>
                <ReviewCard review={review} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default ReviewList;
