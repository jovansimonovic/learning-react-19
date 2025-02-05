import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner";
import { formatDate } from "../../utils";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetails = () => {
  const movieId = useParams().id;

  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetches movie details
  const fetchMovieDetails = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const data = await response.json();

      if (data.Response === "False") {
        setMovieDetails({});
        setError(data.Error || "Failed to fetch movie details");
        return;
      }

      setMovieDetails(data);
    } catch (error) {
      setError("Error fetching movie details. Please try again later");
      console.error(`Error fetching movie details: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // loads fetches movie details on component mount
  useEffect(() => {
    fetchMovieDetails();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper !py-0">
        {isLoading ? (
          <section>
            <div className="h-dvh flex justify-center items-center">
              <LoadingSpinner />
            </div>
          </section>
        ) : error ? (
          <section>
            <div className="h-dvh flex flex-col justify-center items-center">
              <p className="error-message mb-8">{error}</p>
              <Link to={"/"}>
                <button
                  type="button"
                  className="bg-indigo-700 py-2 px-4 rounded text-white font-semibold cursor-pointer hover:bg-indigo-800"
                >
                  Go Back
                </button>
              </Link>
            </div>
          </section>
        ) : (
          <section className="py-12 md:flex md:gap-x-8">
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                  : "/no-movie.png"
              }
              alt={movieDetails.title}
              className="max-w-[350px] mx-auto md:mx-0 rounded-lg"
            />
            <div className="mt-4 md:mt-0 text-white">
              <h2 className="text-4xl font-bold mb-1">{movieDetails.title}</h2>
              <h3 className="text-2xl font-semibold mb-6">
                {movieDetails.tagline}
              </h3>
              <p className="text-justify text-lg mb-4">
                {movieDetails.overview}
              </p>
              <div className="mb-4 text-xl font-semibold flex flex-row gap-x-2 flex-wrap">
                <img src="/star.svg" alt="Star Icon" />
                <p> {movieDetails?.vote_average?.toFixed(1)}</p>
                <span>•</span>
                <p> {movieDetails.vote_count} votes</p>
                <span>•</span>
                <p> {movieDetails.runtime} minutes</p>
                <span>•</span>
                <p> {formatDate(movieDetails.release_date)}</p>
              </div>
              <div className="mb-4">
                <span className="text-2xl font-semibold">Directed by:</span>
                <div className="flex flex-col">
                  {movieDetails.production_companies?.map((company) => (
                    <span key={company.id} className="text-lg">
                      {company.name}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-2xl font-semibold">Genres:</span>
              <div className="flex flex-row gap-2 flex-wrap mt-2">
                {movieDetails.genres?.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/discover/${genre.id}/${encodeURIComponent(
                      genre.name
                    )}`}
                  >
                    <span className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-full inline-flex">
                      {genre.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default MovieDetails;
