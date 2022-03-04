import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import _ from "loadsh";

import { useAppSelector, useAppDispatch } from "../store/hooks";

import { setData, setCounItems, setLoading } from "../store/stock.reducer";

import api from "../../../services/api";

interface PokemonInterface {
  count: number;
  totalItems: number;
  list: PokemonListInterface[];
}

interface PokemonListInterface {
  images: { small: string; large: string };
  name: string;
  id: string;
  types: [string];
}

export default function Search() {
  const dispatch = useAppDispatch();
  const pageNumber = useAppSelector((state) => state.dataPokemon.pageNumber);
  const listPokemons = useAppSelector((state) => state.dataPokemon.data);
  const searchFor = useAppSelector((state) => state.dataPokemon.searchFor);

  useEffect(() => {
    let cancel;
    dispatch(setLoading(true));

    api
      .get("cards", {
        params: {
          orderBy: "name",
          pageSize: 24,
          page: pageNumber,
          q: searchFor ? `name:${searchFor}*` : null,
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then(({ data }) => {
        dispatch(
          setData([
            ...new Set(
              _.uniqBy(
                [
                  ...listPokemons,
                  ...data.data.map((item: PokemonListInterface) => ({
                    id: item.id,
                    name: item.name,
                    images: item.images,
                    types: item.types,
                  })),
                ],
                "id"
              )
            ),
          ])
        );
        dispatch(setCounItems(data.totalCount));
        dispatch(setLoading(false));
      })
      .catch((e) => {
        console.log(e);
        if (axios.isCancel(e)) return;
      });
  }, [searchFor, pageNumber]);

  return;
}
