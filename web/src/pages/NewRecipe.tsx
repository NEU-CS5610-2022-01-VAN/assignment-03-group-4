import React, { useEffect, useState } from "react";

import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

import { useAuthToken } from "../components/AuthTokenContext";
import UploadImage from "../components/UploadImage";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useQuery } from "react-query";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const animatedComponents = makeAnimated();
const url = process.env.REACT_APP_API_BASE_URL + "/categories";
const NewRecipe = () => {
  const { accessToken } = useAuthToken();
  const navigate = useNavigate();

  const [images, setImages] = useState<any>([]);
  const [imageUrls, setImageUrls] = useState<any>([]);

  const [catLoaded, setCatLoaded] = useState<any>(false);

  const [catLabels, setCatLabels] = useState<any>([]);

  const {
    isLoading,
    error,
    data: categories,
    isFetching,
  } = useQuery("categories", () =>
    axios.get(url).then((res) => {
      setCatLabels(
        res.data.map((category) => {
          return { value: category, label: category.name };
        })
      );
      // console.log(catLabels);

      return res.data;
    })
  );

  // useEffect(() => {
  //   if (catLoaded) return;
  //   const newLabels = categories.map((category) => {
  //     return { value: category.id, label: category.name };
  //   });
  //   setCatLoaded(true);

  //   setCatLabels(newLabels);
  // }, [catLoaded, categories]);

  useEffect(() => {
    if (images.length < 1) return;

    const newImageUrls = images.map((image) => URL.createObjectURL(image));
    setImageUrls(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
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
              const res = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/recipes/`,
                values,
                {
                  headers: { Authorization: `Bearer ${accessToken}` },
                }
              );
              const newRecipe = res.data;

              // var cnt = 0;
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
        <div>Loading...</div>
      ) : (
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          // defaultValue={[options[2], options[3]]}
          isMulti
          options={catLabels}
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
