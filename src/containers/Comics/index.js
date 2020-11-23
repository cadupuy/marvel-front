import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
import ComicItem from "../../components/ComicItem";
import Banner from "../../components/Banner";
import SearchBar from "../../components/SearchBar";
import "./index.css";

const Comics = ({ apiUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  // Search bar for comics
  const [searchComic, setSearchComic] = useState("");
  // Return all comics from Marvel API
  const [comics, setComics] = useState([]);
  const [pageMax, setPageMax] = useState(0);
  const [page, setPage] = useState(1);
  // Number of results per page
  const limit = 100;

  const handlePageClick = (event) => {
    console.log(event);
    setPage(event.selected + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/comics?page=${page}&title=${searchComic}`
        );
        setPageMax(Math.ceil(Number(response.data.data.total) / limit));

        setComics(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [searchComic, page, apiUrl]);

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
      />
      <main className="main-comics">
        <div className="main-navigation">
          <div className="section-title">
            <h2>MARVEL COMICS LIST</h2>
          </div>
          <div>
            <SearchBar
              searchItem={searchComic}
              setSearchItem={setSearchComic}
            />
          </div>
          <div>
            <p>{comics.total} RESULTS</p>
            <p>SORT BY A-Z</p>
          </div>
        </div>
        <section className="comics-section">
          {comics.results.map((item) => {
            return <ComicItem key={item.id} comics={item} />;
          })}
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

export default Comics;
