import React from "react";

const ComicItem = ({ comics }) => {
  console.log(comics);

  return (
    <div>
      {comics.map((item, index) => {
        return (
          <div key={item.id}>
            <p>{item.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ComicItem;
