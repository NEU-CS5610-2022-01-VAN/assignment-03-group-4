import { useContext, createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const UserContext = createContext({} as any);

function UserContextProvider({ children }) {
  const { user: auth0User, isAuthenticated } = useAuth0();
  const [user, setUser] = useState();
  const [userPicture, setUserPicture] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const value = { user, userPicture, isAuthenticated, isLoading };

  useEffect(() => {
    const getUserFromApi = async () => {
      try {
        const userId = (auth0User as any).sub;
        const url = `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`;
        const currentUser = await axios.get(url).then((res) => res.data);
        setUser(currentUser as any);
      } catch (err) {
        console.log(err);
      }
    };

    const getUserPictureFromApi = async () => {
      try {
        const userId = (auth0User as any).sub;
        const pictureUrl = `${process.env.REACT_APP_API_BASE_URL}/users/${userId}/picture`;
        const currentUserPicture = await axios
          .get(pictureUrl, { responseType: "blob" })
          .then((res) => URL.createObjectURL(res.data as any));
        setUserPicture(currentUserPicture);
      } catch (err) {
        console.log(err);
      }
    };

    if (isAuthenticated) {
      setIsLoading(true);
      getUserFromApi();
      getUserPictureFromApi();
      setIsLoading(false);
    }
  }, [auth0User, isAuthenticated]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserContextProvider };
