import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import { AuthTokenProvider } from "./components/AuthTokenContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const requestedScopes = [
  "read:current_user",
  "update:current_user_metadata",
  "read:recipes",
  "write:recipes",
  "edit:recipes",
  "delete:recipes",
  "read:categories",
  "write:categories",
  "edit:categories",
  "delete:categories",
  "read:reviews",
  "write:reviews",
  "edit:reviews",
  "delete:reviews",
  "read:users",
  "write:users",
  "edit:users",
  "delete:users",
];

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN || ""}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ""}
      redirectUri={`${window.location.origin}/verify-user`}
      audience={process.env.REACT_APP_AUTH0_API_AUDIENCE || ""}
      scope={requestedScopes.join(" ")}
    >
      <AuthTokenProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthTokenProvider>
    </Auth0Provider>
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
