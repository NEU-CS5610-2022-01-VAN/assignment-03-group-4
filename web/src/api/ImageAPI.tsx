
   
import axios from "axios";
import { useQuery } from "react-query";

const GetImageById = (photoId, recipeId) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/recipes/${recipeId}/files/${photoId}`;
  return useQuery(url, async () => {
    return await axios
      .get(url, { responseType: "blob" })
      .then((res) => URL.createObjectURL(res.data as any));
  });
};

export default GetImageById;
