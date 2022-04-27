import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import ProfileCard from "../components/ProfileCard";
import PublicProfile from "../components/PublicProfile";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { useRef } from "react";

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
import {
  Avatar,
  ImageList,
  ImageListItem,
  InputLabel,
  Typography,
} from "@mui/material";

const validationSchema = yup.object({
  name: yup.string().required("Name Required"),
  bio: yup.string().required("Bio Required"),
});

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // const url = `${process.env.REACT_APP_API_BASE_URL}/users/${(user as any).sub}`;
  // const {
  //   data: userTest,
  // } = useQuery(url, () => axios.get(url).then((res) => console.log("GetUser"+res.data)));

  const [image, setImage] = useState<any>(null);

  function onImageChange(e) {
    setImage(e.target.files[0]);
  }

  const [showRecipe, setShowRecipe] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  const { accessToken } = useAuthToken();
  const { user: dbUser } = useUserContext();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);

  const params = useParams();

  const userId = params.userId;

  const inputEl = useRef(null);
  const onButtonClick = () => {
    (inputEl as any).current.focus();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any, { setSubmitting, resetForm }) => {
      try {
        setBackdropOpen(true);
        setSubmitting(true);

        const formData = new FormData();
        formData.append("file", image);
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/users`,
          { name: values.name, bio: values.bio },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/users/picture`,
          formData,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        alert("Success");
        setSubmitting(false);
        resetForm();
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      {userId ? (
        <PublicProfile showRecipe={showRecipe} userId={userId} />
      ) : isLoading ? (
        <div>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <Container maxWidth="lg">
            <div className="flex flex-row mt-10">
              <div className="flex flex-col">
                <ProfileCard />
                <Box
                  className="ml-7 mt-10"
                  sx={{ width: 320, maxWidth: "100%" }}
                >
                  <MenuList>
                    <MenuItem>
                      <ListItemIcon>
                        <EmailIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>{dbUser && dbUser.email}</ListItemText>
                    </MenuItem>
                    <Divider />

                    <MenuItem>
                      <ListItemIcon>
                        <SoupKitchenIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        onClick={() => {
                          setShowRecipe(true);
                          setShowEdit(false);
                        }}
                      >
                        Recipes
                      </ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <ContentPaste fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        onClick={() => {
                          setShowRecipe(false);
                          setShowEdit(false);
                        }}
                      >
                        Reviews
                      </ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        onClick={() => {
                          setShowEdit(true);
                          setShowRecipe(false);
                        }}
                      >
                        Edit Profile
                      </ListItemText>
                    </MenuItem>
                  </MenuList>
                </Box>
              </div>

              {isAuthenticated &&
                (isLoading ? (
                  <div>
                    <CircularProgress color="inherit" />
                  </div>
                ) : showEdit ? (
                  <form
                    className="flex flex-col mt-5 mb-10"
                    onSubmit={formik.handleSubmit}
                  >
                    <TextField
                      className="mt-4"
                      id="name"
                      color="success"
                      name="name"
                      label="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                    <br />
                    <TextField
                      className="mt-4"
                      id="bio"
                      color="success"
                      name="bio"
                      label="Bio"
                      value={formik.values.bio}
                      onChange={formik.handleChange}
                      error={formik.touched.bio && Boolean(formik.errors.bio)}
                      helperText={formik.touched.bio && formik.errors.bio}
                    />
                    <br />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {image && (
                        <Avatar
                          alt="uploaded avatar"
                          src={`${URL.createObjectURL(image)}`}
                          sx={{ width: 80, height: 80 }}
                        />
                      )}

                      <label htmlFor="files-upload">
                        <Button
                          color="success"
                          size="small"
                          component="span"
                          onMouseDown={(e) => e.preventDefault()}
                          sx={{
                            marginBottom: "2px",
                          }}
                          startIcon={<HiUpload size={20} />}
                        >
                          Upload Avatar
                        </Button>
                      </label>
                      <input
                        id="files-upload"
                        type="file"
                        accept="image/*"
                        onChange={onImageChange}
                        style={{ display: "none" }}
                      />
                    </Box>

                    <Button
                      className="mt-5 "
                      color="success"
                      variant="outlined"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </form>
                ) : (
                  <div style={{ height: 600 }} className="max-w-4xl ml-16">
                    <PublicProfile
                      showRecipe={showRecipe}
                      userId={(user as any).sub}
                    />
                  </div>
                ))}
            </div>
          </Container>
        </>
      )}
      {backdropOpen && <AppBackdrop text={"Updating User Profile"} />}
    </>
  );
};

export default Profile;
