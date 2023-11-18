import React from 'react'
import './MoveList.css'
import { Move } from '../../types'

interface Props {
  level: number
  move: Move
}

export function MoveEntry({ move, level }: Props) {
  const name = move.name || move.names.filter((m) => m.language.name === 'en')[0].name
  const acc = move.accuracy
  const pow = move.power
  const pp = move.pp
  const type = move.type.name
  return (
    <div className="move-entry__wrapper">
      <div className="move-entry__left-panel">
        <div className="move-entry__name">{name}</div>
        <div className="move-entry__stat">
          <span>Accuracy</span>
          <span>{acc}</span>
        </div>
        <div className="move-entry__stat">
          <span>Power</span>
          <span>{pow}</span>
        </div>
        <div className="move-entry__stat">
          <span>PP</span>
          <span>{pp}</span>
        </div>
      </div>
      <div className="move-entry__right-panel">
        <div className="move-entry__type">Type: {type}</div>
        <div className="move-entry__learn">
          <span>Learn:</span>
          <span>Lvl {level}</span>
        </div>
      </div>
    </div>
  )
}
