import axios from "axios";
import { useQuery } from "react-query";

const GetImageById = (photoId: string, recipeId: string) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/recipes/${recipeId}/files/${photoId}`;

  return useQuery<string, Error>(url, async () => {
    return await axios
      .get(url, { responseType: "blob" })
      .then((res) => URL.createObjectURL(res.data));
  });
};

export default GetImageById;
