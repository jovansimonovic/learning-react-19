import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/home/App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import MovieDetails from "./pages/details/MovieDetails.jsx";
import DiscoverMovies from "./pages/discover/DiscoverMovies.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="movie/:id" element={<MovieDetails />} />
        <Route path="discover/:id/:name" element={<DiscoverMovies />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
