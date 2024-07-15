import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPokemons, setCurrentPage } from "../../store/slices/pokemonSlice";
import Modal from "../../components/Modal";
import PokemonDetail from "../../components/PokemonDetails/PokemonDetails";
import AnimatedPokemonCard from "../../components/AnimatedPokemonCard/AnimatedPokemonCard";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import Paginator from "../../components/Paginator/Paginator";
import "./PokemonList.css";
import pokemonNotFoundImage from "../../assets/pokemon-not-found.jpg";

const PokemonList = () => {
  const dispatch = useDispatch();
  const { list: pokemons, currentPage, totalPages, searchText, isSearchResult, error } = useSelector((state) => state.pokemon);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPokemonsForPage = useCallback((page) => {
    setIsLoading(true);
    dispatch(fetchAllPokemons(page)).finally(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    fetchPokemonsForPage(currentPage);
  }, [fetchPokemonsForPage, currentPage]);

  // Handle animation re-run after open/closing modal
  const handleCardClick = useCallback((id) => {
    setSelectedPokemonId(id);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedPokemonId(null);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    dispatch(setCurrentPage(newPage));
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [dispatch]);

  // Prevent scroll in modal
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingAnimation />;
    }

    if (!isLoading && (!pokemons || pokemons.length === 0) && isSearchResult) {
      if(error){
        return (
          <div className="pokemon-not-found">
            <p>Pokemon "{searchText}" not found :(</p>
            <img
              src={pokemonNotFoundImage}
              alt="Pokemon not found"
              className="pokemon-not-found-image"
            />
          </div>
        );
      }
    }

    if (pokemons === null) {
      return null; 
    }

    return (
      <>
        <div className="pokemon-grid">
          {pokemons.map((pokemon, index) => (
            <AnimatedPokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => handleCardClick(pokemon.id)}
              index={index}
            />
          ))}
        </div>
        {!isSearchResult && pokemons.length > 0 && (
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </>
    );
  };

  return (
    <div className="container">
      {renderContent()}
      {selectedPokemonId && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <PokemonDetail id={selectedPokemonId} onClose={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default PokemonList;