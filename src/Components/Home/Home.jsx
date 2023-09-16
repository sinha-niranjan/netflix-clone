import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";

import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apikey = "ce1c89f292349a348ae55dea8b0f3482";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => {
  return <img className="card" src={img} alt="cover" />;
};

const Row = ({ title, arr = [] }) => {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div>
        {arr.map((item, index) => (
          <Card key={index} img={imgUrl + item.poster_path} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

   

  let i = Math.floor(Math.random() * 20);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`);

      setUpcomingMovies(results);
    };

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apikey}`);

      setNowPlayingMovies(results);
    };

    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apikey}`);

      setPopularMovies(results);
    };

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`);
      setTopRatedMovies(results);
    };

    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`);

      setGenre(genres);
    };

    getAllGenre();
    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[i]
            ? `url(${`${imgUrl}/${popularMovies[i].poster_path}`})`
            : "rgb(16,16,16)",
        }}
      >
        {popularMovies[i] && <h1>{popularMovies[i]?.original_title}</h1>}

        {popularMovies[i] && <p>{popularMovies[i]?.overview}</p>}

        <div>
          <button>
            <BiPlay /> Play{" "}
          </button>
          <button>
            My List <AiOutlinePlus />
          </button>
        </div>
      </div>

      <Row title={"Upcoming Movies"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular "} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />

      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
