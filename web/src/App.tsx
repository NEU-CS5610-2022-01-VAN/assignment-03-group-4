// import "./App.css";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";

// import React from 'react'

// Font Awesome Style Sheet
import "@fortawesome/fontawesome-free/css/all.min.css";

// Tailwind CSS Style Sheet
import "./assets/styles/tailwind.css";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />}>
          <Route path=":userId" element={<Profile />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
