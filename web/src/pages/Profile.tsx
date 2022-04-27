
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";


import ProfileCard from "../components/ProfileCard";
import PublicProfile from "../components/PublicProfile";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { useRef } from "react";

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import ContentPaste from '@mui/icons-material/ContentPaste';

import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useAuthToken } from "../components/AuthTokenContext";

const validationSchema = yup.object({
  title: yup
  .string()
  .required('Review Title Required'),
  content: yup
    .string()
    .required('Review Content Required'),
  rating: yup
    .number()
    .positive()
    .integer()
    .min(1, 'Plese give a rating score(1-5)')
    .max(5, 'Plese give a rating score(1-5)')
    .required('Plese give a rating score(1-5)'),
});

const Profile = () => {
  
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [showRecipe, setShowRecipe] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  const { accessToken } = useAuthToken();
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
    onSubmit: (values: any, { setSubmitting }) => {
      setTimeout(() => {
        axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/users`,
            { name: values.name, bio: values.bio },
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then(() => {
            alert("Success");
          })
          .catch((err) => console.log(err));
      }, 200);
    }
  });

  return (
    <>
      {userId ? (
        <PublicProfile showRecipe={showRecipe} userId={userId} />
      ) : (isLoading ? (
        <div>
          <CircularProgress color="inherit" />
        </div>
      ):(
        <>
          <Container maxWidth="lg">
            <div className="flex flex-row mt-10">
              <div className="flex flex-col">
                <ProfileCard />
                <Box className="ml-7 mt-10" sx={{ width: 320, maxWidth: '100%' }}>
                  <MenuList>
                    <MenuItem>
                      <ListItemIcon>
                        <EmailIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>{(user as any).email}</ListItemText>
                    </MenuItem>
                    <Divider />
                   
                    <MenuItem>
                      <ListItemIcon>
                        <SoupKitchenIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText onClick={() => {
                              setShowRecipe(true);
                              setShowEdit(false);
                            }}>Recipes</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <ContentPaste fontSize="small" />
                      </ListItemIcon>
                      <ListItemText onClick={() => {
                              setShowRecipe(false);
                              setShowEdit(false);
                            }} >Reviews</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText onClick={() => {
                              setShowEdit(true);
                              setShowRecipe(false);
                            }}>Edit Profile</ListItemText>
                    </MenuItem>
                  </MenuList>
                </Box>
              </div>

            {isAuthenticated &&
              (isLoading ? (
                <div>
                  <CircularProgress color="inherit" />
                </div>
              ) : showEdit?(
                <form className="flex flex-col mt-5 mb-10" onSubmit={formik.handleSubmit}>
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
                  <br/>
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
                  <br/>
                  <br/>
                  <Button className="mt-5 " color="success"  variant="outlined" type="submit">
                    Submit
                  </Button>
                </form>
              ):(
                <div style={{height:600}} className="max-w-4xl ml-16">
                <PublicProfile showRecipe={showRecipe} userId={(user as any).sub} />
                </div>
              ))}
            </div>
          </Container>
        </>
      )
      )}
    </>
  );
};

export default Profile;
