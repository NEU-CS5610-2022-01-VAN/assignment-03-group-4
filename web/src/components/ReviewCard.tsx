import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

function ReviewCard({ review }) {
  return (
    <>
      <h4>{review.title}</h4>
      <div>
        <span>by </span>
        <Link to={`/Profile/${review.author.id}`}>{review.author.name}</Link>
        <p>at {review.createdAt}</p>
      </div>

      <p>{review.content}</p>
      <ReactStars
        count={5}
        size={24}
        value={review.rating}
        activeColor="yellow"
      />
    </>
  );
}

export default ReviewCard;
