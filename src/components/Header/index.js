import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Header = () => {
  return (
    <header>
      <img
        src="https://marvel-jolisdegats.netlify.app/static/media/Marvel-Comics-Logo.575beca3.png"
        alt=""
      />
      <nav>
        <ul>
          <Link to="/characters">
            <li>Characters</li>
          </Link>
          <Link to="/comics">
            <li>Comics</li>
          </Link>
          <li>My Favs</li>
        </ul>

        <p>Login</p>
      </nav>
    </header>
  );
};

export default Header;
