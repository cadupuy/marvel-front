import React from "react";
import "./index.css";

const index = ({ title, description }) => {
  return (
    <div className="character-banner">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default index;
