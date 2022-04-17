import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// Font Awesome Style Sheet
import "@fortawesome/fontawesome-free/css/all.min.css";

// Tailwind CSS Style Sheet
import "./assets/styles/tailwind.css";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

import TopNavbar from "./components/TopNavbar";
import NewRecipe from "./pages/NewRecipe";
import RecipeDetail from "./pages/RecipeDetail";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Profile from "./pages/Profile";

function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

function App() {
  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      <Routes>
        <Route path="/" element={<LayoutsWithNavbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />}></Route>
          <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
          <Route path="/profile" element={<Profile />}>
            <Route path=":userId" element={<Profile />} />
          </Route>
          <Route
            path="/newrecipe"
            element={
              <RequireAuth>
                <NewRecipe />
              </RequireAuth>
            }
          />
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

      {process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_MODE
        : process.env.REACT_APP_PRO_MODE}
    </div>
  );
}

function LayoutsWithNavbar() {
  return (
    <>
      <TopNavbar />
      <Outlet />
    </>
  );
}

export default App;
