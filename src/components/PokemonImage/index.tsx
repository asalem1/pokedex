import React from 'react';
import './PokemonImage.css';

interface Props {
  src: {
    front_default: string;
  } | undefined;
}

export function PokemonImage({src}: Props) {
  const imgSrc = src?.['front_default'];
  // TODO(ariel): loading state
  // failed state
  // successful state

  return (
    <div>
      <img src={imgSrc} alt="pokemon" className="pokemon-sprite" />
    </div>
  );
}
