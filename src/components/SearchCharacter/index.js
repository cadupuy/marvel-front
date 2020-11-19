import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ searchCharacter, setSearchCharacter }) => {
  const handleSearch = (ev) => {
    setSearchCharacter(ev.target.value);
  };

  return (
    <div className="search-bar">
      <input
        onChange={handleSearch}
        type="text"
        value={searchCharacter}
        placeholder="SEARCH"
      />
      <FontAwesomeIcon icon={faSearch} />
    </div>
  );
};

export default SearchBar;
