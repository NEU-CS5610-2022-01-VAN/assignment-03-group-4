import React, { useEffect } from "react";
import { useAuthToken } from "../hooks/AuthTokenContext";

import { useNavigate } from "react-router-dom";

const testToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhnRkpobW5uZnBXSG9QdF9WejQzNCJ9.eyJpc3MiOiJodHRwczovL2Rldi12M3NnZm1zZy51cy5hdXRoMC5jb20vIiwic3ViIjoiaHNwNEhJUTZLRzd2eURURzd1QTYxTkhJTkFMVmh5RFVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLnJlY2lwZSIsImlhdCI6MTY1MDIyNTMwNSwiZXhwIjoxNjUwMzExNzA1LCJhenAiOiJoc3A0SElRNktHN3Z5RFRHN3VBNjFOSElOQUxWaHlEVSIsInNjb3BlIjoicmVhZDpyZWNpcGVzIHdyaXRlOnJlY2lwZXMgZWRpdDpyZWNpcGVzIGRlbGV0ZTpyZWNpcGVzIHJlYWQ6Y2F0ZWdvcmllcyB3cml0ZTpjYXRlZ29yaWVzIGVkaXQ6Y2F0ZWdvcmllcyBkZWxldGU6Y2F0ZWdvcmllcyByZWFkOnJldmlld3Mgd3JpdGU6cmV2aWV3cyBlZGl0OnJldmlld3MgZGVsZXRlOnJldmlld3MgcmVhZDp1c2VycyB3cml0ZTp1c2VycyBlZGl0OnVzZXJzIGRlbGV0ZTp1c2VycyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.OMVkv0-XibmeLDi7RkWkB4S1V6wKjbOVyyKeSp0bNqeyCkS8a9b0PZGYtdD2xOqzEkexScdRrt1YcFc_pLMoYi1Yse4VKwadugWKvkj3B9jxhOr9tqNxutOkPCai_-BFhAPo_5-sUC4np4CBP6FRRewYAKRObzo8_lmIQ6c1Q7l8D96wTKBgNbLbJZpDEEU3osYu6PQIx4D8CHY5SOVJRl4JwuduaHLb1tNR0rFTzTuJ2y4nsJL_-YOzJo-BiKYzFrrNsXEaBFlfI4BpQooBJrkAzo9iGWOJ_bImuI5-LzPkOfmyNavcOAtdrVqklyCo39ieMczkUGu5voPbezTFTQ";

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
