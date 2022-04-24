import React, { useEffect, useState } from "react";
import "./css/newRecipe.css";

import axios from "axios";
import { Formik, Form, Field, ErrorMessage, FieldArray, getIn } from "formik";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
// import Typography from "@material-ui/core/Typography";
import { Typography } from "@mui/material";
import { useAuthToken } from "../components/AuthTokenContext";
import UploadImage from "../components/UploadImage";
import CircularProgress from "@mui/material/CircularProgress";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useQuery } from "react-query";
import { Button, IconButton, Snackbar, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import AppBackdrop from "../components/AppBackdrop";
// import Input from "@material-tailwind/react/Input";
import Input from "@mui/material/Input";
import { InputLabel } from "@mui/material";

import TextInput from "../components/TextInput";
import { IoImagesOutline } from "react-icons/io5";
import { IoIosRemoveCircleOutline, IoMdAdd } from "react-icons/io";
import * as yup from "yup";
import { InputAdornment } from "@mui/material";
import { TiDeleteOutline } from "react-icons/ti";
import { BiMinus } from "react-icons/bi";

const animatedComponents = makeAnimated();
const url = process.env.REACT_APP_API_BASE_URL + "/categories";

const validationSchema = yup.object({
  title: yup.string().required("Please give this recipe a title"),
  body: yup.string().required("Please add some description"),
  ingredients: yup
    .array()
    .of(yup.string().required("Ingredient content is required.")),
  instructions: yup
    .array()
    .of(yup.string().required("Instruction content is required.")),
});

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    fontSize: 22,
    color: "#444",
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginBottom: "0.3vh",
  },
  textField: {},
}));

const NewRecipe = () => {
  const classes = useStyles();
  const { accessToken } = useAuthToken();
  const navigate = useNavigate();

  const [images, setImages] = useState<any>([]);
  const [imageUrls, setImageUrls] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const [catLabels, setCatLabels] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);

  const [backdropOpen, setBackdropOpen] = useState<boolean>(false);

  const handlebackdropClose = () => {
    setBackdropOpen(false);
  };
  const handleToggle = () => {
    setBackdropOpen(!backdropOpen);
  };

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

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setBackdropOpen(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          body: "",
          ingredients: [""],
          instructions: [""],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values: any, { setSubmitting }) => {
          setBackdropOpen(true);

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
                  `${process.env.REACT_APP_API_BASE_URL}/recipes/${newRecipe.id}/files`,
                  formData,
                  {
                    headers: { Authorization: `Bearer ${accessToken}` },
                  }
                );
              });

              alert("Success");
              // setOpen(true);
              setSubmitting(false);
              navigate("/recipe/" + newRecipe.id);
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
          // <form onSubmit={handleSubmit}>
          <Form noValidate autoComplete="off">
            <div className="form-container">
              <div
                className="input-section"
                style={{ marginTop: 14, marginBottom: 10 }}
              >
                <Typography variant="h4">New Recipe</Typography>
                <Typography variant="h6" color="#777">
                  Share your recipe with the community
                </Typography>
              </div>
              <div className="input-section">
                <InputLabel htmlFor="title" className={classes.inputLabel}>
                  Title
                </InputLabel>
                <TextField
                  id="title"
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
                        startIcon={<IoMdAdd size={18} />}
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
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                      >
                                        {/* <TiDeleteOutline /> */}
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
                        startIcon={<IoMdAdd size={18} />}
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
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                      >
                                        {/* <TiDeleteOutline /> */}
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
                <div>
                  <CircularProgress color="inherit" />
                </div>
              ) : (
                <div className="input-section">
                  <InputLabel className={classes.inputLabel}>Tags</InputLabel>
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={catLabels}
                    onChange={onLabelChange}
                  />
                  <br />
                </div>
              )}

              <div className="input-section">
                <InputLabel className={classes.inputLabel}>Images</InputLabel>
                <label htmlFor="files-upload">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <IoImagesOutline size={20} /> <>&nbsp; Add Images</>
                  </div>
                </label>

                <input
                  id="files-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onImageChange}
                  style={{ display: "none" }}
                />
                {imageUrls.map((imageSrc) => (
                  <img
                    style={{ width: 400 }}
                    src={imageSrc}
                    alt={imageSrc}
                    key={imageSrc}
                  />
                ))}
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
            </div>
          </Form>
          // </form>
        )}
      </Formik>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        // action={action}
      />

      {backdropOpen && <AppBackdrop text={"Creating New Recipe"} />}

      {/* <UploadImage /> */}
    </>
  );
};

export default NewRecipe;
