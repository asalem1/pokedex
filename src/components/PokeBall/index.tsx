import React from 'react';
import './PokeBall.css'

export function PokeBall() {
  return (
    <div className="poke-ball__wrapper">
      <div className="poke-ball">
        <div className="poke-ball-top" />
        <div className="poke-ball-center">
          <div className="poke-ball-dot" />
        </div>
        <div className="poke-ball-bottom" />
      </div>
    </div>
  );
}
