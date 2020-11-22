import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import Banner from "../../components/Banner";
import CharacterItem from "../../components/CharacterItem";
import "./index.css";

const Favorites = ({ apiUrl, token }) => {
  const [isLoading, setIsLoading] = useState(true);
  // Return all favorites for one user from DB
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${apiUrl}/user/favorites`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setFavorites(response.data.favorites.favoriteCharacters);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchData();
  }, [token, apiUrl]);

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
  ) : favorites.length === 0 ? (
    <div className="empty-favorites">
      <div className="container">
        <div>
          <h2>OÙ SONT LES HÉROS ?</h2>
          <h3>Vous n'avez encore aucun favori...</h3>
          <p>
            Rendez-vous dans la sections comics et sur les pages des personnages
            afin de pouvoir enregistrer vos préférences. Tous vos favoris
            apparaîtront sur cette page.
          </p>
        </div>
        <div>
          <img
            src="https://i.annihil.us/u/prod/marvel/html_pages_assets/error-pages/prod/iron-man-char.72fe5e86.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  ) : (
    <>
      <Banner
        title="MY FAVORITES"
        description="Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!"
      />
      <main>
        <div className="favorite-title">
          <h2>FAVORITE CHARACTERS</h2>
        </div>

        <section className="characters-section favorites">
          {favorites.map((item) => {
            return <CharacterItem key={item[0].id} item={item[0]} />;
          })}
        </section>
      </main>
    </>
  );
};

export default Favorites;
