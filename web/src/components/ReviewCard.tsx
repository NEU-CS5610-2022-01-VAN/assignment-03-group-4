import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "../assets/styles/tailwind.css";
import { Button } from "@mui/material";

import axios from "axios";
import { useAuthToken } from "../hooks/AuthTokenContext";

import MyAvatar from "./MyAvatar";
import { useNotificationContext } from "../hooks/NotificationContext";
import { useBackdropContext } from "../hooks/BackdropContext";

function ReviewCard({ review, showDeleteButton, showRecipe }) {
  const url = `${process.env.REACT_APP_API_BASE_URL}/reviews/${review._id}`;
  const { addNotification } = useNotificationContext();
  const { addBackdrop, setBackdropOpen } = useBackdropContext();
  const route = showRecipe
    ? `/recipe/${review.recipe}`
    : `/profile/${review.author._id}`;

  const { accessToken } = useAuthToken();

  const handleDeleteReview = async () => {
    try {
      addBackdrop("Deleting Review");
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setBackdropOpen(false);
      addNotification("Review Deleted");
      setTimeout(() => window.location.reload(), 800);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <Link to={route}>
          <div className="font-serif mt-2">
            <div className="flex flex-row">
              <div className="mt-1">
                <MyAvatar id={review.author._id}></MyAvatar>
              </div>
              <div className="mt-2 ml-2 ">
                <p style={{ fontSize: 19 }} className="text-black no-underline">
                  {review.author.name}
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
            <div className="flex flex-row">
              <div style={{ marginLeft: "3.25rem" }}>
                <p style={{ fontSize: 20, color: "#2E7D32" }} className="mt-3">
                  {review.title === null
                    ? "An awesome recipe to try"
                    : `"${review.title}"`}
                </p>
                <p style={{ fontSize: 18 }} className="mt-3 mb-6">
                  {review.content}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <div className="ml-auto w-12 mr-10 mt-1">
          {showDeleteButton && (
            <Button color="success" onClick={handleDeleteReview}>
              Delete
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default ReviewCard;
