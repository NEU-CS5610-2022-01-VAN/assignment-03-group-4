import axios from "axios";
import { useQuery } from "react-query";

function GetAvatarById(userId) {
  const url = `${process.env.REACT_APP_API_BASE_URL}/users/${userId.id}/picture`;
  return useQuery(url, async () => {
    return await axios
      .get(url, { responseType: "blob" })
      .then((res) => URL.createObjectURL(res.data as any));
  });
}

export default GetAvatarById;
