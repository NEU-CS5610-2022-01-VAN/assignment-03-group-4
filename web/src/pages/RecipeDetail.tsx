import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import ReviewList from "../components/ReviewList";
import NewComment from "../components/NewComment";

const recipeUrl = process.env.REACT_APP_API_BASE_URL + "/recipes/";

const RecipeDetail = () => {
  const recipeId = useParams().recipeId;
  const url = recipeUrl + recipeId;

  const {
    isLoading,
    error,
    data: recipe,
    isFetching,
  } = useQuery("recipeDetail", () => axios.get(url).then((res) => res.data));

  return (
    <div>
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>{recipe.title}</h2>
          <img
            className="recipe_card_image"
            src="https://x.yummlystatic.com/web/strawberry-grain.png"
            alt="recipe"
          />

          <div>
            <span>by </span>
            <Link to={`/profile/${recipe.author.id}`}>
              <h3>{recipe.author.name}</h3>
            </Link>
          </div>

          {recipe.categories &&
            recipe.categories.map((category: any) => (
              <Button key={category._id}>{category.name}</Button>
            ))}

          <ReactStars
            count={5}
            size={24}
            activeColor="yellow"
            value={recipe.rating}
            isHalf={true}
          />
          <>Rating: {recipe.rating}/5</>

          <div>How to cook: {recipe.body}</div>
          <hr />

          <h4>What others say about this recipe?</h4>
          <ReviewList url={url + "/reviews"} />
          <hr />

          <NewComment recipeId={recipeId} />
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
