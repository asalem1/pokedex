import React from 'react';
import { Type } from '../../types';
import './PokemonType.css';

interface Props {
  types: Type[];
}

export function PokemonType({ types }: Props) {
  return (
    <div className="type-list">
      <div className="panel-header">Types</div>
      <div className="type-box">
        {types.map(({type}) => {
          const typeName = type.name;
          return <div className={'type ' + typeName} key={typeName}>{typeName}</div>;
        })}
      </div>
    </div>
  );
}
