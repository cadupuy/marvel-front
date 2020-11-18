import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import CharacterItem from "../../components/CharacterItem";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  //   Number of results per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/`);
        setCharacters(response.data.data);
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
      <CharacterItem characters={characters.results} />
    </section>
  );
};

export default Home;
