import axios from "axios";
import { useQuery } from "react-query";

const GetAvatarById =  (userId) => {

    const pictureUrl = `${process.env.REACT_APP_API_BASE_URL}/users/${userId}/picture`;
    return useQuery(pictureUrl, async () => {
        return await axios.get(pictureUrl, { responseType: "blob" }).then((res) => URL.createObjectURL(res.data as any));
    });

};

export default GetAvatarById;
