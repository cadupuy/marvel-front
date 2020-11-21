import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import Banner from "../../components/Banner";
import { Link } from "react-router-dom";
import "./index.css";

const Favorites = ({ apiUrl, token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${apiUrl}/user/favorites`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const responseCharacters = await axios.get(`${apiUrl}?page=1&name=`);

          setCharacters(responseCharacters.data.data);
          setFavorites(response.data.favorites);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    fetchData();
  }, [token]);

  console.log(favorites.favoriteCharacters);
  return isLoading ? (
    <div className="loading">
      <Loader
        type="Bars"
        color="#ED1F21"
        height={100}
        width={100}
        timeout={99999}
      />
    </div>
  ) : (
    <>
      <Banner
        title="MY FAVORITES"
        description="Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!"
        image={
          "https://terrigen-cdn-dev.marvel.com/content/prod/1x/characters_art_mas_dsk_01.jpg"
        }
      />
      <main>
        <div className="section-title">
          <h2>FAVORITE CHARACTERS</h2>
        </div>

        <section className="characters-section favorites">
          {characters.results.map((item) => {
            const id = item.id;
            return (
              favorites.favoriteCharacters.indexOf(item.id) !== -1 && (
                <Link key={item.id} to={`/character/${id}`}>
                  <div className="character-item">
                    <div>
                      <img
                        src={
                          item.thumbnail.path ===
                          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                            ? "https://terrigen-cdn-dev.marvel.com/content/prod/1x/default/explore-no-img.jpg"
                            : `${item.thumbnail.path}.${item.thumbnail.extension}`
                        }
                        alt=""
                      />
                    </div>
                    <div className="content">
                      <p>{item.name}</p>
                      <div className="red"></div>
                    </div>

                    <div className="bottom-right"></div>
                  </div>
                </Link>
              )
            );
          })}
        </section>
      </main>
    </>
  );
};

export default Favorites;
