import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Header = () => {
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
          <Link to="/comics">
            <li>My Favorites</li>
          </Link>
          <Link to="/comics">
            <li>Login</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
