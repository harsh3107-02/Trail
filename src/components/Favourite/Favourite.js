import React, { useState, useEffect } from 'react';
import Card from '../Body/Card';
import Saved from '../../assets/icons8-star.gif'
import R_Saved from '../../assets/icons8-star-48.png'

const Favourite = () => {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    // Fetch data from local storage when the component mounts
    const storedBeers = JSON.parse(localStorage.getItem('favouriteBeers')) || [];
    setBeers(storedBeers);
  }, []);

  const toggleStar = (beer) => {
    // Remove the selected beer from the local storage
    const updatedBeers = beers.filter(item => item.id !== beer.id);
    localStorage.setItem('favouriteBeers', JSON.stringify(updatedBeers));
    setBeers(updatedBeers);
  }

  return beers.length === 0 ? (
    <h1>Nothing to show</h1>
  ) : (
    <div className='container'>
      {beers.map(beer => (
        <div className="ffd" key={beer.id}>
          <Card
            name={beer.name}
            tagline={beer.tagline}
            description={beer.description}
            imageUrl={beer.image_url}
          />
          <button onClick={() => toggleStar(beer)} style={{ position: 'relative', top: '-368px', left: '385px', backgroundColor: 'hsl(353, 42%, 32%)' }}>
            <img src={Saved} alt="star" />
          </button>
        </div>
      ))}
    </div>
  )
};

export default Favourite;
