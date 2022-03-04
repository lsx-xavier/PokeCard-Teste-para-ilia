import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";

import "../../../styles/shared/global/header.scss";

import {
  setData,
  setPageNumber,
  setCounItems,
  setSearchFor,
} from "../store/stock.reducer";

import Search from "../global/search";

import gengar from "../../../images/gengar.png";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const searchFor = useAppSelector((state) => state.dataPokemon.searchFor);

  function handleSearch(e: any) {
    let search = e.target.value;

    dispatch(setSearchFor(search));
    dispatch(setPageNumber(1));
  }

  useEffect(() => {
    dispatch(setData([]));
    dispatch(setCounItems(0));
  }, [searchFor]);

  Search();

  return (
    <header>
      <div onClick={() => navigate("/")} className="logo">
        <img src={gengar} width={50} alt="Pokedex Card" />
        <p>PokeCard</p>
      </div>
      {pathname.split("/")[1] !== "pokemon-details" ? (
        <div id="search">
          <input
            placeholder="Digite o nome do pokemon"
            type="text"
            value={searchFor}
            onChange={handleSearch}
          />
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}
