import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "../hooks/AuthTokenContext";

export default function VerifyUser() {
  const navigate = useNavigate();
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function verifyUser() {
      const data = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/users/verify-user`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const user = await data.json();
      if (user._id) {
        navigate("/profile");
      }
    }

    if (accessToken) {
      verifyUser();
    }
  }, [accessToken, navigate]);

  return <div className="loading">Loading...</div>;
}
