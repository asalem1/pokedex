import React from 'react';
import './PokemonImageSmall.css';
import { PokeBall } from '../PokeBall';

interface Props {
  name?: string;
  evo: 'I' | 'II' | 'III';
  src?: string;
}

export function PokemonImageSmall({ evo, name, src }: Props) {
  let evoImage = <PokeBall />;

  if (src) {
    evoImage = (
      <img
        src={src}
        alt="pokemon"
        className="pokemon-sprite__small"
      />
    );
  }

  return (
    <div>
      <div className="flex-center">
        <div className="evolution__number">{evo}</div>
      </div>
      {evoImage}
      <div className="evolution__name">{name || 'No Data'}</div>
    </div>
  );
}
