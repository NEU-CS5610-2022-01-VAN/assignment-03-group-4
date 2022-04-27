import { Routes, Route, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ScrollToTop from "./hooks/ScrollToTop";
// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";

// Font Awesome Style Sheet
import "@fortawesome/fontawesome-free/css/all.min.css";

// Tailwind CSS Style Sheet
import "./assets/styles/tailwind.css";

import TopNavbar from "./navbars/TopNavbar";
import { AuthTokenProvider } from "./hooks/AuthTokenContext";
import NewRecipe from "./pages/NewRecipe";
import RecipeDetail from "./pages/RecipeDetail";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import VerifyUser from "./pages/VerifyUser";
import SearchPage from "./pages/SearchPage";
import Category from "./pages/Category";
import Footer from "./components/Footer";
import { UserContextProvider } from "./hooks/UserContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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

function RequireAuth({ children }) {
<<<<<<< HEAD
  const { isAuthenticated, isLoading,loginWithRedirect } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    // return <Navigate to="/profile" replace />;
=======
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && !isAuthenticated) {
>>>>>>> main
    return loginWithRedirect();
  }

  return children;
}

function App() {
  return (
    <div className="app">
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <QueryClientProvider client={queryClient}>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN || ""}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ""}
          redirectUri={`${window.location.origin}/verify-user`}
          audience={process.env.REACT_APP_AUTH0_API_AUDIENCE || ""}
          scope={requestedScopes.join(" ")}
        >
          <AuthTokenProvider>
            <UserContextProvider>
              <AppRouter />
            </UserContextProvider>
          </AuthTokenProvider>
        </Auth0Provider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>

      {process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_MODE
        : process.env.REACT_APP_PRO_MODE}
    </div>
  );
}

function LayoutsWithNavbar() {
  return (
    <>
      <div className="w-full z-20">
        <TopNavbar />
      </div>
      <Outlet />
      <Footer />
    </>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop></ScrollToTop>

      <Routes>
        <Route path="/" element={<LayoutsWithNavbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />}>
            <Route path="/search/:keyword" element={<SearchPage />} />
          </Route>
          <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
          <Route path="/profile" element={<Profile />}>
            <Route path=":userId" element={<Profile />} />
          </Route>
          <Route path="/categories/:categoryId" element={<Category />} />
          <Route
            path="/newrecipe"
            element={
              <RequireAuth>
                <NewRecipe />
              </RequireAuth>
            }
          />
          <Route path="/verify-user" element={<VerifyUser />} />

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
