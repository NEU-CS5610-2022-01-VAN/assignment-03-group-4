import axios from "axios";
import { useFormik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FiLogIn } from "react-icons/fi";

import { useAuthToken } from "../hooks/AuthTokenContext";
import LoginButton from "./LoginButton";
import { useNotificationContext } from "../hooks/NotificationContext";
import { useBackdropContext } from "../hooks/BackdropContext";
import Rating from "@mui/material/Rating";

const validationSchema = yup.object({
  title: yup.string().required("Review Title Required"),
  content: yup.string().required("Review Content Required"),
  rating: yup
    .number()
    .positive()
    .integer()
    .min(1, "Plese give a rating score(1-5)")
    .max(5, "Plese give a rating score(1-5)")
    .required("Plese give a rating score(1-5)"),
});

const NewComment = ({ recipeId }) => {
  const { addNotification } = useNotificationContext();
  const { addBackdrop, setBackdropOpen } = useBackdropContext();
  const { accessToken } = useAuthToken();
  const { user, error, isLoading } = useAuth0();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      rating: 0,
      recipe: recipeId,
    },
    validationSchema: validationSchema,
    onSubmit: (values: any, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      addBackdrop("Uploading Comment");
      setTimeout(async () => {
        try {
          await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/reviews/`,
            values,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          setBackdropOpen(false);
          addNotification("Comment Uploaded");
          resetForm();
          setTimeout(() => window.location.reload(), 400);

          setSubmitting(false);
        } catch (err) {
          console.log(err);
        }
      }, 200);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {(error as any).message}</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center my-16 text-gray-700">
        <div className="p-1 ">
          <LoginButton>
            <div
              style={{ color: "#2F7D31" }}
              className="flex items-center gap-2 "
            >
              <FiLogIn />
              Log in
            </div>
          </LoginButton>{" "}
        </div>
        to leave a comment
      </div>
    );
  }

  return (
    <>
      <div className="ml-7 mr-10">
        <form
          className="flex flex-col mt-5 mb-10"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            className="mt-4"
            id="comment-title"
            color="success"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <br />
          <TextField
            className="mt-4"
            id="content"
            color="success"
            name="content"
            label="Content"
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
          <br />
          <div className="flex flex-row">
            <h4 className="font-serif mt-2 mr-2 text-lg text-gray-800">
              Rating
            </h4>
            <Rating
              onChange={formik.handleChange}
              id="rating"
              name="rating"
              className="pt-2"
              size="large"
              value={formik.values.rating}
            />
          </div>
          <p
            className="ml-16"
            style={{ fontSize: "0.85rem", color: "#D32F2F" }}
          >
            {formik.touched.rating && formik.errors.rating}
          </p>
          <br />
          <Button
            className="mt-5"
            color="success"
            variant="outlined"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewComment;
