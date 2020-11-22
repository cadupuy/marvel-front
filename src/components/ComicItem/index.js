import React from "react";
import "./index.css";

const ComicItem = ({ comics }) => {
  return (
    <div className="comic-item">
      <img
        src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
        alt=""
      />
      <div>
        <p>{comics.title}</p>
      </div>
    </div>
  );
};

export default ComicItem;
