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
import GetUserById from "../api/UserAPI";
import EditProfile from "./EditProfile";
import "./css/profile.css";

const UserProfile = ({ userId, isCurrentUser }) => {
  const [showRecipe, setShowRecipe] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  const { data: user, isLoading } = GetUserById(userId);

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
                <EditProfile userName={user.name} userBio={user.bio} />
              ) : (
                <div style={{ height: "100%" }} className="w-full">
                  <PublicProfile showRecipe={showRecipe} userId={user._id} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
