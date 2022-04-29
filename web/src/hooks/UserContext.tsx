import { useContext, createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const UserContext = createContext({} as any);

const defaultPicture =
  "https://media.istockphoto.com/vectors/user-profile-icon-vector-avatar-portrait-symbol-flat-shape-person-vector-id1270368615?k=20&m=1270368615&s=170667a&w=0&h=qpvA8Z6L164ZcKfIyOl-E8fKnfmRZ09Tks7WEoiLawA=";

function UserContextProvider({ children }) {
  const { user: auth0User, isAuthenticated } = useAuth0();
  const [user, setUser] = useState();
  const [userPicture, setUserPicture] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const value = { user, userPicture, isAuthenticated, isLoading };

  useEffect(() => {
    const getUserFromApi = async () => {
      try {
        setIsLoading(true);
        const userId = (auth0User as any).sub;
        const url = `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`;
        const currentUser = await axios.get(url).then((res) => res.data);
        setUser(currentUser);

        if ((currentUser as any).picture !== undefined) {
          const pictureUrl = `${process.env.REACT_APP_API_BASE_URL}/users/${userId}/picture`;
          const currentUserPicture = await axios
            .get(pictureUrl, { responseType: "blob" })
            .then((res) => URL.createObjectURL(res.data as any));
          setUserPicture(currentUserPicture);
        }

        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    // const getUserPictureFromApi = async () => {
    //   try {
    //     console.log("====================================");
    //     console.log(user);
    //     console.log("====================================");
    //     const userId = (auth0User as any).sub;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    if (isAuthenticated) {
      getUserFromApi();
    }
  }, [auth0User, isAuthenticated]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserContextProvider };
