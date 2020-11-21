import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import ComicItem from "../../components/ComicItem";
import Banner from "../../components/Banner";
import ReactPaginate from "react-paginate";
import SearchComic from "../../components/SearchComic";
import "./index.css";

const Characters = ({ apiUrl }) => {
  const [searchComic, setSearchComic] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState([]);
  const [pageMax, setPageMax] = useState(0);
  const [page, setPage] = useState(1);
  const tab = [];
  const limit = 100;

  const handlePageClick = (event) => {
    console.log(event);
    setPage(event.selected + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}comics?page=${page}&title=${searchComic}`
        );
        setPageMax(Math.ceil(Number(response.data.data.total) / limit));

        setComics(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [searchComic, page]);

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
        title="MARVEL COMICS"
        description="Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!"
        image={
          "https://terrigen-cdn-dev.marvel.com/content/prod/1x/characters_art_mas_dsk_01.jpg"
        }
      />
      <main>
        <div className="main-navigation">
          <div className="section-title">
            <h2>MARVEL COMICS LIST</h2>
          </div>
          <div>
            <SearchComic
              searchComic={searchComic}
              setSearchComic={setSearchComic}
            />
          </div>
          <div>
            <p>{comics.total} RESULTS</p>
            <p>SORT BY A-Z</p>
          </div>
        </div>
        <section className="comics-section">
          <ComicItem comics={comics.results} />
        </section>

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
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </main>
    </>
  );
};

export default Characters;
