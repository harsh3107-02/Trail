import React, { useState, useEffect } from 'react';
import Card from './Card';
import Shimmer from '../shimmer/shimmer';
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from '../../redux/store';
import Saved from '../../assets/icons8-star.gif';
import R_Saved from '../../assets/icons8-star-48.png';
import useAllBeerList from '../../utils/useAllBeerList';

const Body = () => {
  const dispatch = useDispatch();
  const [beers, setBeers] = useAllBeerList();
  const searchResults = useSelector((state) => state.searchResults);
  const cart = useSelector((state) => state.cart);
  const [starStates, setStarStates] = useState({});

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('CartItems')) || [];
    const starStatesCopy = { ...starStates };
    cartItems.forEach((item) => {
      starStatesCopy[item.id] = true;
    });
    setStarStates(starStatesCopy);
  }, []);

  const toggleStar = (beer) => {
    if (starStates[beer.id]) {
      dispatch(removeFromCart(beer));
      removeItemFromLocalStorage(beer);
    } else {
      dispatch(addToCart(beer));
      addItemToLocalStorage(beer);
    }
    setStarStates((prevStates) => ({
      ...prevStates,
      [beer.id]: !prevStates[beer.id],
    }));
  };

  const addItemToLocalStorage = (item) => {
    let cartItems = JSON.parse(localStorage.getItem('CartItems')) || [];
    cartItems.push(item);
    localStorage.setItem('CartItems', JSON.stringify(cartItems));
  };

  const removeItemFromLocalStorage = (item) => {
    let cartItems = JSON.parse(localStorage.getItem('CartItems')) || [];
    cartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    localStorage.setItem('CartItems', JSON.stringify(cartItems));
  };

  return beers.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="container">
      {searchResults.length === 0 ? (
        beers.map((beer) => (
          <div className="ffd" key={beer.id} style={{ position: 'relative' }}>
            <Card
              name={beer.name}
              tagline={beer.tagline}
              description={beer.description}
              imageUrl={beer.image_url}
            />
            <button
              className="star-button"
              onClick={() => toggleStar(beer)}
              style={{ position: 'absolute', top: '18px', right: '18px', backgroundColor: 'hsl(353, 42%, 32%)' }}
            >
              {starStates[beer.id] ? <img src={Saved} alt="star" /> : <img src={R_Saved} alt="empty-star" />}
            </button>
          </div>
        ))
      ) : (
        searchResults.map((beer) => (
          <div className="ffd" key={beer.id}>
            <Card
              name={beer.name}
              tagline={beer.tagline}
              description={beer.description}
              imageUrl={beer.image_url}
            />
            <button onClick={() => toggleStar(beer)} style={{ position: 'relative', top: '-368px', left: '385px', backgroundColor: 'hsl(353, 42%, 32%)' }}>
              {starStates[beer.id] ? <img src={Saved} alt="star" /> : <img src={R_Saved} alt="empty-star" />}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Body;
