import React, { useEffect, useState } from "react";

import axios from "axios";
import "../assets/css/MovieRow.css";

import { slugify } from "../helpers/slugify";
import { useNavigate } from "react-router-dom";

const base_imageUrl = "https://image.tmdb.org/t/p/original/";

function MoviesRow({ title, fetchUrl, isLargeMovieRow }) {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const response = await axios.get(
        `https://api.themoviedb.org/3${fetchUrl}`
      );
      setMovies(response.data.results);
      return response;
    }
    getMovies();
  }, [fetchUrl]);

  const handleMovieClick = movie => {
    const movieName = movie.name || movie.title;
    navigate(`/movie/${slugify(movieName)}`, { state: { movie: movie } });
  };

  return (
    <div className="movieRow">
      <h1 className="movieRow__title">{title}</h1>
      <div className="movie__posters">
        {movies.map(movie => {
          return (
            <img
              className={`movie__poster ${
                isLargeMovieRow && "movie__posterLarge"
              }`}
              key={movie.id}
              src={`${base_imageUrl}${
                isLargeMovieRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title}
              onClick={() => handleMovieClick(movie)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MoviesRow;
