
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

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [showRecipe, setShowRecipe] = useState(true)

  const params = useParams();

  const userId = params.userId;

  const inputEl = useRef(null);
  const onButtonClick = () => {
    (inputEl as any).current.focus();
  };

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
                            }}>Recipes</ListItemText>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <ContentPaste fontSize="small" />
                      </ListItemIcon>
                      <ListItemText onClick={() => {
                              setShowRecipe(false);
                            }} >Reviews</ListItemText>
                    </MenuItem>
                  </MenuList>
                </Box>
              </div>

            {isAuthenticated &&
              (isLoading ? (
                <div>
                  <CircularProgress color="inherit" />
                </div>
              ) : (
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
