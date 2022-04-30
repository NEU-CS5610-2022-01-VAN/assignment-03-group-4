import axios from "axios";
import { useQuery } from "react-query";

const GetUserById = (userId) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`;
  return useQuery(url, async () => {
    return await axios.get(url).then((res) => res.data);
  });
};

export default GetUserById;
