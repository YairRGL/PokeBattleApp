import axios from 'axios';

// Get URL from .env
const BASE_URL = process.env.POKE_API_BASE_URL || 'http://localhost:8080/api';


export const getPokemonList = async (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  try {
    const response = await axios.get(`${BASE_URL}/pokemon`, {
      params: { offset, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting pokemon list:', error);
    return null;
  }
};

export const getPokemonDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting pokemon details for ID ${id}:`, error);
    return null;
  }
};

export const searchPokemonByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
    return response.data;
  } catch (error) {
    console.error('Error searching for pokemon:', error);
    return null;
  }
};  

export const battlePokemon = async ({ pokemon1, pokemon2, moveUrl, currentTurn, pokemon1Health, pokemon2Health }) => {
  try {
    const response = await axios.post(`${BASE_URL}/pokemon/battle`, {
      pokemon1,
      pokemon2,
      moveUrl,
      currentTurn,
      pokemon1Health,
      pokemon2Health,
    });
    return response.data;
  } catch (error) {
    console.error('Error in pokemon battle:', error);
    return null;
  }
};