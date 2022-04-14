import { Col, Container, Row } from "react-bootstrap";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews, author }) => {
  return (
    <Container>
      <Row>
        {reviews.map((review) => (
          <Col md="auto" key={review.id}>
            <ReviewCard review={review} author={author} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ReviewList;
