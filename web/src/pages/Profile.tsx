import Navibar from "../components/Navibar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeList from "../components/RecipeList";
import ReviewList from "../components/ReviewList";

const userUrl = "http://localhost:8000/users/";

const Profile = () => {
  const params = useParams();
  const userId = params.userId;

  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (userId) {
      fetch(userUrl + userId)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setUser(result);
            console.log(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error: Error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [userId]);

  return (
    <>
      <Navibar />
      {userId ? (
        error ? (
          <div>Error: {error.mesasge}</div>
        ) : !user ? (
          <div>Loading...</div>
        ) : (
          <h2>Hi {user.name}</h2>
        )
      ) : (
        <div>Please log in</div>
      )}

      {user && (
        <>
          <div>
            <h2>{user.name}'s recipes</h2>
            <RecipeList recipes={user.recipes} />
          </div>

          <div>
            <h2>{user.name}'s reviews</h2>
            <ReviewList reviews={user.reviews} author={user} />
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
