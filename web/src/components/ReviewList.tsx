import { Col, Container, Row } from "react-bootstrap";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews }) => {
  return (
    <Container>
      <Row>
        {reviews.map((review) => (
          <Col md="auto" key={review.id}>
            <ReviewCard review={review} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ReviewList;
