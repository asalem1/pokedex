import React from 'react'
import './PokemonStats.css'
import { selectActivePokemon } from '../../features/pokemon/selectors'
import { useAppSelector } from '../../app/hooks'

export function PokemonStats() {
  const activePokemon = useAppSelector(selectActivePokemon)

  return (
    <div className="pokemon-stats__wrapper">
      {activePokemon?.stats.map((s) => {
        const name = s.stat.name
        const value = s.base_stat ?? 'xx'

        return (
          <div className="stat-line" key={name}>
            <span>{name}</span>
            <span>{value}</span>
          </div>
        )
      })}
    </div>
  )
}
