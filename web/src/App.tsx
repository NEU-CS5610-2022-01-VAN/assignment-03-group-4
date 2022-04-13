// import "./App.css";
import Home from "./pages/Home";
import Details from "./pages/Details";
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
        <Route path="/pages/Details" element={<Details />} />
        <Route path="/pages/Login" element={<Login />} />
        <Route path="/pages/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
