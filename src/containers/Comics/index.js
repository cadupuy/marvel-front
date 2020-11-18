import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import ComicItem from "../../components/ComicItem";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/comics`);
        setComics(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <Loader
      type="Oval"
      color="#09aeb8"
      height={100}
      width={100}
      timeout={99999}
    />
  ) : (
    <section>
      <ComicItem comics={comics.results} />
    </section>
  );
};

export default Characters;
