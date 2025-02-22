import { useEffect, useState } from "react";
import Search from "../../components/Search.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import MovieCard from "../../components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "../../appwrite.js";
import { Link } from "react-router";
import Carousel from "../../components/Carousel.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // debounces the search term to prevent making too many API
  // requests by waiting the user to stop typing for 1000ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  // fetches movies from an API
  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
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

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      setError("Error fetching movies. Please try again later");
      console.error(`Error fetching movies: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // fetches genres from an API
  const fetchGenres = async () => {
    try {
      const endpoint = `${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch genres");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setGenres([]);
        setError(data.Error || "Failed to fetch genres");
        return;
      }

      setGenres(data.genres || []);
    } catch (error) {
      console.error(`Error fetching genres: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // fetches trending movies from database
  const fetchTrendingMovies = async () => {
    try {
      const trendingMovies = await getTrendingMovies();
      setTrendingMovies(trendingMovies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  // loads fetched movies on component mount
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // loads fetched trending movies and genres on component mount
  useEffect(() => {
    fetchGenres();
    fetchTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="mt-4 max-w-3xl mx-auto">
            <p className="text-white text-lg font-semibold mb-2">
              Or browse movies by desired genre:
            </p>
            <Carousel genres={genres} />
          </div>
        </header>
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <Link to={`/movie/${movie.movie_id}`}>
                    <img src={movie.poster_url} alt={movie.title} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="all-movies">
          <h2>All Movies</h2>
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
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
