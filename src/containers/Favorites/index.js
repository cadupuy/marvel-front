import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import CharacterItem from "../../components/CharacterItem";
import Banner from "../../components/Banner";
import "./index.css";

const Favorites = ({ apiUrl, favoriteCharacters }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001?page=1&name=`);
        setCharacters(response.data.data);
        console.log(characters);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

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
    <>
      <Banner
        title="MARVEL CHARACTERS"
        description="Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!"
        image={
          "https://terrigen-cdn-dev.marvel.com/content/prod/1x/characters_art_mas_dsk_01.jpg"
        }
      />

      <main>
        {characters.results.map((item) => {
          return (
            favoriteCharacters.includes(item.id) && (
              <div className="character-item">
                <div>
                  <img
                    src={
                      item.thumbnail.path ===
                      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                        ? "https://terrigen-cdn-dev.marvel.com/content/prod/1x/default/explore-no-img.jpg"
                        : `${item.thumbnail.path}.${item.thumbnail.extension}`
                    }
                    alt=""
                  />
                </div>
                <div className="content">
                  <p>{item.name}</p>
                </div>

                <div className="bottom-right"></div>
              </div>
            )
          );
        })}
        {favoriteCharacters}
      </main>
    </>
  );
};

export default Favorites;
