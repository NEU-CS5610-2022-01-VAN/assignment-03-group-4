import axios from "axios";
import { useQuery } from "react-query";

const GetRecipesByUrl = (url: string) => {
  return useQuery<IRecipe[], Error>(url, async () => {
    return await axios.get(url).then((res) => res.data);
  });
};

export default GetRecipesByUrl;
