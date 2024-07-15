import { createSlice } from "@reduxjs/toolkit";
import { getPokemonList, getPokemonDetails } from "../../services/pokemonService";

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
    currentPage: 1,
    totalPages: 0,
    dataFetched: false,
    searchText: "",
    isSearchResult: false,
    loading: false,
    error: null,
  },
  reducers: {
    setPokemons: (state, action) => {
      state.list = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetCurrentPage: (state) => {
        state.currentPage = 1;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    resetPokemons: (state) => {
      state.list = [];
    },
    setDataFetched: (state, action) => {
      state.dataFetched = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    clearSearchText: (state) => {
      state.searchText = "";
    },
    //Sets if the current list was filled in from a search
    setIsSearchResult: (state, action) => {
      state.isSearchResult = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPokemons,
  setCurrentPage,
  resetCurrentPage,
  setTotalPages,
  dataFetched,
  resetPokemons,
  setSearchText,
  clearSearchText,
  setIsSearchResult,
  setLoading,
  setError,
} = pokemonSlice.actions;

export const fetchAllPokemons = (page = 1, limit = 20) => async (dispatch, getState) => {
  const state = getState().pokemon;
  if(state.dataFetched && page === state.currentPage){
    return; // Prevent another call
  }
  dispatch(setLoading(true));
    try {
      const data = await getPokemonList(page, limit);
      const pokemonsWithDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          // This can be done using directly the URL from the results, but I want to use my custom middleware and cache
          const details = await getPokemonDetails(pokemon.name); 
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.other["official-artwork"].front_default,
            types: details.types.map((typeInfo) => typeInfo.type.name),
          };
        })
      );
      dispatch(setPokemons(pokemonsWithDetails));
      dispatch(setTotalPages(Math.ceil(data.count / limit)));
    } catch (error) {
      console.error("Error getting pokemons:", error);
      dispatch(setError("Error getting pokemons data"));
    } finally {
      dispatch(setLoading(false));
    }
  };

export default pokemonSlice.reducer;
