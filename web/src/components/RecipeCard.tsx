import "./css/recipeCard.css";
import ReactStars from "react-rating-stars-component";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  const catagories = recipe.categories.length
    ? recipe.categories.map((category) => category.name)
    : ["Others"];

  return (
    <>
      <img
        className="recipe_card_image"
        src="https://x.yummlystatic.com/web/strawberry-grain.png"
        alt="recipe"
      />

      <h4>{recipe.title}</h4>
      <div>
        <span>by </span>
        <Link to={`/Profile/${recipe.author.id}`}>{recipe.author.name}</Link>
      </div>
      {catagories.map((category: string) => (
        <Button key={category}>{category}</Button>
      ))}
      <ReactStars count={5} size={24} activeColor="yellow" />
    </>
  );
}

export default RecipeCard;
