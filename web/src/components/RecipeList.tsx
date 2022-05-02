import RecipeCard from "./RecipeCard";

type Props = { recipes: IRecipe[] };

const RecipeList = ({ recipes }: Props): JSX.Element => {
  return (
    <section className="pt-10 pb-48">
      <div className="justify-evenly lg:justify-start flex flex-wrap container max-w-8xl mx-auto px-4 gap-2">
        {recipes.map((recipe) => (
          <div className="px-2 pt-6 pb-8" key={recipe._id}>
            <RecipeCard recipe={recipe} key={recipe._id} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeList;
