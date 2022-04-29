import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import ProfileCard from "../components/ProfileCard";
import PublicProfile from "../components/PublicProfile";
import CircularProgress from "@mui/material/CircularProgress";

import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import ContentPaste from "@mui/icons-material/ContentPaste";

import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { HiUpload } from "react-icons/hi";

import { useAuthToken } from "../hooks/AuthTokenContext";
import { useUserContext } from "../hooks/UserContext";

import AppBackdrop from "../components/AppBackdrop";
import { Avatar } from "@mui/material";
import GetUserById from "../api/UserAPI";
import UserProfile from "../components/UserProfile";

const Profile = () => {
  const params = useParams();
  const userId = params.userId;
  const { isLoading, isAuthenticated, user } = useAuth0();
  return (
    <>
      {!isLoading &&
        (userId && isAuthenticated && userId !== (user as any).sub ? (
          <UserProfile userId={userId} isCurrentUser={false} />
        ) : (
          <>
            <UserProfile userId={(user as any).sub} isCurrentUser={true} />
          </>
        ))}
    </>
  );
};

export default Profile;
