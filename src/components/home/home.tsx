import React, { useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../shared/store/hooks";

import Header from "../shared/global/header";
import Loading from "../shared/global/loading";
import ListDesktop from "./listDesktop";
import CarrouselMobile from "./carrouselMobile";
import { setPageNumber } from "../shared/store/stock.reducer";

export default function Home() {
  const dispatch = useAppDispatch();
  const observer = useRef(null);

  const listPokemons = useAppSelector((state) => state.dataPokemon.data);
  const counItems = useAppSelector((state) => state.dataPokemon.counItems);
  const pageNumber = useAppSelector((state) => state.dataPokemon.pageNumber);
  const loading = useAppSelector((state) => state.dataPokemon.loading);

  useEffect(() => {
    if (loading) return;

    if (listPokemons.length <= counItems) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          dispatch(setPageNumber(pageNumber + 1));
        }
      });

      intersectionObserver.observe(observer.current);
      return () => intersectionObserver.disconnect();
    }
  }, [loading, listPokemons, counItems]);

  return (
    <>
      <Header />
      <main className="home">
        {listPokemons.length ? (
          <CarrouselMobile list={listPokemons} observer={observer} />
        ) : (
          <></>
        )}
        {listPokemons.length ? (
          <ListDesktop list={listPokemons} observer={observer} />
        ) : (
          <></>
        )}

        {loading ? <Loading /> : <></>}
      </main>
    </>
  );
}
