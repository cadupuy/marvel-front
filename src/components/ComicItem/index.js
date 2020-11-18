import React from "react";
import "./index.css";

const ComicItem = ({ comics }) => {
  console.log(comics);

  return comics.map((item) => {
    return (
      <div key={item.id} className="comic-item">
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
          <p>{item.title}</p>
        </div>
      </div>
    );
  });
};

export default ComicItem;
