import React, { useCallback, useEffect, useState } from 'react';
import {MoveLoader} from './MoveLoader';
import { MoveEntry } from './MoveEntry';
import { LoadingState, Move } from '../../types';
import './MoveList.css';

export function MoveList(props: any) {
  const [index, setIndex] = useState(0);
  const [currentMove, setCurrentMove] = useState<Move | null>(null);
  const [loading, setLoading] = useState(LoadingState.NOT_STARTED);

  const loadMoves = useCallback(() => {
    setLoading(LoadingState.LOADING);
    setIndex(index);
    fetch(props.moves[index].move.url)
      .then(res => res.json())
      .then(data => {
        setCurrentMove(data)
        setLoading(LoadingState.DONE)
      })
      .catch((error) => {
        console.error({error});
        setCurrentMove(null)
        setLoading(LoadingState.ERROR)
      })

  }, [props.moves, index])

  useEffect(() => {
    loadMoves();
  }, [index, loadMoves])


  const nextMove = () => {
    const nextIndex = Math.min(
      index + 1,
      props.moves.length - 1
    );
    setIndex(nextIndex)
  }

  const previousMove = () => {
    const prevIndex = Math.max(index - 1, 0);
    setIndex(prevIndex);
  }

  const showMoveLoader = loading === LoadingState.LOADING || currentMove === null;

  return (
    <div className="move-list">
      {showMoveLoader ? (
        <MoveLoader />
      ) : (
        <MoveEntry
          move={currentMove}
          level={props.moves[index].version_group_details[0].level_learned_at}
        />
      )}
      <div className="move-controls">
        <div className="move-arrow" onClick={previousMove}>
          <i className="fas fa-caret-up" />
        </div>
        <div className="move-arrow" onClick={nextMove}>
          <i className="fas fa-caret-down" />
        </div>
      </div>
    </div>
  );
}
