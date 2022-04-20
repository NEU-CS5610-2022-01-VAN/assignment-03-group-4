import React, { useEffect, useState } from "react";

import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

import { useAuthToken } from "../components/AuthTokenContext";
import UploadImage from "../components/UploadImage";
import CircularProgress from "@mui/material/CircularProgress";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useQuery } from "react-query";

const animatedComponents = makeAnimated();
const url = process.env.REACT_APP_API_BASE_URL + "/categories";
const NewRecipe = () => {
  const { accessToken } = useAuthToken();
  const navigate = useNavigate();

  const [images, setImages] = useState<any>([]);
  const [imageUrls, setImageUrls] = useState<any>([]);

  const [catLabels, setCatLabels] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);

  const {
    isLoading,
    error,
    data: categories,
    isFetching,
  } = useQuery("categories", () =>
    axios.get(url).then((res) => {
      setCatLabels(
        res.data.map((category) => {
          return { value: category._id, label: category.name };
        })
      );

      return res.data;
    })
  );

  useEffect(() => {
    if (images.length < 1) return;

    const newImageUrls = images.map((image) => URL.createObjectURL(image));
    setImageUrls(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  function onLabelChange(e) {
    const newSelectedCategories = e.map((category) => category.value);
    setSelectedCategories(newSelectedCategories);
  }

  return (
    <>
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
        onSubmit={async (values: any, { setSubmitting }) => {
          setTimeout(async () => {
            try {
              values.categories = selectedCategories;
              const res = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/recipes/`,
                values,
                {
                  headers: { Authorization: `Bearer ${accessToken}` },
                }
              );
              const newRecipe = res.data;

              images.forEach(async (img) => {
                const formData = new FormData();
                formData.append("file", img);
                await axios.post(
                  `${process.env.REACT_APP_API_BASE_URL}/recipes/${newRecipe.id}/upload`,
                  formData,
                  {
                    headers: { Authorization: `Bearer ${accessToken}` },
                  }
                );
              });

              alert("Success");
              setSubmitting(false);
              navigate("/recipe/" + newRecipe.id);
            } catch (err) {
              console.log(err);
            }
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

      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={catLabels}
          onChange={onLabelChange}
        />
      )}

      <>
        <input type="file" multiple accept="image/*" onChange={onImageChange} />
        {imageUrls.map((imageSrc) => (
          <img
            style={{ width: 400 }}
            src={imageSrc}
            alt={imageSrc}
            key={imageSrc}
          />
        ))}
      </>

      {/* <UploadImage /> */}
    </>
  );
};

export default NewRecipe;
