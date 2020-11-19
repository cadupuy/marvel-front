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
import Comic from "./containers/Comic";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faTimes,
  faStar,
  faChevronRight,
  faBars,
  faCaretDown,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faSearch,
  faTimes,
  faStar,
  faBars,
  faCaretDown,
  faChevronRight,
  faChevronLeft
);

function App() {
  const apiUrl = "http://localhost:3001/";

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/comic/:id">
          <Comic apiUrl={apiUrl} />
        </Route>
        <Route path="/character/:id">
          <Character apiUrl={apiUrl} />
        </Route>
        <Route path="/comics">
          <Comics apiUrl={apiUrl} />
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
