import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import CharacterItem from "../../components/CharacterItem";
import Banner from "../../components/Banner";
import SearchBar from "../../components/SearchCharacter";
import "./index.css";
import ReactPaginate from "react-paginate";

const Home = ({ apiUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchCharacter, setSearchCharacter] = useState("");
  const [characters, setCharacters] = useState([]);
  const [pageMax, setPageMax] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 100;

  const handlePageClick = (event) => {
    console.log(event);
    setPage(event.selected + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}?page=${page}&name=${searchCharacter}`
        );
        setCharacters(response.data.data);
        setPageMax(Math.ceil(Number(response.data.data.total) / limit));

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [page, searchCharacter, apiUrl]);

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
          <div className="section-title">
            <h2>MARVEL CHARACTERS LIST</h2>
          </div>
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
          <ReactPaginate
            previousLabel={"PREV"}
            nextLabel={"NEXT"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageMax}
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages"}
            activeClassName={"active"}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
