import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import CharacterPage from "../../components/CharacterContent";
import "./index.css";
import axios from "axios";

const Character = ({ apiUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState([]);
  const [comics, setComics] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/character/${id}`
        );

        const responseComics = await axios.get(
          `http://localhost:3001/character/${id}/comics`
        );
        setComics(responseComics.data.data);
        setCharacter(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <div className="loading">
      <Loader
        type="Bars"
        color="#ED1F21"
        height={100}
        width={100}
        timeout={99999}
      />
    </div>
  ) : (
    <section className="character-section">
      <CharacterPage character={character.results[0]} comics={comics.results} />
    </section>
  );
};

export default Character;
