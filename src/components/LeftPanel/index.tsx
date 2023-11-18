import React from 'react';
import './LeftPanel.css';
import {PokemonImage} from '../PokemonImage';
import {useAppSelector} from '../../app/hooks';
import {selectActivePokemon, selectStatus} from '../../features/pokemon/selectors';
import { LoadingState, Sprite } from '../../types';

interface Props {
  description: string;
}


export function LeftPanel(props: Props) {
  const activePokemon = useAppSelector(selectActivePokemon);
  const status = useAppSelector(selectStatus);
  let description = '';
  let id = null;
  let name = ''
  let sprites: Sprite = {
    front_default:
      'https://imgs.search.brave.com/Xo3OHxxm4jw4pvwC0PX88fzmQzZi6Tdd9yqJazgfLxY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNC9Qb2tl/YmFsbC1QTkcucG5n',
  };
  if (status === LoadingState.LOADING) {
    description = 'Loading...'
    name = 'Loading...'
    id = 'xxxx'
  } else if (status === LoadingState.DONE && activePokemon != null) {
    description = props.description;
    name = activePokemon.name;
    id = activePokemon.id;
    sprites = activePokemon.sprites;
  } else if (status === LoadingState.ERROR) {
    id = 'xxxx'
    name = 'ERROR';
    description = "An error occurred while trying to search for the pokemon. Please try again"
  }

  return (
    <div className="left-panel__wrapper">
      <div className="left-panel__pokemon-name">
        {name}
        <span className="left-panel__pokemon-id">no. {id}</span>
      </div>
      <PokemonImage src={sprites} />
      <div className="left-panel__pokemon-description">{description ?? ''}</div>;
    </div>
  );
}
