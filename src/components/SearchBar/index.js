import "./index.css";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ searchItem, setSearchItem }) => {
  const handleSearch = (ev) => {
    setSearchItem(ev.target.value);
  };

  return (
    <div className="search-bar">
      <input
        onChange={handleSearch}
        type="text"
        value={searchItem}
        placeholder="SEARCH"
      />
      <FontAwesomeIcon icon={faSearch} />
    </div>
  );
};

export default SearchBar;
