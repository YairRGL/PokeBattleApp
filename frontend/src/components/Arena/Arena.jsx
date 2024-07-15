import React, { useState, useEffect } from "react";
import { getPokemonDetails, battlePokemon } from "../../services/pokemonService";
import arenaBackground from "../../assets/arena-background.png";
import "./Arena.css";

const Arena = ({ pokemon1, pokemon2, onTryAgain }) => {
  const [pokemon1Details, setPokemon1Details] = useState(null);
  const [pokemon2Details, setPokemon2Details] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [pokemon1Health, setPokemon1Health] = useState(0);
  const [pokemon2Health, setPokemon2Health] = useState(0);
  const [moveEffect, setMoveEffect] = useState("");
  const [winner, setWinner] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Get pokemons data from the api  
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const details1 = await getPokemonDetails(pokemon1);
        const details2 = await getPokemonDetails(pokemon2);
        setPokemon1Details(details1);
        setPokemon2Details(details2);
        setPokemon1Health(details1.stats[0].base_stat);
        setPokemon2Health(details2.stats[0].base_stat);
        const initialTurn = Math.floor(Math.random() * 2) + 1; // Get a random number between 1 and 2, to choose the first pokemon to attack
        setCurrentTurn(initialTurn);
        setMoveEffect(`What will ${initialTurn === 1 ? details1.name : details2.name} do?`);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [pokemon1, pokemon2]);

  // Atack, sending data to the battle endpoint in the API
  const handleMoveClick = async (move) => {
    setIsLoading(true);
    setLoadingProgress(0);
    setMoveEffect(`${currentTurn === 1 ? pokemon1Details.name : pokemon2Details.name} used ${move.move.name}!`);

    const progressInterval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 300);

    const data = await battlePokemon({
      pokemon1: pokemon1Details.name,
      pokemon2: pokemon2Details.name,
      moveUrl: move.move.url,
      currentTurn,
      pokemon1Health,
      pokemon2Health,
    });

    if (data) {
      // Timeout to simulate the attack, after it will switch the pokemon positions
      setTimeout(() => {
        if (currentTurn === 1) {
          setPokemon2Health(data.pokemon2Health);
        } else {
          setPokemon1Health(data.pokemon1Health);
        }
        setWinner(data.winner);
        setIsLoading(false);
        setLoadingProgress(0);
        const nextTurn = currentTurn === 1 ? 2 : 1;
        setCurrentTurn(nextTurn);
        setMoveEffect(`What will ${nextTurn === 1 ? pokemon1Details.name : pokemon2Details.name} do?`);
      }, 3000);
    } else {
      setIsLoading(false);
      setLoadingProgress(0);
    }
  };

  // Reset to choose new pokeons to fight
  const handleTryAgain = () => {
    onTryAgain();
  };

  // Show the winner
  if (winner) {
    const winnerDetails = winner === pokemon1Details.name ? pokemon1Details : pokemon2Details;
    return (
      <div className="arena-winner-container">
        <h2>Congratulations!</h2>
        <img src={winnerDetails.sprites.front_default} alt={winnerDetails.name} />
        <p className="pokemon-name">{winnerDetails.name} wins!</p>
        <button onClick={handleTryAgain}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="arena-container">
      <div className="pokemon-grid">
        <div className="battle-area" style={{ backgroundImage: `url(${arenaBackground})` }}>
          <div className="pokemon-info-left">
            {currentTurn === 1 ? (
              pokemon2Details && (
                <div className="pokemon-info">
                  <p className="pokemon-name">{pokemon2Details.name}</p>
                  <div className={`hp-bar ${pokemon2Health < 30 ? "low-health" : ""}`}>
                    <div
                      className="hp-bar-fill"
                      style={{
                        width: `${(pokemon2Health / pokemon2Details.stats[0].base_stat) * 100}%`,
                      }}
                    ></div>
                    <span className="hp-value">{pokemon2Health}/{pokemon2Details.stats[0].base_stat}</span>
                  </div>
                </div>
              )
            ) : (
              pokemon1Details && (
                <div className="pokemon-info">
                  <p className="pokemon-name">{pokemon1Details.name}</p>
                  <div className={`hp-bar ${pokemon1Health < 30 ? "low-health" : ""}`}>
                    <div
                      className="hp-bar-fill"
                      style={{
                        width: `${(pokemon1Health / pokemon1Details.stats[0].base_stat) * 100}%`,
                      }}
                    ></div>
                    <span className="hp-value">{pokemon1Health}/{pokemon1Details.stats[0].base_stat}</span>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="pokemon-sprite-top">
            {currentTurn === 1 ? (
              pokemon2Details && <img src={pokemon2Details.sprites.front_default} alt={pokemon2Details.name} />
            ) : (
              pokemon1Details && <img src={pokemon1Details.sprites.front_default} alt={pokemon1Details.name} />
            )}
          </div>
          <div className="pokemon-sprite-bottom">
            {currentTurn === 1 ? (
              pokemon1Details && (
                <>
                  <img src={pokemon1Details.sprites.back_default} alt={pokemon1Details.name} />
                  {isLoading && (
                    <div className="loading-bar">
                      <div className="loading-bar-fill" style={{ width: `${loadingProgress}%` }}></div>
                    </div>
                  )}
                </>
              )
            ) : (
              pokemon2Details && (
                <>
                  <img src={pokemon2Details.sprites.back_default} alt={pokemon2Details.name} />
                  {isLoading && (
                    <div className="loading-bar">
                      <div className="loading-bar-fill" style={{ width: `${loadingProgress}%` }}></div>
                    </div>
                  )}
                </>
              )
            )}
          </div>
          <div className="pokemon-info-right">
            {currentTurn === 1 ? (
              pokemon1Details && (
                <div className="pokemon-info">
                  <p className="pokemon-name">{pokemon1Details.name}</p>
                  <div className={`hp-bar ${pokemon1Health < 30 ? "low-health" : ""}`}>
                    <div
                      className="hp-bar-fill"
                      style={{
                        width: `${(pokemon1Health / pokemon1Details.stats[0].base_stat) * 100}%`,
                      }}
                    ></div>
                    <span className="hp-value">{pokemon1Health}/{pokemon1Details.stats[0].base_stat}</span>
                  </div>
                </div>
              )
            ) : (
              pokemon2Details && (
                <div className="pokemon-info">
                  <p className="pokemon-name">{pokemon2Details.name}</p>
                  <div className={`hp-bar ${pokemon2Health < 30 ? "low-health" : ""}`}>
                    <div
                      className="hp-bar-fill"
                      style={{
                        width: `${(pokemon2Health / pokemon2Details.stats[0].base_stat) * 100}%`,
                      }}
                    ></div>
                    <span className="hp-value">{pokemon2Health}/{pokemon2Details.stats[0].base_stat}</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="move-effect">
          <p>{moveEffect}</p>
        </div>
        <div className="move-buttons">
          {currentTurn === 1 && pokemon1Details && (
            <>
              {pokemon1Details.moves.slice(0, 4).map((move) => (
                <button
                  key={move.move.name}
                  className="move-button"
                  onClick={() => handleMoveClick(move)}
                  disabled={isLoading}
                >
                  {move.move.name}
                </button>
              ))}
            </>
          )}
          {currentTurn === 2 && pokemon2Details && (
            <>
              {pokemon2Details.moves.slice(0, 4).map((move) => (
                <button
                  key={move.move.name}
                  className="move-button"
                  onClick={() => handleMoveClick(move)}
                  disabled={isLoading}
                >
                  {move.move.name}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Arena;