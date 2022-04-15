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
      <Link to={`/recipe/${recipe.id}`}>
        <img
          className="recipe_card_image"
          src="https://x.yummlystatic.com/web/strawberry-grain.png"
          alt="recipe"
        />

        <h4>{recipe.title}</h4>
      </Link>

      <div>
        <span>by </span>
        <Link to={`/profile/${recipe.author.id}`}>
          <h3>{recipe.author.name}</h3>
        </Link>
      </div>
      {catagories.map((category: string) => (
        <Button key={category}>{category}</Button>
      ))}
      <ReactStars count={5} size={24} activeColor="yellow" />
    </>
  );
}

export default RecipeCard;
