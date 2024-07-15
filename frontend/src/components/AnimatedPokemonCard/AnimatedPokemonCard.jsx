import React from 'react';
import { useSpring, animated } from "@react-spring/web";
import PokemonCard from "../PokemonCard/PokemonCard";

const AnimatedPokemonCard = ({ pokemon, onClick, index }) => {
  const props = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(50px)" },
    delay: index * 100, 
    config: { duration: 300 },
  });

  return (
    <animated.div style={props}>
      <PokemonCard pokemon={pokemon} onClick={onClick} />
    </animated.div>
  );
};

export default AnimatedPokemonCard;