import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const CharacterContent = ({ character, comics, token }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteUpdate, setfavoriteUpdate] = useState([]);

  const handleClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/user/favorites/update`,
        {
          favoriteCharacter: character.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setfavoriteUpdate(response.data.favorites.favoriteCharacters);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/user/favorites`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFavorites(response.data.favorites.favoriteCharacters);
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchData();
    }
  }, [favoriteUpdate, token]);

  return (
    <>
      <div>
        <div>
          <div className="character-details">
            <div>
              <h3>ESSENTIAL READING</h3>
            </div>

            <h2>{character.name}</h2>
            <p className="description">{character.description}</p>

            {favorites.indexOf(character.id) !== -1 ? (
              <button className="favorited" onClick={handleClick}>
                FAVORITED
              </button>
            ) : (
              <button onClick={handleClick}>ADD TO FAVORITES</button>
            )}
          </div>
        </div>
        <div className="character-image">
          <img
            src={
              character.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                ? "https://terrigen-cdn-dev.marvel.com/content/prod/1x/default/explore-no-img.jpg"
                : `${character.thumbnail.path}.${character.thumbnail.extension}`
            }
            alt=""
          />
        </div>
      </div>

      <div className="character-comics">
        <div className="container">
          {comics.map((item, index) => {
            return (
              <div key={index} className="comic-item">
                <img
                  className="comic-img"
                  src={item.thumbnail.path + "." + item.thumbnail.extension}
                  alt=""
                />
                <div>
                  <p>{item.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CharacterContent;
