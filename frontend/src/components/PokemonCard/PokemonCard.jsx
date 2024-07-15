import React from "react";
import "./PokemonCard.css";
import unknownPokemon from "../../assets/unknown-pokemon.png";
import { getPokemonTypeColor } from "../../utils/pokemonTypeColors";

// This componet shows the pokemon image, name and type to show in the list of pokemons
const PokemonCard = ({ pokemon, onClick }) => {
  const formattedId = String(pokemon.id).padStart(3, "0");
  const typeColor = getPokemonTypeColor(pokemon.types[0]);
  return (
    <div
      className="card-container"
      onClick={onClick}
      style={{ backgroundColor: typeColor }}
    >
      <div className="top">
        <span className="pokemon-number">#{formattedId}</span>
        <img
          className="pokemon-image"
          // Some pokemons do not have an img
          src={pokemon.image || unknownPokemon}
          alt={pokemon.name}
        />
      </div>
      <div className="bottom">
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <div className="pokemon-types">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="pokemon-type"
              style={{ backgroundColor: getPokemonTypeColor(type) }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
