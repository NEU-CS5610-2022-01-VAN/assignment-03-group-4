import axios from "axios";
import { useQuery } from "react-query";

const GetAvatarByUserId = (userId: string) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/users/${userId}/picture`;

  return useQuery<string, Error>(url, async () => {
    return await axios
      .get(url, { responseType: "blob" })
      .then((res) => URL.createObjectURL(res.data));
  });
};

export default GetAvatarByUserId;
