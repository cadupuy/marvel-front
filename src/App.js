import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./containers/Home";
import Comics from "./containers/Comics";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Character from "./containers/Character";
import Favorites from "./containers/Favorites";
import Modal from "./components/Modal";
import axios from "axios";
import Cookies from "js-cookie";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const [isModal, setIsModal] = useState(false);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [token, setToken] = useState(Cookies.get("tokenUser") || null);

  const setUser = (tokenToSet) => {
    if (tokenToSet) {
      Cookies.set("tokenUser", tokenToSet, { expires: 30 });
      setToken(tokenToSet);
    } else {
      Cookies.remove("tokenUser");
      setToken(null);
    }
  };

  const favoriteCharacter = (item) => {
    let newTab = [...favoriteCharacters];
    newTab.push(item);
    setFavoriteCharacters(newTab);
  };

  const favoriteComic = (item) => {
    let newTab = [...favoriteComics];
    newTab.push(item);
    setFavoriteComics(newTab);
  };

  const apiUrl = "http://localhost:3001/";

  return (
    <Router>
      {isModal === true && <Modal setIsModal={setIsModal} setUser={setUser} />}

      <Header setIsModal={setIsModal} setUser={setUser} token={token} />
      <Switch>
        <Route path="/character/:id">
          <Character
            apiUrl={apiUrl}
            favoriteCharacter={favoriteCharacter}
            favoriteCharacters={favoriteCharacters}
            setFavoriteCharacters={setFavoriteCharacters}
          />
        </Route>
        <Route path="/comics">
          <Comics apiUrl={apiUrl} />
        </Route>
        <Route exact path="/favorites">
          {token ? (
            <Favorites favoriteCharacters={favoriteCharacters} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/characters">
          <Home />
        </Route>
        <Route path="/">
          <Home apiUrl={apiUrl} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
