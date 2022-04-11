import "./css/recipe.css";
import ReactStars from "react-rating-stars-component";
// const ReactStars = require("react-rating-stars-component");

const recipes = [
  {
    id: 1,
    img: "../assets/recipe.png",
    title: "Yummy Dessert",
    count: 5,
  },
  {
    id: 2,
    img: "../assets/recipe.png",
    title: "Yummy Dessert",
    count: 5,
  },
  {
    id: 3,
    img: "../assets/recipe.png",
    title: "Yummy Dessert",
    count: 5,
  },
  {
    id: 4,
    img: "../assets/recipe.png",
    title: "Yummy Dessert",
    count: 5,
  },
  {
    id: 5,
    img: "../assets/recipe.png",
    title: "Yummy Dessert",
    count: 5,
  },
  {
    id: 6,
    img: "../assets/recipe.png",
    title: "Yummy Dessert",
    count: 5,
    price: 656,
  },
  {
    id: 7,
    img: "../assets/recipe.png",
    title: "Yummy Dessert",
    count: 5,
  },
  {
    id: 8,
    img: "../assets/recipe.png",
    title: "Yummy Dessert",
    count: 5,
  },
  {
    id: 9,
    img: "../assets/recipe.png",
    title: "Yummy Dessert",
    count: 5,
  },
  {
    id: 10,
    img: "../assets/recipe.png",
    title: "Yummy Dessert",
    count: 5,
  },
  {
    id: 11,
    img: "./recipe.png",
    title: "Yummy Dessert",
    count: 5,
  },
  {
    id: 12,
    img: "../assets/recipe.png",
    title: "Yummy Dessert",
    count: 5,
  },
  {
    id: 13,
    img: "../assets/recipe.png",
    title: "Yummy Dessert",
    count: 5,
  },
  {
    id: 14,
    img: "../assets/recipe.png",
    title: "Yummy Dessert",
    count: 5,
  },
];

const Recipe = () => {
  return (
    <>
      <h2>Browse Recipe</h2>
      <div className="recipe_details">
        {recipes.map((recipe) => {
          return (
            <div className="recipe_details-list" key={recipe.id}>
              <img
                src="https://x.yummlystatic.com/web/strawberry-grain.png"
                alt="recipe"
              />

              <h5>{recipe.title}</h5>
              <ReactStars count={recipe.count} size={24} activeColor="yellow" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Recipe;
