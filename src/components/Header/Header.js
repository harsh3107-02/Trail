import React from "react";
import logo from "../../assets/beer.png";
import Home from "../../assets/icons8-home-192.png";
import favoritly from "../../assets/icons8-favourite-144.png";
import { Link } from "react-router-dom";
import Search from "../search/search";
import { useDispatch } from "react-redux";
import "../../styles/header.css"
const Header = () => {
  const dispatch = useDispatch();
  const handleHomeClick = () => {
    dispatch({ type: "CLEAR_SEARCH_RESULTS" });
  };

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Beer Shop Logo" />
        <span>Saturday Sips</span>
      </div>
      <Search />
      <div className="favorite">
        <label for="favoriteBox">
          <Link to="/" onClick={handleHomeClick}>
            <img className="imgs" src={Home} alt="Home Logo" />
          </Link>
          <Link to="/favourite">
            <img className="imgs" src={favoritly} alt="Saved Logo" />
          </Link>
        </label>
      </div>
    </header>
  );
};

export default Header;
