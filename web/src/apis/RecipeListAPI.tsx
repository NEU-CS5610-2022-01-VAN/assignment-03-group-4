import axios from "axios";
import { useQuery } from "react-query";

const GetRecipesByURL = (url) => {
  return useQuery(url, async () => {
    return await axios.get(url).then((res) => res.data);
  });
};

export default GetRecipesByURL;
