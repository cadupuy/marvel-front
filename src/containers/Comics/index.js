import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import ComicItem from "../../components/ComicItem";
import "./index.css";

const Characters = ({ apiUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}comics`);
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
      color="#ED1F21"
      height={100}
      width={100}
      timeout={99999}
    />
  ) : (
    <section className="comics-section">
      <ComicItem comics={comics.results} />
    </section>
  );
};

export default Characters;
