import RecipeCard from "./RecipeCard";

type Props = { recipes: IRecipe[] };

const Section = ({ recipes }: Props): JSX.Element => {
  return (
    <div className="py-8 justify-evenly flex flex-wrap m-full md:8\/12">
      {recipes.map((recipe) => (
        <div className="pt-6 pb-8" key={recipe._id}>
          <RecipeCard recipe={recipe} key={recipe._id} />
        </div>
      ))}
    </div>
  );
};
export default Section;
