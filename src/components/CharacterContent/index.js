import React, { useEffect, useState } from "react";
import axios from "axios";
import ComicItem from "../../components/ComicItem";
import "./index.css";

const CharacterContent = ({ character, comics, token, apiUrl }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteUpdate, setfavoriteUpdate] = useState([]);

  const handleClick = async () => {
    if (token) {
      try {
        const response = await axios.post(
          `${apiUrl}/user/favorites/update`,
          {
            favoriteCharacter: [
              {
                id: character.id,
                name: character.name,
                description: character.description,
                thumbnail: {
                  path: character.thumbnail.path,
                  extension: character.thumbnail.extension,
                },
              },
            ],
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
    }
  };

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${apiUrl}/user/favorites`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setFavorites(response.data.favorites.favoriteCharacters);
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchData();
    }
  }, [favoriteUpdate, token, apiUrl]);

  let isFavorite = false;

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

            {favorites.map((item, index) => {
              return (
                item[0].id === character.id &&
                token && (
                  <div key={index}>
                    {(isFavorite = true)}
                    <button className="favorited" onClick={handleClick}>
                      FAVORITED
                    </button>
                  </div>
                )
              );
            })}

            {!isFavorite && (
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
          {comics.map((item) => {
            return <ComicItem key={item.id} comics={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default CharacterContent;
