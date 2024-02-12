import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "../../assets/icons8-search-100.png";
import { URL } from "../../utils/constant";

const Header = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchQuery);

  const handleSearch = () => {
    fetch(`${URL}${searchQuery}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "SET_SEARCH_RESULTS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      });
  };

  return (
    <div className="search">
      <input
        type="text"
        value={searchQuery}
        placeholder="Search"
        onChange={(e) =>
          dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value })
        }
      />
      <button onClick={handleSearch} disabled={!searchQuery}>
        <img className="imga" src={SearchIcon} alt="Search" />
      </button>
    </div>
  );
};

export default Header;
