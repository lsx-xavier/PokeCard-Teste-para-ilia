import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../shared/store/hooks";

import "../../styles/pokemonDetails/modal.scss";
import "../../styles/pokemonDetails/pokemonDetails.scss";
import api from "../../services/api";
import AttacksDetails from "./attacksDetails";
import Header from "../shared/global/header";
import Loading from "../shared/global/loading";

import gifPikachu from "../../images/pikachu.gif";
import back from "../../images/arrow_back_black_24dp.svg";

import next from "../../images/arrow_forward_ios_black_24dp.svg";
import preview from "../../images/arrow_back_ios_black_24dp.svg";

interface PokemonInterface {
  id: string;
  name: string;
  images: { large: string; small: string };
  types: [string];
  resistances: [{ type: string; value: string }];
  weaknesses: [{ type: string; value: string }];
  attacks: Attacks[];
}

interface Attacks {
  convertedEnergyCost: number;
  cost: [];
  damage: string;
  name: string;
  text: string;
}

export default function PokemonDetail() {
  let params = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState<PokemonInterface>();
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [attack, setAttack] = useState<Attacks>();
  const [indexPoke, setIndexPoke] = useState<number>(0);
  const listPokemons = useAppSelector((state) => state.dataPokemon.data);

  useEffect(() => {
    setLoading(true);
    api
      .get(`cards?q=id:${params.id}`)
      .then(({ data }) => {
        data.data.map((item: PokemonInterface) => {
          return setPokemon({
            id: item.id,
            name: item.name,
            images: item.images,
            resistances: item.resistances,
            types: item.types,
            attacks: item.attacks,
            weaknesses: item.weaknesses,
          });
        });

        setLoading(false);
      })
      .catch((response) => new Error(response));
  }, [params.id]);

  useEffect(() => {
    listPokemons.map((x, index) => {
      x.id === pokemon?.id ? setIndexPoke(index) : null;
    });
  }, [pokemon]);

  const image = pokemon?.images?.large
    ? pokemon?.images?.large
    : "https://docs.pokemontcg.io/img/cards-banner2.png";

  return (
    <>
      <Header />
      <main className="mainPokomenDetails">
        {loading ? (
          <Loading />
        ) : pokemon ? (
          <>
            {indexPoke > 0 ? (
              <span
                onClick={() => {
                  console.log("teste");
                  navigate(
                    `/pokemon-details/${listPokemons[indexPoke - 1]?.id}`
                  );
                }}
                className="buttonPreview"
              >
                <img src={preview} alt="Preview" />
              </span>
            ) : (
              <></>
            )}

            <section>
              <span onClick={() => navigate("/")} className="buttonVoltar">
                <img src={back} alt="back" /> voltar
              </span>
              <div
                className="cardImage"
                style={{
                  background: `url(${image})`,
                }}
              ></div>

              <div className="cardDetails">
                <p>
                  {pokemon?.name} <em>(Id: {pokemon?.id})</em>
                </p>

                <div className="details">
                  <ul>
                    <legend>Tipo(s)</legend>
                    {pokemon?.types?.length ? (
                      pokemon?.types?.map((x) => <li key={x}>{x}</li>)
                    ) : (
                      <p>Nenhum encontrado</p>
                    )}
                  </ul>

                  <ul>
                    <legend>Resistencia(s)</legend>
                    {pokemon?.resistances?.length ? (
                      pokemon?.resistances?.map((x) => (
                        <li key={x.value}>
                          {x.type} - {x.value}
                        </li>
                      ))
                    ) : (
                      <p>Nenhum encontrado</p>
                    )}
                  </ul>

                  <ul>
                    <legend>Fraqueza(s)</legend>
                    {pokemon?.weaknesses?.length ? (
                      pokemon?.weaknesses?.map((x) => (
                        <li key={x.value}>
                          {x.type} - {x.value}
                        </li>
                      ))
                    ) : (
                      <p>Nenhum encontrado</p>
                    )}
                  </ul>

                  <ul>
                    <legend>Attacks(s)</legend>
                    <span>Clique para ver detalhes do Attack</span>
                    {pokemon?.attacks?.length ? (
                      pokemon?.attacks?.map((x, index) => (
                        <li
                          className="click"
                          onClick={() => {
                            setShowModal((prev) => !prev);
                            setAttack(pokemon.attacks[index]);
                          }}
                          key={x.name}
                        >
                          {x.name}
                        </li>
                      ))
                    ) : (
                      <p>Nenhum encontrado</p>
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {indexPoke < listPokemons.length - 1 ? (
              <span
                onClick={() => {
                  console.log("teste");
                  navigate(
                    `/pokemon-details/${listPokemons[indexPoke + 1]?.id}`
                  );
                }}
                className="buttonNext"
              >
                <img src={next} alt="Next" />
              </span>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <img src={gifPikachu} />
          </>
        )}
      </main>

      <AttacksDetails
        showModal={showModal}
        setShowModal={setShowModal}
        attacks={attack}
      />
    </>
  );
}
