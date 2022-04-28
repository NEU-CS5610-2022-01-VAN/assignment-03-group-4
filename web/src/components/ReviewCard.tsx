
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import GetAvatarById from "../api/UserAvatarAPI";
import "../assets/styles/tailwind.css";
import { Button } from "@mui/material";
import AppBackdrop from "../components/AppBackdrop";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useAuthToken } from "../hooks/AuthTokenContext";
import { useState } from "react";

function ReviewCard({ review, showDeleteButton = true }) {
  const url = `${process.env.REACT_APP_API_BASE_URL}/reviews/${review._id}`;

  const { data } = GetAvatarById(review.author._id);
  
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { accessToken } = useAuthToken();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);

  // const url = `${process.env.REACT_APP_API_BASE_URL}/users/${review.author}`;
  // const {
  //   data: userDB,
  // } = useQuery(url, () => axios.get(url).then((res) => res.data));
  // const showDeleteButton = true;
  const handleDeleteReview = async () => {
    try {
      setBackdropOpen(true);
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      alert("success");
      window.location.reload();
      setBackdropOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="font-serif mt-2">
        <div className="flex flex-row">
          <div className="mt-1">
            <img
              style={{ width: 45, height: 45 }}
              className="rounded-full"
              src={data}
              alt={review.author.name.slice(0, 3)}
            />
          </div>
          <div className="mt-2 ml-2 ">
            <p>
              <Link
                style={{ fontSize: 19 }}
                className="text-black no-underline"
                to={`/Profile/${review.author.id}`}
              >
                {review.author.name}
              </Link>
            </p>
          </div>
          <div className="text-gray-700 mt-3 ml-4">
            <p className="">{review.createdAt.slice(0, 10)}</p>
          </div>
        </div>
        <div style={{ marginLeft: "3.25rem" }} className="flex flex-row">
          <div className="mr-2">
            <p style={{ fontSize: 14 }}>{review.rating}.0</p>
          </div>
          <Rating
            size="small"
            name="read-only"
            value={review.rating}
            readOnly
          />
        </div>
        <div style={{ marginLeft: "3.25rem" }}>
          <p style={{ fontSize: 20 }} className="text-blue-400 mt-3">
            {review.title === null ? "An awesome recipe to try" : review.title}
          </p>
          <p style={{ fontSize: 18 }} className="mt-3 mb-6">
            {review.content}
          </p>
        </div>
      </div>

      {showDeleteButton && <Button onClick={handleDeleteReview}>Delete</Button>}
      {backdropOpen && <AppBackdrop text={"Deleting Review"} />}
    </>
  );
}

export default ReviewCard;
