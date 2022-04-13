import "./css/recipe.css";
import ReactStars from "react-rating-stars-component";
import { Button } from "react-bootstrap";

function RecipeCard({ recipe }) {
  const catagories = recipe.categories.length
    ? recipe.categories.map((category) => category.name)
    : ["Others"];

  console.log(recipe);
  return (
    <div className="recipe_details">
      <div key={recipe.id}>
        <img
          className="recipe_card_image"
          src="https://x.yummlystatic.com/web/strawberry-grain.png"
          alt="recipe"
        />

        <h4>{recipe.title}</h4>
        <p>by {recipe.author.name}</p>
        {catagories.map((category: string) => (
          <Button key={category}>{category}</Button>
        ))}
        <ReactStars count={5} size={24} activeColor="yellow" />
      </div>
    </div>
  );
}

export default RecipeCard;
