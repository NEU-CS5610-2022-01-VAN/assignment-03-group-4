import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import RecipeList from "../components/RecipeList";
import ReviewList from "../components/ReviewList";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import ProfileCard from "../components/ProfileCard";

const userUrl = process.env.REACT_APP_API_BASE_URL + "/users/";

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
            setUser(result);
            setIsLoaded(true);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error: Error) => {
            setError(error);
            setIsLoaded(true);
          }
        );
    }
  }, [userId]);

  return (
    <>
      {userId ? (
        error ? (
          <div>Error: {error.mesasge}</div>
        ) : !isLoaded ? (
          <div>Loading...</div>
        ) : (
          <h2>Hi {user.name}</h2>
        )
      ) : (
        <div>
          <div>
            Please <LoginButton />
          </div>
          <div>
            You can <LogoutButton />
          </div>
        </div>
      )}

      <ProfileCard />

      {user && (
        <>
          <div>
            <h2>{user.name}'s recipes</h2>
            <RecipeList recipes={user.recipes} />
          </div>

          <div>
            <h2>{user.name}'s reviews</h2>
            <ReviewList reviews={user.reviews} />
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
