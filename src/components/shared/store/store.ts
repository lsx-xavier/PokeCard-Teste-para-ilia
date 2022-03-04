import { configureStore } from "@reduxjs/toolkit";
// ...
import listPokemonData from "./stock.reducer";

export const store = configureStore({
  reducer: {
    dataPokemon: listPokemonData,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
