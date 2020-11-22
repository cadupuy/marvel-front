import React, { useState } from "react";
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
import Cookies from "js-cookie";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faTimes);

function App() {
  const [isModal, setIsModal] = useState(false);
  const [token, setToken] = useState(Cookies.get("tokenUser") || null);

  const setUser = (tokenToSet) => {
    if (tokenToSet) {
      Cookies.set("tokenUser", tokenToSet, { expires: 10 });
      setToken(tokenToSet);
    } else {
      Cookies.remove("tokenUser");
      setToken(null);
    }
  };

  if (isModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  const apiUrl = "http://localhost:3001";
  // local: "  http://localhost:3001";
  // online : "https://marvel-clone-api.herokuapp.com"

  return (
    <Router>
      {isModal === true && (
        <Modal setIsModal={setIsModal} setUser={setUser} apiUrl={apiUrl} />
      )}

      <Header setIsModal={setIsModal} setUser={setUser} token={token} />
      <Switch>
        <Route path="/character/:id">
          <Character apiUrl={apiUrl} token={token} />
        </Route>
        <Route path="/comics">
          <Comics apiUrl={apiUrl} />
        </Route>
        <Route exact path="/favorites">
          {token ? (
            <Favorites token={token} apiUrl={apiUrl} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/characters">
          <Home apiUrl={apiUrl} />
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
