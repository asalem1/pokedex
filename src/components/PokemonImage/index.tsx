import React from 'react'
import './PokemonImage.css'
import { Sprite } from '../../types'

interface Props {
  src: Sprite
}

export function PokemonImage({ src }: Props) {
  const imgSrc = src?.['front_default'] ?? ''

  return (
    <div>
      <img src={imgSrc} alt="pokemon" className="pokemon-sprite" />
    </div>
  )
}
