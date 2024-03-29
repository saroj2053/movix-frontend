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
        <div className="movieDetails__top">
          <div className="movieWrapper">
            {movie ? (
              <div key={movie.id} className="movie__front">
                <div className="movie__front-left">
                  <img
                    className="movieDetails__movieImage"
                    src={`${base_imageUrl}${movieImage}`}
                    alt={movie.title}
                  />
                </div>
                <div className="movie__front-right">
                  <h2 className="movieName">{movieName}</h2>
                  <p className="movieOverview">{movie.overview}</p>
                  <div className="movie__stats">
                    <div className="movie__stat">
                      <h4>Release Date</h4>
                      <p>{movieReleaseDate}</p>
                    </div>
                    <div className="movie__stat">
                      <h4>Rating</h4>
                      <p>{movie.vote_average}</p>
                    </div>
                    <div className="movie__stat">
                      <h4>Language</h4>
                      <p>{movie.original_language}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>No movie data available</p>
            )}
          </div>
        </div>

        <div className="movieDetails__bottom">
          <div className="movieSectionArea">
            <Youtube videoId={trailerUrl} opts={opts} />
          </div>
          <button className="wishlistBtn">Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
