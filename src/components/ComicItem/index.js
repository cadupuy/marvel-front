import React from "react";
import "./index.css";

const ComicItem = ({ comics }) => {
  return comics.map((item) => {
    return (
      <div className="comic-item">
        <img
          src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
          alt=""
        />
        <div>
          <p>{item.title}</p>
        </div>
      </div>
    );
  });
};

export default ComicItem;
