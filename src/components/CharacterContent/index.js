import React from "react";
import "./index.css";

const CharacterContent = ({ character, comics }) => {
  return (
    <section className="character-section">
      <div className="container">
        <div>
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
        <div>
          <div>
            <h2>{character.name}</h2>
            <p>{character.description}</p>
          </div>
          <div>
            {comics.map((item, index) => {
              return (
                <>
                  <img
                    src={item.thumbnail.path + "." + item.thumbnail.extension}
                    alt=""
                  />
                  <p>{item.title}</p>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharacterContent;
