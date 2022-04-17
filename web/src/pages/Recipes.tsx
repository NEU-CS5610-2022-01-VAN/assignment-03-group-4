import axios from "axios";
import { useQuery } from "react-query";
import RecipeList from "../components/RecipeList";

const url = process.env.REACT_APP_API_BASE_URL + "/recipes";

function Recipes() {
  return (
    <div>
      <RecipeList url={url} />
    </div>
  );
}

export default Recipes;
