import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

import LoginButton from "../components/LoginButton";
import ProfileCard from "../components/ProfileCard";
import PublicProfile from "../components/PublicProfile";
import CircularProgress from "@mui/material/CircularProgress";
import { useRef } from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const params = useParams();

  const userId = params.userId;

  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    (inputEl as any).current.focus();
  };

  return (
    <>
      {userId ? (
        <PublicProfile userId={userId} />
      ) : (
        <>
          <ProfileCard />

          {isAuthenticated &&
            (isLoading ? (
              <div>
                <CircularProgress color="inherit" />
              </div>
            ) : (
              <PublicProfile userId={(user as any).sub} />
            ))}
        </>
      )}
    </>
  );
};

export default Profile;
