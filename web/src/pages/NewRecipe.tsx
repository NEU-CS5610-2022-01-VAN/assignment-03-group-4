import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useAuthToken } from "../components/AuthTokenContext";
import axios from "axios";

const NewRecipe = () => {
  const { accessToken } = useAuthToken();

  return (
    <>
      <div>
        <h1>New Recipe</h1>
        <Formik
          initialValues={{ title: "", body: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              (errors as any).title = "Required";
            }
            if (!values.body) {
              (errors as any).body = "Required";
            }
            return errors;
          }}
          onSubmit={(values: any, { setSubmitting }) => {
            setTimeout(() => {
              const newRecipe = axios
                .post(
                  `${process.env.REACT_APP_API_BASE_URL}/recipes/`,
                  values,
                  {
                    headers: { Authorization: `Bearer ${accessToken}` },
                  }
                )
                .then((res) => res.data)
                .catch((err) => console.log(err));
              alert("Success");
              setSubmitting(false);
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
              <label htmlFor="title">Title:</label>
              <Field
                style={{ borderWidth: 3, borderColor: "#333" }}
                name="title"
                id="title"
              />
              <ErrorMessage name="title" component="div" />

              <label htmlFor="body">Body:</label>
              <Field
                style={{ borderWidth: 3, borderColor: "#333" }}
                name="body"
                id="body"
              />
              <ErrorMessage name="body" component="div" />

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default NewRecipe;
