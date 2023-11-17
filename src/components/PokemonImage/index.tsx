import React from 'react';
import './PokemonImage.css';

interface Props {
  src: {
    front_default?: string;
  };
}

export function PokemonImage({src}: Props) {
  const imgSrc = src?.['front_default'] ?? '';

  return (
    <div>
      <img src={imgSrc} alt="pokemon" className="pokemon-sprite" />
    </div>
  );
}
