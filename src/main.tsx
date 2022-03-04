import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./styles/global.scss";
import { store } from "./components/shared/store/store";
import Home from "./components/home/home";
import PokemonDetail from "./components/pokemonDetail/pokemonDetail";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon-details/:id" element={<PokemonDetail />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
