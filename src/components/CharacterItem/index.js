import React from "react";

const CharacterItem = ({ characters }) => {
  return (
    <div>
      {characters.map((item, index) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CharacterItem;
