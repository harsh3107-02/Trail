import React, { useState,useEffect } from 'react'
const useAllBeerList=()=> {
    const [beers, setBeers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
  
    const handelInfiniteScroll = async () => {
      try {
        if (
          window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
        ) {
          setLoading(true);
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setTimeout(async () => {
            const response = await fetch(
              `https://api.punkapi.com/v2/beers?page=${page}&per_page=80`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await response.json();
  
            setBeers((prev) => [...prev, ...data]);
            setLoading(false);
          }, 400);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [page]);
  
    useEffect(() => {
      window.addEventListener("scroll", handelInfiniteScroll);
      return () => window.removeEventListener("scroll", handelInfiniteScroll);
    }, []);
    return [beers]
}

export default useAllBeerList