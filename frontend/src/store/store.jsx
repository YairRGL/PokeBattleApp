import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import pokemonReducer from './slices/pokemonSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pokemon: pokemonReducer
  },
});