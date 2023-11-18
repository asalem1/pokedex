import React from 'react'
import './PokemonImageSmall.css'
import { PokeBall } from '../PokeBall'
import { useAppDispatch } from '../../app/hooks'
import { setPokemonAsync } from '../../features/pokemon/pokemonSlice'

interface Props {
  evolution: {
    src?: string
    name?: string
  }
  evo: 'I' | 'II' | 'III'
  setSearch: (name: string) => void
}

export function PokemonImageSmall({ evo, evolution, setSearch }: Props) {
  const { src, name } = evolution
  const dispatch = useAppDispatch()

  let evoImage = <PokeBall />

  const handleImageClick = () => {
    if (name) {
      setSearch(name)
      dispatch(setPokemonAsync(name))
    }
  }

  if (src) {
    evoImage = (
      <img src={src} alt="pokemon" className="pokemon-sprite__small" onClick={handleImageClick} />
    )
  }

  return (
    <div>
      <div className="flex-center">
        <div className="evolution__number">{evo}</div>
      </div>
      {evoImage}
      <div className="evolution__name">{name || 'No Data'}</div>
    </div>
  )
}
