import React, { useCallback, useEffect } from 'react'
import './App.css'
import { LeftPanel } from './components/LeftPanel'
import { RightPanel } from './components/RightPanel'
import { Divider } from './components/Divider'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { getAllPokemonAsync, getSpeciesDataAsync } from './features/pokemon/pokemonSlice'
import { selectActivePokemon } from './features/pokemon/selectors'

function App() {
  const dispatch = useAppDispatch()
  const activePokemon = useAppSelector(selectActivePokemon)

  const handleGetAllPokemon = useCallback(() => {
    dispatch(getAllPokemonAsync())
  }, [dispatch])

  useEffect(() => {
    handleGetAllPokemon()
  }, [handleGetAllPokemon])

  const changePokemon = React.useCallback(() => {
    if (activePokemon != null) {
      const speciesRequest = activePokemon.species.url
      dispatch(getSpeciesDataAsync(speciesRequest))
    }
  }, [activePokemon, dispatch])

  React.useEffect(() => {
    if (activePokemon?.name) {
      changePokemon()
    }
  }, [changePokemon, activePokemon?.name])

  return (
    <div className="pokedex">
      <LeftPanel />
      <Divider />
      <RightPanel />
    </div>
  )
}

export default App
