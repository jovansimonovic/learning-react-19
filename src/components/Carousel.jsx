import React from "react";
import { Link } from "react-router";

const Carousel = ({ genres }) => {
  return (
    <div className="flex flex-row items-center gap-x-2 overflow-x-scroll whitespace-nowrap hide-scrollbar">
      {genres.map((genre) => (
        <Link
          key={genre.id}
          to={`/discover/${genre.id}/${encodeURIComponent(genre.name)}`}
        >
          <span key={genre.id} className="genre-button text-white">
            {genre.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Carousel;
