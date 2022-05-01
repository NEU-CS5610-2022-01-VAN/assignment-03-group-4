import { Rating } from "@mui/material";

type Props = {
  recipe: IRecipe;
  myRef: any;
  ingredientRef: any;
  directionRef: any;
};

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
const executeScroll = (myRef) => scrollToRef(myRef);

const RecipeNote = ({
  recipe,
  myRef,
  ingredientRef,
  directionRef,
}: Props): JSX.Element => {
  return (
    <div className="font-serif flex flex-col items-center gap-8">
      <div className="flex flex-col items-center">
        <div className="inline-flex">
          <div className="text-gray-800 font-bold mr-2">
            {recipe.rating ? recipe.rating.toFixed(1) : "0.0"}
          </div>
          <Rating name="read-only" defaultValue={recipe.rating} readOnly />
        </div>
        <div
          onClick={() => executeScroll(myRef)}
          className="items-center text-sm hover:text-light-green-700"
        >
          {recipe.reviews.length} reviews
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div
          onClick={() => executeScroll(ingredientRef)}
          className="flex content-center hover:text-light-green-700"
        >
          <div>Ingredients </div>
          <div className="text-gray-800 font-bold ml-2 ">
            {recipe.ingredients.length}
          </div>
        </div>
        <div
          onClick={() => executeScroll(directionRef)}
          className="flex content-center hover:text-light-green-700"
        >
          <div>Cooking Steps </div>
          <div className="text-gray-800 font-bold ml-2 ">
            {recipe.instructions.length}
          </div>
        </div>
        <div className="flex content-center ">
          Total Minutes
          <div className="text-gray-800 font-bold ml-2">
            {recipe.cookingTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeNote;
