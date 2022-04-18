import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

function ReviewCard({ review }) {
  return (
    <>
      <h4>{review.content}</h4>
      <div>
        <span>by </span>
        <Link to={`/Profile/${review.author.id}`}>{review.author.name}</Link>
        <p>at {review.createdAt}</p>
      </div>

      <ReactStars
        count={5}
        size={24}
        value={review.rating}
        activeColor="yellow"
      />
      <>Rating: {review.rating}/5</>
    </>
  );
}

export default ReviewCard;
