import React, { useCallback, useEffect, useState } from 'react';
import {MoveLoader} from './MoveLoader';
import { MoveEntry } from './MoveEntry';
import { LoadingState, Move, PokemonMove } from '../../types';
import './MoveList.css';
import { getMove } from '../../features/pokemon/pokemonAPI';

interface Props {
  moves?: PokemonMove[];
}

export function MoveList({moves}: Props) {
  const [index, setIndex] = useState(0);
  const [currentMove, setCurrentMove] = useState<Move | null>(null);
  const [loading, setLoading] = useState(LoadingState.NOT_STARTED);

  const loadMoves = useCallback(async () => {
    setLoading(LoadingState.LOADING);
    setIndex(index);
    if (moves) {
      try {
        const url = moves[index].move.url;
        const data = await getMove(url);
        setCurrentMove(data);
        setLoading(LoadingState.DONE);
      } catch (error) {
        console.error({error});
        setCurrentMove(null);
        setLoading(LoadingState.ERROR);
      }
    }
  }, [moves, index]);

  useEffect(() => {
    loadMoves();
  }, [index, loadMoves]);

  const nextMove = () => {
    if (moves) {
      const nextIndex = Math.min(index + 1, moves.length - 1);
      setIndex(nextIndex);
    }
  };

  const previousMove = () => {
    const prevIndex = Math.max(index - 1, 0);
    setIndex(prevIndex);
  };

  const showMoveLoader =
    loading === LoadingState.LOADING || currentMove === null || moves == null;

  console.log({showMoveLoader, currentMove});
  return (
    <div className="move-list__wrapper">
      {showMoveLoader ? (
        <MoveLoader />
      ) : (
        <MoveEntry
          move={currentMove}
          level={moves[index].version_group_details[0].level_learned_at}
        />
      )}
      <div className="move-controls">
        <button
          className="move-arrow"
          onClick={previousMove}
          disabled={showMoveLoader}
        >
          <i className="fas fa-caret-up" />
        </button>
        <button
          className="move-arrow"
          onClick={nextMove}
          disabled={showMoveLoader}
        >
          <i className="fas fa-caret-down" />
        </button>
      </div>
    </div>
  );
}
