import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/home/App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import MovieDetails from "./pages/details/MovieDetails.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
