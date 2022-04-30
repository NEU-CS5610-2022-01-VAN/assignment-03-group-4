import { useFormik } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import { HiUpload } from "react-icons/hi";
import { useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useAuthToken } from "../hooks/AuthTokenContext";
import AppBackdrop from "./AppBackdrop";
import { useNotificationContext } from "../hooks/NotificationContext";
import { useBackdropContext } from "../hooks/BackdropContext";

const validationSchema = yup.object({
  name: yup.string().required("Name Required"),
  bio: yup.string().required("Bio Required"),
});

const EditProfile = ({ userName }) => {
  const { accessToken } = useAuthToken();
  const { addNotification } = useNotificationContext();
  const { addBackdrop, setBackdropOpen } = useBackdropContext();

  const formik = useFormik({
    initialValues: {
      name: userName,
      bio: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any, { setSubmitting, resetForm }) => {
      try {
        addBackdrop("Updating Profile");
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
        setSubmitting(false);
        setBackdropOpen(false);
        addNotification("Profile Updated");
        resetForm();
        setTimeout(() => window.location.reload(), 400);
      } catch (err) {
        console.log(err);
      }
    },
  });
  const [image, setImage] = useState<any>(null);
  function onImageChange(e) {
    setImage(e.target.files[0]);
  }
  return (
    <>
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
              error={formik.touched.name && Boolean(formik.errors.name)}
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
      {addBackdrop && <AppBackdrop />}
    </>
  );
};
export default EditProfile;
