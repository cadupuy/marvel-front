import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import CharacterItem from "../../components/CharacterItem";
import Banner from "../../components/Banner";
import SearchBar from "../../components/SearchCharacter";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Home = ({ apiUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchCharacter, setSearchCharacter] = useState("");
  const [characters, setCharacters] = useState([]);
  const [pageMax, setPageMax] = useState(0);
  const [page, setPage] = useState(1);
  const tab = [];
  const limit = 100;

  const renderPages = () => {
    for (let i = 1; i <= pageMax; i++) {
      tab.push(
        <span
          className={i === page && "active-page"}
          onClick={() => {
            setPage(i);
          }}
        >
          {i}
        </span>
      );
    }
    return tab;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001?page=${page}&name=${searchCharacter}`
        );
        setCharacters(response.data.data);
        setPageMax(Math.ceil(Number(response.data.data.total) / limit));

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [page, searchCharacter]);

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
        title="MARVEL CHARACTERS"
        description="Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!"
        image={
          "https://terrigen-cdn-dev.marvel.com/content/prod/1x/characters_art_mas_dsk_01.jpg"
        }
      />

      <main>
        <div className="main-navigation">
          <h2>MARVEL CHARACTERS LIST</h2>
          <div>
            <SearchBar
              searchCharacter={searchCharacter}
              setSearchCharacter={setSearchCharacter}
            />
          </div>
          <div>
            <p>{characters.total} RESULTS</p>
            <p>SORT BY A-Z</p>
          </div>
        </div>
        <section className="characters-section">
          <CharacterItem characters={characters.results} />
        </section>

        <div className="pages">
          <FontAwesomeIcon
            className={page === 1 ? "display-none" : ""}
            onClick={() => {
              if (page > 1) {
                setIsLoading(true);

                setPage(page - 1);
              }
            }}
            icon={faChevronLeft}
          />
          {renderPages()}

          <FontAwesomeIcon
            className={page === pageMax ? "display-none" : ""}
            onClick={() => {
              if (page < pageMax) {
                setPage(page + 1);
              }
            }}
            icon={faChevronRight}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
