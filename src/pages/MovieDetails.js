import React, { useState } from "react";
import "../assets/css/MovieDetails.css";
import { useLocation } from "react-router-dom";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_imageUrl = "https://image.tmdb.org/t/p/original/";
const MovieDetails = () => {
  const location = useLocation();

  const { movie } = location.state || {};

  const movieName = movie?.name || movie?.title;
  const movieImage = movie?.poster_path || movie?.backdrop_path;
  const movieReleaseDate = movie?.first_air_date || movie?.release_date;

  const [trailerUrl, setTrailerUrl] = useState("");

  movieTrailer(movieName)
    .then(url => {
      const urlParams = new URLSearchParams(new URL(url).search);
      const videoUrl = urlParams.get("v");
      setTrailerUrl(videoUrl);
    })
    .catch(error => {
      console.log(error);
    });

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  console.log(trailerUrl);
  return (
    <div className="movieDetails">
      <div className="movieDetails__contents">
        <div className="movieWrapper">
          {movie ? (
            <div key={movie.id}>
              <img
                className="movieDetails__movieImage"
                src={`${base_imageUrl}${movieImage}`}
                alt={movie.title}
              />
              <h2 className="movieName">{movieName}</h2>
              <p className="movieOverview">{movie.overview}</p>
              <p className="small">Release Date: {movieReleaseDate}</p>
              <p className="small">Rating: {movie.vote_average}</p>
              <p className="small">Language: {movie.original_language}</p>
            </div>
          ) : (
            <p>No movie data available</p>
          )}
        </div>
        <div className="movieSectionArea">
          <Youtube videoId={trailerUrl} opts={opts} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
