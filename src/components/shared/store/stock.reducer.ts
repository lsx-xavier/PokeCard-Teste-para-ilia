import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface CounterState {
  listPokemonData: [];
  counItems: number;
  pageNumber: number;
  loading: Boolean;
  searchFor: string;
}

// Define the initial state using that type
const initialState: CounterState = {
  listPokemonData: [],
  counItems: 0,
  pageNumber: 1,
  loading: false,
  searchFor: "",
};

const listPokemonData = createSlice({
  name: "listPokemonData",
  initialState: {
    data: [],
    counItems: 0,
    pageNumber: 1,
    loading: false,
    searchFor: "",
  },
  reducers: {
    setData: (listPokemonData, action) => {
      listPokemonData.data = action.payload;
    },
    setCounItems: (listPokemonData, action) => {
      listPokemonData.counItems = action.payload;
    },
    setPageNumber: (listPokemonData, action) => {
      listPokemonData.pageNumber = action.payload;
    },
    setLoading: (listPokemonData, action) => {
      listPokemonData.loading = action.payload;
    },
    setSearchFor: (listPokemonData, action) => {
      listPokemonData.searchFor = action.payload;
    },
  },
});

export const {
  setData,
  setCounItems,
  setPageNumber,
  setLoading,
  setSearchFor,
} = listPokemonData.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.dataPokemon.data;

export default listPokemonData.reducer;
