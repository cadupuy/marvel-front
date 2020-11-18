import React from "react";

const CharacterDetails = ({ character }) => {
  console.log(character);
  return <div>{character[0].name}</div>;
};

export default CharacterDetails;
