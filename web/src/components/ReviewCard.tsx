import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';

// import "./css/reviewCard.css"
import "../assets/styles/tailwind.css";

function ReviewCard({ review }) {
  return (
    <>
      
      <div className="font-serif mt-2">
          <div className="flex flex-row">
            <div className="mt-1"> 
              <Avatar alt="A" src="/static/images/avatar/2.jpg" />
            </div>  
              <div className="mt-2 ml-2 ">
                  <h4 className=""> <Link className="text-black no-underline" to={`/Profile/${review.author.id}`}>{review.author.name}</Link></h4>
              </div>
              <div className="text-gray-700 mt-3 ml-4">
                  <p className="">{review.createdAt.slice(0,10)}</p>
              </div>
          </div>
          <div className="flex flex-row ml-2">
            <div className="mr-2">
              <p className="">{review.rating}.0</p>
            </div>
            <Rating name="read-only" value={review.rating} readOnly /> 
          </div>
          <div className="ml-2">
              <h5 className="mt-3">{review.content}</h5>
              {/* <p className="content"></p> */}
          </div>
      </div>

    </>
  );
}

export default ReviewCard;
