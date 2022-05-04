import axios from "axios";
import React from "react";
import { useContext, createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = createContext<IUserContext>({
  isAuthenticated: false,
  isLoading: false,
});

type Props = { children: React.ReactNode };

const UserContextProvider = ({ children }: Props): JSX.Element => {
  const { user: auth0User, isAuthenticated }: IUseAuth0 = useAuth0();
  const [user, setUser] = useState<IUser>();
  const [userPicture, setUserPicture] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const value = { user, userPicture, isAuthenticated, isLoading };

  useEffect(() => {
    const getUserFromApi = async () => {
      try {
        if (auth0User !== undefined) {
          setIsLoading(true);

          const userId = auth0User.sub;
          const url = `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`;
          const currentUser = await axios.get(url).then((res) => res.data);
          setUser(currentUser);

          if (currentUser.picture !== undefined) {
            const pictureUrl = `${process.env.REACT_APP_API_BASE_URL}/users/${userId}/picture`;
            const currentUserPicture = await axios
              .get(pictureUrl, { responseType: "blob" })
              .then((res) => URL.createObjectURL(res.data));
            setUserPicture(currentUserPicture);
          }

          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (isAuthenticated) {
      getUserFromApi();
    }
  }, [auth0User, isAuthenticated]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserContextProvider };
