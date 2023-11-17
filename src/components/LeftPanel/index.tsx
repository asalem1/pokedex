import React from 'react';
import './LeftPanel.css';
import {Loader} from '../Loader';
import {PokemonImage} from '../PokemonImage';

interface Props {
  pData: any;
  id: number;
  description: string;
}

export function LeftPanel(props: Props) {
  const pData = props.pData;
  // TODO(ariel): flesh out loading states
  const description = props.description ?? 'Loading....'
  const id = props.id ?? 'XXXX';
  const name = pData?.name ?? 'Loading...'
  const hasSprites = pData.sprites != null;
  return (
    <div className="panel left-panel">
      <div className="pokemon-name screen">
        {name}
        <span className="name-no">no. {id}</span>
      </div>
      {hasSprites ? <PokemonImage src={pData.sprites} /> : <Loader />}
      <div className="pokemon-description screen">{description}</div>;
    </div>
  );
}
