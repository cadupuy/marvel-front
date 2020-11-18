import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import CharacterItem from "../../components/CharacterItem";
import "./index.css";

const Home = ({ apiUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  //   Number of results per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/");
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
      type="ThreeDots"
      color="#ED1F21"
      height={100}
      width={100}
      timeout={99999}
    />
  ) : (
    <section className="characters-section">
      <CharacterItem characters={characters.results} />
    </section>
  );
};

export default Home;
