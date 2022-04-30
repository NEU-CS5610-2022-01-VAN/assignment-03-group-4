import { useState } from "react";

import ProfileCard from "./ProfileCard";
import PublicProfile from "./PublicProfile";
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

import "./css/profile.css";
import { Avatar } from "@mui/material";
import GetUserById from "../api/UserAPI";
import { useNotificationContext } from "../hooks/NotificationContext";
import { useBackdropContext } from "../hooks/BackdropContext";

const validationSchema = yup.object({
  name: yup.string().required("Name Required"),
  bio: yup.string().required("Bio Required"),
});

const UserProfile = ({ userId, isCurrentUser }) => {
  const [image, setImage] = useState<any>(null);
  const { addNotification } = useNotificationContext();
  const { addBackdrop, setBackdropOpen } = useBackdropContext();

  function onImageChange(e) {
    setImage(e.target.files[0]);
  }

  const [showRecipe, setShowRecipe] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  const { accessToken } = useAuthToken();

  const { data: user, isLoading } = GetUserById(userId);

  const formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        addBackdrop("Updating Profile");

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
        setBackdropOpen(false);
        addNotification("Profile Updated");
        setSubmitting(false);
        resetForm();
        setTimeout(() => window.location.reload(), 400);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      {isLoading ? (
        <div>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <>
          <div
            style={{ width: "90%" }}
            className=" mx-auto w-full flex flex-col md:flex-row mt-10"
          >
            <div className="mx-auto profile-left flex flex-col">
              <ProfileCard user={user} />
              <Box className="mt-10 ml-4" sx={{ width: 400 }}>
                <MenuList>
                  <MenuItem>
                    <ListItemIcon>
                      <EmailIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>{user && user.email}</ListItemText>
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
                  {Boolean(isCurrentUser) && (
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
                  )}
                </MenuList>
              </Box>
            </div>
            <div className="ma-auto profile-right">
              {isLoading ? (
                <div>
                  <CircularProgress color="inherit" />
                </div>
              ) : isCurrentUser && showEdit ? (
                <div
                  style={{
                    height: "100%",
                    width: "80%",
                    marginTop: "8%",
                    marginBottom: "15%",
                  }}
                >
                  <form
                    style={{ width: "100%" }}
                    className="flex flex-col ml-16 mt-24 mb-10"
                    onSubmit={formik.handleSubmit}
                  >
                    <div style={{ width: "100%" }} className="flex flex-row">
                      <TextField
                        style={{ width: "30%" }}
                        className="mt-4"
                        id="name"
                        color="success"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
                      />
                      <div style={{ width: "5%" }}></div>
                      <TextField
                        className="mt-4 ml-10"
                        style={{ width: "70%" }}
                        id="bio"
                        color="success"
                        name="bio"
                        label="Bio"
                        value={formik.values.bio}
                        onChange={formik.handleChange}
                        error={formik.touched.bio && Boolean(formik.errors.bio)}
                        helperText={formik.touched.bio && formik.errors.bio}
                      />
                    </div>
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
                </div>
              ) : (
                <div style={{ height: "100%" }} className="w-full">
                  <PublicProfile showRecipe={showRecipe} userId={user._id} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {/* {backdropOpen && <AppBackdrop text={"Updating User Profile"} />} */}
    </>
  );
};

export default UserProfile;
