import React from "react";
import ReactDOM from 'react-dom';
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


const validationSchema = yup.object({
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
        <form className="flex flex-col mt-4 mb-10" onSubmit={formik.handleSubmit}>
          <TextField
            className="mt-4"
            id="content"
            name="content"
            label="Content"
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
          <TextField
            className="mt-4"
            id="rating"
            name="rating"
            label="Rating"
            value={formik.values.rating}
            onChange={formik.handleChange}
            error={formik.touched.rating && Boolean(formik.errors.rating)}
            helperText={formik.touched.rating && formik.errors.rating}
          />
          <Button className="mt-4 " color="primary" variant="contained" type="submit">
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
