import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { getPokemonList } from "../../services/pokemonService";
import PokemonDetail from "../../components/PokemonDetails/PokemonDetails";
import Arena from "../../components/Arena/Arena";
import pokemonBattleIcon from "../../assets/pokemon-battle-icon.png";
import "./Battle.css";

const Battle = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [showArena, setShowArena] = useState(false);

  // Animations
  const [fadeProps1, setFadeProps1] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }));

  const [fadeProps2, setFadeProps2] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }));

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const data = await getPokemonList(1, 151);
        setPokemonList(data.results);
      } catch (error) {
        console.error("Error getting pokemon list:", error);
      }
    };

    fetchPokemonList();
  }, []);

  // Little animation after selecction the pokemon from the list, and the show the pokemon info using the PokemonDetails component
  const handlePokemonSelect = (pokemonName, selectNumber) => {
    if (selectNumber === 1) {
      setPokemon1(pokemonName);
      setFadeProps1({ opacity: 0 });
      setTimeout(() => {
        setFadeProps1({ opacity: 1 });
      }, 100);
    } else if (selectNumber === 2) {
      setPokemon2(pokemonName);
      setFadeProps2({ opacity: 0 });
      setTimeout(() => {
        setFadeProps2({ opacity: 1 });
      }, 100);
    }
  };

  const handleFightClick = () => {
    setShowArena(true);
  };

  const handleTryAgain = () => {
    setShowArena(false);
    setPokemon1(null);
    setPokemon2(null);
  };

  return (
    <div className="battle-container">
      {!showArena ? (
        <>
          <h2 className="battle-heading">Choose your pokemon!</h2>
          <div className="pokemon-selection">
            <animated.div className="pokemon-select" style={fadeProps1}>
              <select
                value={pokemon1 || ""}
                onChange={(e) => handlePokemonSelect(e.target.value, 1)}
              >
                <option value="">Select Pokemon 1</option>
                {pokemonList
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((pokemon) => (
                    <option key={pokemon.name} value={pokemon.name} className="pokemon-name">
                      {pokemon.name}
                    </option>
                  ))}
              </select>
              <div className="pokemon-detail-container">
                {pokemon1 && (
                  <animated.div style={fadeProps1}>
                    <div className="pokemon-detail-wrapper">
                      <PokemonDetail id={pokemon1} hideCloseButton />
                    </div>
                  </animated.div>
                )}
              </div>
            </animated.div>
            <div className="battle-icon-container">
              <img src={pokemonBattleIcon} alt="Pokemon Battle" className="pokemon-battle-icon" />
              <button
                className="fight-button"
                disabled={!pokemon1 || !pokemon2}
                onClick={handleFightClick}
              >
                Fight!
              </button>
            </div>
            <animated.div className="pokemon-select" style={fadeProps2}>
              <select
                value={pokemon2 || ""}
                onChange={(e) => handlePokemonSelect(e.target.value, 2)}
              >
                <option value="">Select Pokemon 2</option>
                {pokemonList
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((pokemon) => (
                    <option key={pokemon.name} value={pokemon.name} className="pokemon-name">
                      {pokemon.name}
                    </option>
                  ))}
              </select>
              <div className="pokemon-detail-container">
                {pokemon2 && (
                  <animated.div style={fadeProps2}>
                    <div className="pokemon-detail-wrapper">
                      <PokemonDetail id={pokemon2} hideCloseButton />
                    </div>
                  </animated.div>
                )}
              </div>
            </animated.div>
          </div>
        </>
      ) : (
        <Arena pokemon1={pokemon1} pokemon2={pokemon2} onTryAgain={handleTryAgain} />
      )}
    </div>
  );
};

export default Battle;