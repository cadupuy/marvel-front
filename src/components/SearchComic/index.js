import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ searchComic, setSearchComic }) => {
  const handleSearch = (ev) => {
    setSearchComic(ev.target.value);
  };

  return (
    <div className="search-bar">
      <input
        onChange={handleSearch}
        type="text"
        value={searchComic}
        placeholder="SEARCH"
      />
      <FontAwesomeIcon icon={faSearch} />
    </div>
  );
};

export default SearchBar;
