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
import { useNavigate } from "react-router-dom";
import MyAvatar from "./MyAvatar";
function ReviewCard({ review, showDeleteButton, showRecipe }) {
  const url = `${process.env.REACT_APP_API_BASE_URL}/reviews/${review._id}`;

  // const { data } = GetAvatarById(review.author._id);

  const { user, isAuthenticated, isLoading } = useAuth0();
  const { accessToken } = useAuthToken();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);
  const navigate = useNavigate();

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
      {console.log(review)}
      <div className="font-serif mt-2">
        <div className="flex flex-row">
          <div className="mt-1">
            <MyAvatar id={review.author._id}></MyAvatar>
          </div>
          <div className="mt-2 ml-2 ">
            <p style={{ fontSize: 19 }} className="text-black no-underline">
              {showRecipe ? (
                <Link to={`/recipe/${review.recipe}`}>
                  {review.author.name}
                </Link>
              ) : (
                <Link to={`/profile/${review.author._id}`}>
                  {review.author.name}
                </Link>
              )}
            </p>
          </div>
          <div className="text-gray-700 mt-3 ml-4">
            <p className="">{review.createdAt.slice(0, 10)}</p>
          </div>
          {/* <div className="ml-auto w-12 mt-1">{showRecipe && <Button color="success" onClick={()=>navigate(`/recipe/${review.recipe}`)}>View&nbsp;Recipe</Button>}</div> */}
          <div className="ml-auto w-12 mr-10 mt-1">
            {showDeleteButton && (
              <Button color="success" onClick={handleDeleteReview}>
                Delete
              </Button>
            )}
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

      {backdropOpen && <AppBackdrop text={"Deleting Review"} />}
    </>
  );
}

export default ReviewCard;
