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
  const id = props.id ?? 'xxxx';
  const name = pData?.name ?? 'Loading...'
  const hasSprites = pData.sprites != null;
  return (
    <div className="left-panel__wrapper">
      <div className="left-panel__pokemon-name">
        {name}
        <span className="left-panel__pokemon-id">no. {id}</span>
      </div>
      {hasSprites ? <PokemonImage src={pData.sprites} /> : <Loader />}
      <div className="left-panel__pokemon-description">{description}</div>;
    </div>
  );
}
