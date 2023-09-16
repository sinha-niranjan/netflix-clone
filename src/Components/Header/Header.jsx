import React from "react";
import "./Header.scss";
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import {ImSearch} from "react-icons/im"

const Header = () => {
  return (
    <nav className="header">
      <img src={logo} alt="logo" />

      <div>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/movies">Movie</Link>
        <Link to="/recent">Recently added</Link>
        <Link to="/mylist">My List</Link>
      </div>
      <ImSearch />
    </nav>
  );
};

export default Header;
