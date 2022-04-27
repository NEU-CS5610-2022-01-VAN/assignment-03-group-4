import { useContext, createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const UserContext = createContext({} as any);

function UserContextProvider({ children }) {
  const { user: auth0User, isAuthenticated } = useAuth0();
  const [user, setUser] = useState();
  const value = { user };

  useEffect(() => {
    const getUserFromApi = async () => {
      try {
        const url = `${process.env.REACT_APP_API_BASE_URL}/users/${
          (auth0User as any).sub
        }`;
        const currentUser = await axios.get(url).then((res) => res.data);
        setUser(currentUser as any);
      } catch (err) {
        console.log(err);
      }
    };

    if (isAuthenticated) {
      getUserFromApi();
    }
  }, [auth0User, isAuthenticated]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserContextProvider };
