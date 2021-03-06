import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css";

const Header = ({ setIsModal, setUser, token }) => {
  const history = useHistory();

  const handleClick = () => {
    setIsModal(true);
  };

  const handleUser = () => {
    setUser(null);
  };

  return (
    <header>
      <div>
        <Link to="/">
          <img
            src="https://marvel-jolisdegats.netlify.app/static/media/Marvel-Comics-Logo.575beca3.png"
            alt=""
          />
        </Link>
      </div>
      <nav>
        <ul>
          <Link to="/characters">
            <li>Characters</li>
          </Link>
          <Link to="/comics">
            <li>Comics</li>
          </Link>

          <li
            onClick={() => {
              !token ? setIsModal(true) : history.push("/favorites");
            }}
          >
            My Favorites
          </li>
          {token ? (
            <li onClick={handleUser}>Déconnexion</li>
          ) : (
            <li onClick={handleClick}>Login</li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
