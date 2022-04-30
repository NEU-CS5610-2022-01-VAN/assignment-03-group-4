import "./css/newRecipe.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, FieldArray, getIn } from "formik";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { useQuery } from "react-query";
import * as yup from "yup";
import {
  InputAdornment,
  ImageList,
  Button,
  IconButton,
  TextField,
  InputLabel,
  ImageListItem,
  Typography,
  Divider,
  Container,
  Box,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
// icons
import { IoMdAdd } from "react-icons/io";
import { BiMinus } from "react-icons/bi";
import { HiUpload } from "react-icons/hi";

import { useAuthToken } from "../hooks/AuthTokenContext";
import { useNotificationContext } from "../hooks/NotificationContext";
import { useBackdropContext } from "../hooks/BackdropContext";
import LoadingIcon from "../components/LoadingIcon";

const animatedComponents = makeAnimated();
const url = process.env.REACT_APP_API_BASE_URL + "/categories";

const validationSchema = yup.object({
  title: yup.string().required("Please give this recipe a title"),
  body: yup.string().required("Please add some description"),
  cookingTime: yup
    .number()
    .required("Please enter the cooking time")
    .min(0, "Cooking time can not be negative")
    .max(10000, "really?"),
  ingredients: yup
    .array()
    .of(yup.string().required("Ingredient content is required.")),
  instructions: yup
    .array()
    .of(yup.string().required("Instruction content is required.")),
  youtubeVideoId: yup
    .string()
    .min(11, "The length of youtube video id must be 11")
    .max(11, "The length of youtube video id must be 11"),
});

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    fontSize: 22,
    color: "#444",
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginBottom: "0.3vh",
  },
}));

const NewRecipe = () => {
  const { addNotification } = useNotificationContext();
  const { addBackdrop, setBackdropOpen } = useBackdropContext();

  const classes = useStyles();
  const { accessToken } = useAuthToken();
  const navigate = useNavigate();

  const [images, setImages] = useState<any>([]);
  const [imageUrls, setImageUrls] = useState<any>([]);
  const [catLabels, setCatLabels] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);

  const { isLoading, error } = useQuery("categories", () =>
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
      <Formik
        initialValues={{
          title: "",
          body: "",
          ingredients: [""],
          instructions: [""],
          youtubeVideoId: "",
          cookingTime: "",
        }}
        validationSchema={validationSchema}
        validate={(values) => {
          const errors = {};
          if (images.length < 1) {
            (errors as any).images = "Please add at least 1 image";
          }
          return errors;
        }}
        onSubmit={async (values: any, { setSubmitting }) => {
          setSubmitting(true);
          addBackdrop("Uploading New Recipe");

          setTimeout(async () => {
            try {
              values.categories = selectedCategories;
              const newRecipe = await axios
                .post(
                  `${process.env.REACT_APP_API_BASE_URL}/recipes/`,
                  values,
                  {
                    headers: { Authorization: `Bearer ${accessToken}` },
                  }
                )
                .then((res) => res.data);

              images.forEach(async (img: string | Blob) => {
                const formData = new FormData();
                formData.append("file", img);

                await axios.post(
                  `${process.env.REACT_APP_API_BASE_URL}/recipes/${newRecipe.id}/files`,
                  formData,
                  {
                    headers: { Authorization: `Bearer ${accessToken}` },
                  }
                );
              });
              addNotification("New Recipe Created");
              setBackdropOpen(false);
              setSubmitting(false);
              setTimeout(() => navigate(`/recipes/${newRecipe.id}`), 800);
            } catch (err) {
              console.log(err);
            }
          }, 200);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form noValidate autoComplete="off">
            <Container>
              <Box
                sx={{
                  paddingX: "10vw",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  className="input-section"
                  style={{ marginTop: 20, marginBottom: 10 }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontSize: 40, marginBottom: "5px" }}
                  >
                    New Recipe
                  </Typography>
                  <Typography
                    variant="h5"
                    color="#777"
                    sx={{ fontSize: "1.25rem" }}
                  >
                    Share your recipe with the community
                  </Typography>
                  <Divider sx={{ marginTop: "12px", marginBottom: "6px" }} />
                </div>
                <div className="input-section">
                  <InputLabel htmlFor="title" className={classes.inputLabel}>
                    Title
                  </InputLabel>
                  <TextField
                    color="success"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "100%" }}
                    type="text"
                    name="title"
                    size="small"
                    placeholder="Give your recipe a name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    error={Boolean(errors.title) && Boolean(touched.title)}
                    helperText={
                      Boolean(errors.title) && Boolean(touched.title)
                        ? errors.title
                        : " "
                    }
                  />
                </div>

                <div className="input-section">
                  <InputLabel htmlFor="body" className={classes.inputLabel}>
                    Description
                  </InputLabel>
                  <TextField
                    id="body"
                    multiline
                    rows={4}
                    color="success"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "100%" }}
                    type="text"
                    name="body"
                    size="small"
                    placeholder="Introduce your recipe, add notes, cooking tips, sercing suggestions, etc..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.body}
                    error={Boolean(errors.body) && Boolean(touched.body)}
                    helperText={
                      Boolean(errors.body) && Boolean(touched.body)
                        ? errors.body
                        : " "
                    }
                  />
                </div>

                <div className="input-section">
                  <InputLabel
                    htmlFor="cookingTime"
                    className={classes.inputLabel}
                  >
                    Cooking Time
                  </InputLabel>
                  <TextField
                    id="cookingTime"
                    color="success"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "100%" }}
                    type="number"
                    name="cookingTime"
                    size="small"
                    placeholder="Enter its cooking time"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cookingTime}
                    error={
                      Boolean(errors.cookingTime) &&
                      Boolean(touched.cookingTime)
                    }
                    helperText={
                      Boolean(errors.cookingTime) &&
                      Boolean(touched.cookingTime)
                        ? errors.cookingTime
                        : " "
                    }
                  />
                </div>

                <div className="input-section">
                  <InputLabel className={classes.inputLabel}>
                    Ingredients
                  </InputLabel>
                  <FieldArray name="ingredients">
                    {(arrayHelpers) => (
                      <>
                        <Button
                          onClick={() => arrayHelpers.push("")}
                          color="success"
                          size="small"
                          onMouseDown={(e) => e.preventDefault()}
                          sx={{
                            marginBottom: "2px",
                          }}
                          startIcon={<IoMdAdd size={20} />}
                        >
                          Add item
                        </Button>
                        {values.ingredients.map(
                          (ingredient: string, index: number) => {
                            const name = `ingredients.${index}`;
                            const touchedIngredient = getIn(touched, name);
                            const errorIngredient = getIn(errors, name);
                            return (
                              <div key={index}>
                                <TextField
                                  color="success"
                                  InputLabelProps={{ shrink: true }}
                                  sx={{ width: "100%" }}
                                  type="text"
                                  name={name}
                                  size="small"
                                  placeholder="Add an item"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={ingredient}
                                  error={Boolean(
                                    touchedIngredient && errorIngredient
                                  )}
                                  helperText={
                                    touchedIngredient && errorIngredient
                                      ? errorIngredient
                                      : " "
                                  }
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="remove ingredient"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                          onMouseDown={(e) =>
                                            e.preventDefault()
                                          }
                                          edge="end"
                                        >
                                          <BiMinus />
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </div>
                            );
                          }
                        )}
                      </>
                    )}
                  </FieldArray>
                </div>

                <div className="input-section">
                  <InputLabel className={classes.inputLabel}>
                    Instructions
                  </InputLabel>
                  <FieldArray name="instructions">
                    {(arrayHelpers) => (
                      <>
                        <Button
                          onClick={() => arrayHelpers.push("")}
                          color="success"
                          size="small"
                          onMouseDown={(e) => e.preventDefault()}
                          sx={{
                            marginBottom: "2px",
                          }}
                          startIcon={<IoMdAdd size={20} />}
                        >
                          Add item
                        </Button>
                        {values.instructions.map(
                          (ingredient: string, index: number) => {
                            const name = `instructions.${index}`;
                            const touchedInstruction = getIn(touched, name);
                            const errorInstruction = getIn(errors, name);
                            return (
                              <div key={index}>
                                <TextField
                                  color="success"
                                  InputLabelProps={{ shrink: true }}
                                  sx={{ width: "100%" }}
                                  type="text"
                                  name={name}
                                  size="small"
                                  placeholder="Add an item"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={ingredient}
                                  error={Boolean(
                                    touchedInstruction && errorInstruction
                                  )}
                                  helperText={
                                    touchedInstruction && errorInstruction
                                      ? errorInstruction
                                      : " "
                                  }
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          aria-label="remove instruction"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                          onMouseDown={(e) =>
                                            e.preventDefault()
                                          }
                                          edge="end"
                                        >
                                          <BiMinus />
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </div>
                            );
                          }
                        )}
                      </>
                    )}
                  </FieldArray>
                </div>

                {error ? (
                  <div>Error: {(error as any).mesasge}</div>
                ) : isLoading ? (
                  <LoadingIcon />
                ) : (
                  <div className="input-section">
                    <InputLabel className={classes.inputLabel}>Tags</InputLabel>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={catLabels}
                      onChange={onLabelChange}
                      aria-label="tags select"
                    />
                    <br />
                  </div>
                )}

                <div className="input-section">
                  {values.youtubeVideoId.length === 11 && (
                    <iframe
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${values.youtubeVideoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}

                  <InputLabel
                    htmlFor="youtube-id"
                    className={classes.inputLabel}
                  >
                    Youtube Video
                  </InputLabel>
                  <TextField
                    id="youtube-id"
                    color="success"
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "100%" }}
                    type="text"
                    name="youtubeVideoId"
                    size="small"
                    placeholder="Add your YouTube video id "
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.youtubeVideoId}
                    error={
                      Boolean(errors.youtubeVideoId) &&
                      Boolean(touched.youtubeVideoId)
                    }
                    helperText={
                      Boolean(errors.youtubeVideoId) &&
                      Boolean(touched.youtubeVideoId)
                        ? errors.youtubeVideoId
                        : " "
                    }
                  />
                </div>

                <div className="input-section">
                  <InputLabel className={classes.inputLabel}>Images</InputLabel>
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
                      Add Images
                    </Button>
                  </label>
                  <input
                    id="files-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={onImageChange}
                    style={{ display: "none" }}
                  />
                  {images.length === 0 && (
                    <Typography
                      variant="body1"
                      sx={{ color: "#d32f2f", fontSize: "0.75rem", ml: "5px" }}
                    >
                      {(errors as any).images}
                    </Typography>
                  )}

                  {imageUrls.length > 0 && (
                    <ImageList cols={3}>
                      {imageUrls.map((url) => (
                        <ImageListItem key={url}>
                          <img
                            src={`${url}`}
                            srcSet={`${url}`}
                            alt={"uploaded file"}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  )}
                </div>

                <Button
                  color="success"
                  variant="outlined"
                  disabled={isSubmitting}
                  type="submit"
                  onMouseDown={(e) => e.preventDefault()}
                  sx={{ margin: "5vh" }}
                >
                  Submit
                </Button>
              </Box>
            </Container>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default NewRecipe;
