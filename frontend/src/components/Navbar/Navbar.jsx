import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { searchPokemonByName, getPokemonDetails } from '../../services/pokemonService';
import { fetchAllPokemons, setPokemons, setSearchText, clearSearchText, resetPokemons, setIsSearchResult, resetCurrentPage, setLoading, setError } from '../../store/slices/pokemonSlice';
import SearchForm from '../SearchForm/SearchForm';
import axios from 'axios';
import './Navbar.css';
import pokemonLogo from '../../assets/pokemon-logo.png';
import githubIcon from '../../assets/github-icon.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hide navbar in login page
  if (location.pathname === '/') {
    return null;
  }

  // Logout and return to / which is the Login page
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
    dispatch(resetCurrentPage());
  };

  // Reset search and fetch all pokemons when "Home" button is clicked
  const handleHomeClick = async () => {
    dispatch(setLoading(true));
    dispatch(clearSearchText());  
    dispatch(resetPokemons());  
    dispatch(resetCurrentPage());
    dispatch(fetchAllPokemons(1)); 
    dispatch(setLoading(false));
    navigate('/home');  
    setIsMenuOpen(false);
    dispatch(setIsSearchResult(false));
  };

  // Search bar
  const handleSearch = async (searchText) => {
    dispatch(setLoading(true));
    dispatch(setSearchText(searchText));
    if (searchText.trim() === '') {
      // Reset to show all pokemons if empty
      dispatch(fetchAllPokemons(1));
      dispatch(setIsSearchResult(false));
    } else {
      const pokemonData = await searchPokemonByName(searchText);
      if (pokemonData && !pokemonData.error) {
        const pokemonDetails = await getPokemonDetails(pokemonData.id);
        const speciesResponse = await axios.get(pokemonDetails.species.url);
        const evolutionChainResponse = await axios.get(speciesResponse.data.evolution_chain.url);

        const evolutionChain = evolutionChainResponse.data.chain;
        const evolutions = [];

        /*
          * This function get the evolutionary chain of the specified pokemon,
          * it ensures that not just the searched pokemon, but also all its evolutions are displayed, bc i dont like the empty spaces jaja
        */
        const getEvolutionChain = async (chain) => {
          let currentEvolution = chain;

          while (currentEvolution) {
            const pokemonDetails = await getPokemonDetails(currentEvolution.species.name);
            // Add the current pokemon details to the evolutions array
            evolutions.push({
              ...pokemonDetails,
              name: currentEvolution.species.name,
              id: pokemonDetails.id,
              image: pokemonDetails.sprites.other['official-artwork'].front_default,
              types: pokemonDetails.types.map(typeInfo => typeInfo.type.name), 
            });

            // Validate if it has a next evolution stage
            if (currentEvolution.evolves_to.length > 0) {
              currentEvolution = currentEvolution.evolves_to[0];
            } else {
              currentEvolution = null; // End the loop if theres no more evolutions
            }
          }
        };

        await getEvolutionChain(evolutionChain);

        // Find the index of the searched Pokemon in the evolutions array
        const searchedPokemonIndex = evolutions.findIndex(
          (pokemon) => pokemon.name === searchText.toLowerCase()
        );

        // Move the searched Pokemon to the beginning of the array
        if (searchedPokemonIndex !== -1) {
          const searchedPokemon = evolutions.splice(searchedPokemonIndex, 1)[0];
          evolutions.unshift(searchedPokemon);
        }

        dispatch(setPokemons(evolutions));
        dispatch(setIsSearchResult(true));
      } else {
        dispatch(setPokemons(null));
        dispatch(setIsSearchResult(true));
        dispatch(setError("Not found"));
      }
    }
    dispatch(setLoading(false));
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={pokemonLogo} alt="Pokemon Logo" className="navbar-logo" />
        <a
          href="https://github.com/YairRGL"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubIcon} alt="GitHub" className="navbar-github-icon" />
        </a>
        <button
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>
      <div className="navbar-right">
        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          {location.pathname === "/home" && (
            <li className="navbar-search-item">
              <SearchForm onSearch={handleSearch} />
            </li>
          )}
          <li>
            <button className="navbar-button" onClick={handleHomeClick}>
              Home
            </button>
          </li>
          <li>
            <button
              className="navbar-button"
              onClick={() => navigate("/battle")}
            >
              Battle
            </button>
          </li>
          <li>
            <button className="navbar-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;