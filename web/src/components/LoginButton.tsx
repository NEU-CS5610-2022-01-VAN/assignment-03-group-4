import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = ({ children }) => {
  const { loginWithRedirect } = useAuth0();

  return <button style={{width: "100%"}} onClick={() => loginWithRedirect()}>{children}</button>;
};

export default LoginButton;
