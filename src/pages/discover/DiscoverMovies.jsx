import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../components/Pagination";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const DiscoverMovies = () => {
  const { id: genreId, name: genreName } = useParams();

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetches movies by passed genre from an API
  const fetchMoviesByGenre = async (page) => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?with_genres=${genreId}&page=${page}&api_key=${API_KEY}`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error || "Failed to fetch movies");
        return;
      }

      setMovies(data.results || []);
      setCurrentPage(page);
    } catch (error) {
      setError("Error fetching movies. Please try again later");
      console.error(`Error fetching movies: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesByGenre(currentPage);
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <h1>
          Discover More <span className="text-gradient">{genreName}</span>{" "}
          Movies
        </h1>
        <section className="all-movies mt-8 w-full">
          {isLoading ? (
            <span className="flex justify-center">
              <LoadingSpinner />
            </span>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : movies.length === 0 ? (
            <p className="text-white text-3xl font-semibold text-center">
              No Movies Found
            </p>
          ) : (
            <>
              <ul>
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  if (page >= 1 && page <= totalPages) {
                    setCurrentPage(page);
                    fetchMoviesByGenre(page);
                  }
                }}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default DiscoverMovies;
