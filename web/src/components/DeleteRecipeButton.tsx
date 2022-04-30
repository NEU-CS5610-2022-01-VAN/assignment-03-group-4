import axios from "axios";
import React, { useState } from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
} from "@mui/material";

import { useAuthToken } from "../hooks/AuthTokenContext";
import { useNotificationContext } from "../hooks/NotificationContext";
import { useBackdropContext } from "../hooks/BackdropContext";

const DeleteRecipeButton = ({ recipeId }) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/recipes/${recipeId}`;

  const { addNotification } = useNotificationContext();
  const { addBackdrop, setBackdropOpen } = useBackdropContext();
  const { accessToken } = useAuthToken();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onDeleteButtonClick = () => {
    setOpen(false);
    addBackdrop("Deleting Recipe");

    setTimeout(() => {
      axios
        .delete(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          setBackdropOpen(false);
          addNotification("Recipe Deleted");
          setTimeout(() => navigate(-1), 400);
        })
        .catch((err) => console.log(err));
    }, 200);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <BootstrapButton variant="danger" onClick={handleClickOpen}>
        Delete
      </BootstrapButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this recipe?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This operation cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={onDeleteButtonClick}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DeleteRecipeButton;
