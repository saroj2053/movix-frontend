import React, { useContext } from "react";
import MovieRow from "../components/MovieRow";
import Header from "../components/Header";
import api from "../api";
import "../assets/css/Home.css";
import UserContext from "../context/UserContext";

const Home = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="home">
      <Header />
      <MovieRow
        title="Movix Originals"
        fetchUrl={api.fetchMovixOriginals}
        isLargeMovieRow={true}
      />
      <MovieRow title="Trending Now" fetchUrl={api.fetchTrending} />
      <MovieRow title="Top Rated" fetchUrl={api.fetchTopRated} />
      <MovieRow title="Action Movies" fetchUrl={api.fetchActionMovies} />
      <MovieRow title="Comedy Movies" fetchUrl={api.fetchComedyMovies} />
      <MovieRow title="Horror Movies" fetchUrl={api.fetchHorrorMovies} />
      <MovieRow title="Romance Movies" fetchUrl={api.fetchRomanceMovies} />
      <MovieRow title="Documentaries" fetchUrl={api.fetchDocumentaries} />
    </div>
  );
};

export default Home;
