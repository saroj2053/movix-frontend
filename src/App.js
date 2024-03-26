import React from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import MovieDetails from "./pages/MovieDetails";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Error from "./pages/Error";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/home"
            exact
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/" exact element={<Landing />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route
            path="/profile"
            exact
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie/:name"
            exact
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />

          <Route path="/*" exact element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
