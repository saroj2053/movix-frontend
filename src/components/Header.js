import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api";
import "../assets/css/Header.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

function Header() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function getSingleMovie() {
      const response = await axios.get(
        `https://api.themoviedb.org/3${api.fetchMovixOriginals}`
      );
      const movies = response.data.results;
      setMovie(
        movies[Math.floor(Math.random() * response.data.results.length - 1)]
      );
      return response;
    }
    getSingleMovie();
  }, []);

  function getFirstNCharacters(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handleClick = movie => {
    const movieName = movie?.name || movie?.title;

    movieTrailer(movieName || "")
      .then(url => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch(err => console.log(err));
  };

  const resetMovieClick = () => {
    setTrailerUrl("");
  };

  const opts = {
    height: "500",
    width: "100%",
    zIndex: "55",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <header
        className="header"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
          backgroundPosition: "center center",
        }}
        onClick={resetMovieClick}
      >
        <div className="header__contents">
          <h1 className="header__title">{movie?.name || movie?.title}</h1>
          <div className="header__buttons">
            <button
              className="header__button"
              onClick={() => handleClick(movie)}
            >
              Play
            </button>
            <button className="header__button">My List</button>
          </div>
          <h1 className="header__description">
            {getFirstNCharacters(movie?.overview, 150)}
          </h1>
        </div>
        <div className="header--fadeBottom"></div>
      </header>
      <div
        style={{
          zIndex: "10",
          width: "50%",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
      </div>
    </>
  );
}

export default Header;
