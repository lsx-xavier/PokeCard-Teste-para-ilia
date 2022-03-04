import React from "react";
import { Link } from "react-router-dom";

import "../../styles/home/listDesktop.scss";

interface PorpsInterface {
  list: PokemonListInterface[];
}

interface PokemonListInterface {
  images: { small: string; large: string };
  name: string;
  id: string;
  types: [string];
}

export default function listDesktop({ list }: PorpsInterface) {
  return (
    <div className="gridPokemons showDesktop">
      {list?.map((item: PokemonListInterface) => (
        <Link className="card" key={item.id} to={`/pokemon-details/${item.id}`}>
          <div className="card-inner">
            <div className="front">
              <img
                width={245}
                height={342}
                src={
                  item.images?.small
                    ? item.images?.small
                    : "https://docs.pokemontcg.io/img/cards-banner2.png"
                }
                alt={item.name}
              />
            </div>
            <div className="back">
              <section>
                <h2>
                  {item.name} - {item.id}
                </h2>
                <ul>
                  <legend>Tipo(s):</legend>
                  {item.types?.length ? (
                    item.types?.map((x) => <li key={x}>{x}</li>)
                  ) : (
                    <li>Nenhum informado</li>
                  )}
                </ul>
              </section>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
