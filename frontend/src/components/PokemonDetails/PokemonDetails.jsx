import React, { useEffect, useState } from "react";
import { getPokemonDetails } from "../../services/pokemonService";
import { getPokemonTypeColor } from "../../utils/pokemonTypeColors";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import unknownPokemon from "../../assets/unknown-pokemon.png";
import "./PokemonDetails.css";

// This component shows the Pokemon details, hp, attack, etc.
const PokemonDetail = ({ id, onClose, hideCloseButton }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const data = await getPokemonDetails(id);
        setPokemon(data);
      } catch (error) {
        console.error("Error getting pokemon details: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (loading) {
    return <LoadingAnimation />;
  }

  if (!loading && !pokemon) {
    return <div>Pokemon not found</div>;
  }

  const typeColor = getPokemonTypeColor(pokemon.types[0].type.name);

  return (
    <div className="pokemon-card" style={{ backgroundColor: typeColor }}>
      {!hideCloseButton && (
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      )}
      <img
        className="pokemon-image"
        src={
          pokemon.sprites.other["official-artwork"].front_default ||
          unknownPokemon
        }
      />
      <div className="pokemon-info">
        <h2>{pokemon.name}</h2>
        <div className="pokemon-types">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="type-label"
              style={{ backgroundColor: getPokemonTypeColor(type.type.name) }}
            >
              {type.type.name.toUpperCase()}
            </span>
          ))}
        </div>
        <div className="pokemon-stats">
          {pokemon.stats.map((stat, index) => (
            <div key={index} className="stat">
              <span className="stat-name">{stat.stat.name}</span>
              <div className="stat-bar-container">
                <div
                  className="stat-bar"
                  style={{ width: `${(stat.base_stat / 250) * 100}%` }} // I take 250 as the max number a stat can have
                ></div>
              </div>
              <span className="stat-value">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;