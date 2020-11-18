import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const CharacterItem = ({ characters }) => {
  return characters.map((item) => {
    const id = item.id;
    return (
      <Link key={item.id} to={`/character/${id}`}>
        <div className="character-item">
          <img
            src={
              item.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                ? "https://terrigen-cdn-dev.marvel.com/content/prod/1x/default/explore-no-img.jpg"
                : `${item.thumbnail.path}.${item.thumbnail.extension}`
            }
            alt=""
          />
          <div>
            <p>{item.name}</p>
          </div>
        </div>
      </Link>
    );
  });
};

export default CharacterItem;
