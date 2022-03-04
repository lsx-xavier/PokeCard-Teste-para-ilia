import axios from "axios";

const api = axios.create({
  baseURL: "https://api.pokemontcg.io/v2/",
  headers: {
    "x-rapidapi-key": "07388b6d-4d6e-4697-b9a7-d9806d17f4c8",
  },
});

export default api;
