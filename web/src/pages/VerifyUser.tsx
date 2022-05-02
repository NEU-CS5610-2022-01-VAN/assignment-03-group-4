import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "../hooks/AuthTokenContext";
import LoadingIcon from "../components/LoadingIcon";

const url = `${process.env.REACT_APP_API_BASE_URL}/users/verify-user`;

export default function VerifyUser() {
  const navigate = useNavigate();
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function verifyUser() {
      const user = await axios
        .post<IUser>(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data);

      if (user._id) {
        navigate("/profile");
      }
    }

    if (accessToken) {
      verifyUser();
    }
  }, [accessToken, navigate]);

  return <LoadingIcon />;
}
