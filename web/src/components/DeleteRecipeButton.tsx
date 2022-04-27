import axios from "axios";
import React, { useState } from "react";
import { Button as BootstrapButton } from "react-bootstrap";
import { useAuthToken } from "../hooks/AuthTokenContext";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AppBackdrop from "./AppBackdrop";

const DeleteRecipeButton = ({ recipeId }) => {
  const url = process.env.REACT_APP_API_BASE_URL + "/recipes/" + recipeId;

  const { accessToken } = useAuthToken();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);

  const onDeleteButtonClick = () => {
    setOpen(false);
    setBackdropOpen(true);
    setTimeout(() => {
      axios
        .delete(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => {
          alert("Success");
          setBackdropOpen(false);
          navigate(-1);
        })
        .catch((err) => console.log(err));
    }, 200);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

      {backdropOpen && <AppBackdrop text={"Deleting Recipe"} />}
    </>
  );
};
export default DeleteRecipeButton;
