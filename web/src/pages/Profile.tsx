import { useParams } from "react-router-dom";

import RecipeList from "../components/RecipeList";
import ReviewList from "../components/ReviewList";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import ProfileCard from "../components/ProfileCard";
import axios from "axios";
import { useQuery } from "react-query";

const userUrl = process.env.REACT_APP_API_BASE_URL + "/users/";

const Profile = () => {
  const params = useParams();
  const userId = params.userId;

  const { isLoading, error, data, isFetching } = useQuery("user", () =>
    axios.get(userUrl + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <>
      {/* {userId ? (
        error ? (
          <div>Error: {(error as any).mesasge}</div>
        ) : !isLoading ? (
          <div>Loading...</div>
        ) : (
          <h2>Hi {(data as any).name}</h2>
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
      )} */}
      <div>
        <div>
          Please <LoginButton />
        </div>
        <div>
          You can <LogoutButton />
        </div>
      </div>

      <ProfileCard />

      {userId && !isLoading && !error && (
        <>
          <div>
            <h2>{data.name}'s recipes</h2>
            <RecipeList recipes={data.recipes} />
          </div>

          <div>
            <h2>{data.name}'s reviews</h2>
            <ReviewList reviews={data.reviews} />
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
