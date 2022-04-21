import React, { useState } from "react";

import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { useAuthToken } from "./AuthTokenContext";
import LoginButton from "./LoginButton";
import AppBackdrop from "./AppBackdrop";

const NewComment = ({ recipeId }) => {
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
      <h4>Leave a comment here:</h4>
      <Formik
        initialValues={{ content: "", rating: "", recipe: recipeId }}
        validate={({ content, rating }) => {
          const errors = {};
          if (!content) {
            (errors as any).content = "Review Content Required";
          }
          if (
            isNaN(rating as any) ||
            Number(rating) > 5 ||
            Number(rating) < 1
          ) {
            (errors as any).rating = "Rating must be a number between 1 and 5";
          }
          return errors;
        }}
        onSubmit={(values: any, { setSubmitting }) => {
          setBackdropOpen(true);
          setTimeout(() => {
            axios
              .post(`${process.env.REACT_APP_API_BASE_URL}/reviews/`, values, {
                headers: { Authorization: `Bearer ${accessToken}` },
              })
              .then(() => {
                alert("Success");
                setSubmitting(false);
                navigate("/recipe/" + recipeId);
                setBackdropOpen(false);
              })
              .catch((err) => console.log(err));
          }, 200);
        }}
      >
        {({ isSubmitting }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              width: 400,
              borderWidth: 3,
            }}
          >
            <label htmlFor="content">Content:</label>
            <Field
              style={{ borderWidth: 3, borderColor: "#333" }}
              name="content"
              id="content"
            />
            <ErrorMessage name="content" component="div" />

            <label htmlFor="rating">Rating:</label>
            <Field
              style={{ borderWidth: 3, borderColor: "#333" }}
              name="rating"
              id="rating"
            />
            <ErrorMessage name="rating" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>

      {backdropOpen && <AppBackdrop text={"Creating New Comment"} />}
    </>
  );
};

export default NewComment;
