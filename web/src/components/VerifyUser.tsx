import React, { useEffect } from "react";
import { useAuthToken } from "./AuthTokenContext";
import { useAuth0 } from "@auth0/auth0-react";

import { useNavigate } from "react-router-dom";

const requestedScopes = [
  "read:current_user",
  "update:current_user_metadata",
  "read:recipes",
  "write:recipes",
  "edit:recipes",
  "delete:recipes",
  "read:categories",
  "write:categories",
  "edit:categories",
  "delete:categories",
  "read:reviews",
  "write:reviews",
  "edit:reviews",
  "delete:reviews",
  "read:users",
  "write:users",
  "edit:users",
  "delete:users",
];

const testToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhnRkpobW5uZnBXSG9QdF9WejQzNCJ9.eyJpc3MiOiJodHRwczovL2Rldi12M3NnZm1zZy51cy5hdXRoMC5jb20vIiwic3ViIjoiaHNwNEhJUTZLRzd2eURURzd1QTYxTkhJTkFMVmh5RFVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLnJlY2lwZSIsImlhdCI6MTY1MDIyNTMwNSwiZXhwIjoxNjUwMzExNzA1LCJhenAiOiJoc3A0SElRNktHN3Z5RFRHN3VBNjFOSElOQUxWaHlEVSIsInNjb3BlIjoicmVhZDpyZWNpcGVzIHdyaXRlOnJlY2lwZXMgZWRpdDpyZWNpcGVzIGRlbGV0ZTpyZWNpcGVzIHJlYWQ6Y2F0ZWdvcmllcyB3cml0ZTpjYXRlZ29yaWVzIGVkaXQ6Y2F0ZWdvcmllcyBkZWxldGU6Y2F0ZWdvcmllcyByZWFkOnJldmlld3Mgd3JpdGU6cmV2aWV3cyBlZGl0OnJldmlld3MgZGVsZXRlOnJldmlld3MgcmVhZDp1c2VycyB3cml0ZTp1c2VycyBlZGl0OnVzZXJzIGRlbGV0ZTp1c2VycyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.OMVkv0-XibmeLDi7RkWkB4S1V6wKjbOVyyKeSp0bNqeyCkS8a9b0PZGYtdD2xOqzEkexScdRrt1YcFc_pLMoYi1Yse4VKwadugWKvkj3B9jxhOr9tqNxutOkPCai_-BFhAPo_5-sUC4np4CBP6FRRewYAKRObzo8_lmIQ6c1Q7l8D96wTKBgNbLbJZpDEEU3osYu6PQIx4D8CHY5SOVJRl4JwuduaHLb1tNR0rFTzTuJ2y4nsJL_-YOzJo-BiKYzFrrNsXEaBFlfI4BpQooBJrkAzo9iGWOJ_bImuI5-LzPkOfmyNavcOAtdrVqklyCo39ieMczkUGu5voPbezTFTQ";
export default function VerifyUser() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  console.log("ohhhhgreat verify user!!!!");

  const navigate = useNavigate();
  const { accessToken } = useAuthToken();
  // console.log("====================================");
  // console.log(accessToken);
  // console.log("====================================");

  useEffect(() => {
    async function verifyUser() {
      const token = await getAccessTokenSilently();

      const data = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/users/verify-user`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "same-origin",
        }
      );

      const user = await data.json();
      console.log(user);

      if (user.auth0Id) {
        navigate("/profile");
      }
    }

    if (accessToken) {
      verifyUser();
    }
  }, [accessToken, navigate]);

  return <div className="loading">Loading...</div>;
}
function getAccessTokenSilently(arg0: { audience: string; scope: string }) {
  throw new Error("Function not implemented.");
}
