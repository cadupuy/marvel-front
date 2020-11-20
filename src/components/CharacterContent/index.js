import React, { useState } from "react";
import "./index.css";

import Cookies from "js-cookie";

const CharacterContent = ({
  character,
  comics,
  favoriteCharacter,
  favoriteCharacters,
  setFavoriteCharacters,
}) => {
  const handleClick = () => {
    if (favoriteCharacters.indexOf(character.id) === -1) {
      favoriteCharacter(character.id);
    } else {
      let index = favoriteCharacters.indexOf(character.id);
      const newTab = [...favoriteCharacters];
      newTab.splice(index, 1);
      setFavoriteCharacters(newTab);
      Cookies.set("characters", newTab, { expires: 7 });
    }
  };

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
            <button onClick={handleClick}>ADD TO FAVORITES </button>
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
              <div className="comic-item">
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
