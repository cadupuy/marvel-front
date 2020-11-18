import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import CharacterDetails from "../../components/CharacterDetails";
import "./index.css";
import axios from "axios";

const Character = ({ apiUrl }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/character/${id}`
        );
        setCharacter(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <Loader
      type="ThreeDots"
      color="#ED1F21"
      height={100}
      width={100}
      timeout={99999}
    />
  ) : (
    <section>
      <CharacterDetails character={character.results} />
    </section>
  );
};

export default Character;
