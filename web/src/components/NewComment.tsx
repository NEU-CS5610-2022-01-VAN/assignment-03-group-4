import React, { useState } from "react";

import axios from "axios";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useAuthToken } from "./AuthTokenContext";
import LoginButton from "./LoginButton";
import AppBackdrop from "./AppBackdrop";


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

const NewComment = ({ recipeId }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "", 
      rating: "", 
      recipe: recipeId
    },
    validationSchema: validationSchema,
    onSubmit: (values: any, { setSubmitting }) => {
      setTimeout(() => {
        axios
          .post(`${process.env.REACT_APP_API_BASE_URL}/reviews/`, values, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          .then(() => {
            alert("Success");
            setSubmitting(false);
            navigate("/recipe/" + recipeId);
          })
          .catch((err) => console.log(err));
      }, 200);
    }
  });

  const { accessToken } = useAuthToken();
  const { user, error, isAuthenticated, isLoading } = useAuth0();
  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {(error as any).message}</div>;
  }
  if (!user) {
    return (
      <>
        <LoginButton>Log in</LoginButton> to leave a comment
      </>
    );
  }
  
    return (
      <>
        <div >
          <h4 className="font-serif">Leave a Review:</h4>
        </div>
        <div className="ml-7 mr-10">
        <form className="flex flex-col mt-5 mb-10" onSubmit={formik.handleSubmit}>
          <TextField
            className="mt-4"
            id="title"
            color="success"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <br/>
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
          <br/>
          <TextField
            className="mt-5"
            id="rating"
            color="success"
            name="rating"
            label="Rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
            error={formik.touched.rating && Boolean(formik.errors.rating)}
            helperText={formik.touched.rating && formik.errors.rating}
          />
          <br/>
          <Button className="mt-5 " color="success"  variant="outlined" type="submit">
            Submit
          </Button>
        </form>
        </div>
      </>
    );
  };
// };

// ReactDOM.render(<WithMaterialUI />, document.getElementById('root'));

export default NewComment;
