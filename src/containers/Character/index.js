import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import CharacterPage from "../../components/CharacterContent";
import "./index.css";
import axios from "axios";

const Character = ({ apiUrl, token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState([]);
  const [comics, setComics] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/character/${id}`);

        const responseComics = await axios.get(
          `${apiUrl}/character/${id}/comics`
        );
        setComics(responseComics.data.data);
        setCharacter(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id, apiUrl]);

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
      <CharacterPage
        character={character.results[0]}
        comics={comics.results}
        token={token}
        apiUrl={apiUrl}
      />
    </section>
  );
};

export default Character;
