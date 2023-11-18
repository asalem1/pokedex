import React, { useCallback, useEffect, useState } from 'react'
import { PokemonImageSmall } from '../PokemonImageSmall'
import './Evolution.css'
import { getPokemonByName } from '../../features/pokemon/pokemonAPI'
import { getEvolutionAsync } from '../../features/pokemon/pokemonSlice'
import { selectSpeciesData, selectEvolutions } from '../../features/pokemon/selectors'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

interface Evolution {
  src: string
  name: string
}

interface Props {
  setSearch: (name: string) => void
}

export function Evolution({ setSearch }: Props) {
  const speciesData = useAppSelector(selectSpeciesData)
  const evolutions = useAppSelector(selectEvolutions)
  const dispatch = useAppDispatch()
  const [evos, setEvos] = useState<Evolution[]>([])

  const getEvolutionMetadata = useCallback(() => {
    if (evolutions) {
      const first = evolutions.chain
      let second
      let third
      const evos = []
      if (first) {
        const e1 = getPokemonByName(first.species.name)
        evos.push(e1)
        second = first.evolves_to[0]
      }
      if (second) {
        const e2 = getPokemonByName(second.species.name)
        third = second.evolves_to[0]

        evos.push(e2)
      }
      if (third) {
        const e3 = getPokemonByName(third.species.name)
        evos.push(e3)
      }
      Promise.all(evos).then((data) => {
        const updatedEvolutions = []
        for (const evolution of data) {
          updatedEvolutions.push({
            name: evolution.name,
            src: evolution.sprites.front_default ?? '',
          })
        }
        setEvos(updatedEvolutions)
      })
    }
  }, [evolutions])

  useEffect(() => {
    if (evolutions?.chain) {
      getEvolutionMetadata()
    }
  }, [evolutions?.chain, getEvolutionMetadata])

  const changeEvolutions = useCallback(() => {
    if (speciesData != null) {
      const evo_chain = speciesData.evolution_chain.url
      dispatch(getEvolutionAsync(evo_chain))
    }
  }, [dispatch, speciesData])

  useEffect(() => {
    if (speciesData?.name) {
      changeEvolutions()
    }
  }, [changeEvolutions, speciesData?.name])

  const [evo1, evo2, evo3] = evos

  return (
    <>
      <div className="evolution__title">Evolutions</div>
      <div className="evolution__row">
        <PokemonImageSmall evolution={evo1} evo="I" setSearch={setSearch} />
        <PokemonImageSmall evolution={evo2} evo="II" setSearch={setSearch} />
        <PokemonImageSmall evolution={evo3} evo="III" setSearch={setSearch} />
      </div>
    </>
  )
}
