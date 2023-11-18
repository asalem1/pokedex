import React from 'react'
import './PokemonType.css'
import { selectActivePokemon } from '../../features/pokemon/selectors'
import { useAppSelector } from '../../app/hooks'

export function PokemonType() {
  const activePokemon = useAppSelector(selectActivePokemon)

  return (
    <div className="type-list">
      <div className="panel-header">Types</div>
      <div className="type-box">
        {activePokemon?.types.map(({ type }) => {
          const typeName = type.name
          return (
            <div className={'type ' + typeName} key={typeName}>
              {typeName}
            </div>
          )
        })}
      </div>
    </div>
  )
}
