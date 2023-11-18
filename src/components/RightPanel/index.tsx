import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import './RightPanel.css'
import { debounce } from '../../utils'
import { selectAllPokemon } from '../../features/pokemon/selectors'
import { LoadingState, PartialPokemon } from '../../types'
import { PokemonStats } from '../PokemonStats'
import { PokemonType } from '../PokemonType'
import { Evolution } from '../Evolution'
import { MoveList } from '../MoveList'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setPokemonAsync } from '../../features/pokemon/pokemonSlice'

const SAVED_SEARCH_ID = 'searchHistory'

export function RightPanel() {
  const allPokemon = useAppSelector(selectAllPokemon) ?? []
  const dispatch = useAppDispatch()

  const inputRef: RefObject<HTMLInputElement> = useRef(null)
  const dropdownRef: RefObject<HTMLUListElement> = useRef(null)

  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [loading, setLoading] = useState<LoadingState>(LoadingState.NOT_STARTED)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<PartialPokemon[]>([])

  const debouncedGetPokemon = useCallback(
    debounce(async (value: string) => {
      try {
        setLoading(LoadingState.LOADING)
        const filteredResults = allPokemon.filter((pokemon) =>
          pokemon.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
        )
        setSearchResults(filteredResults)
        setLoading(LoadingState.DONE)
      } catch (error) {
        setLoading(LoadingState.ERROR)
        console.error(error)
        setSearchResults([])
      }
    }, 300),
    [allPokemon],
  )

  useEffect(() => {
    const localSearchHistory = localStorage.getItem(SAVED_SEARCH_ID)
    if (localSearchHistory && typeof localSearchHistory === 'string') {
      setSearchHistory(JSON.parse(localSearchHistory))
    }
  }, [])

  useEffect(() => {
    if (search) {
      debouncedGetPokemon(search)
    }
    if (!search && loading !== LoadingState.NOT_STARTED) {
      setLoading(LoadingState.NOT_STARTED)
      setSearchResults([])
    }
  }, [debouncedGetPokemon, loading, search])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current?.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current?.contains(event.target as Node)
      ) {
        setDropdownVisible(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setSearch(newValue)
  }

  const handleInputClick = () => {
    setDropdownVisible(true)
  }

  const handleItemClick = (pokemon: PartialPokemon) => {
    setSearch(pokemon.name)
    const updatedHistory = searchHistory.slice()
    if (!searchHistory.includes(pokemon.name)) {
      updatedHistory.push(pokemon.name)
    }
    localStorage.setItem(SAVED_SEARCH_ID, JSON.stringify(updatedHistory))
    setSearchHistory(updatedHistory)
    setDropdownVisible(false)
    dispatch(setPokemonAsync(pokemon.name))
  }

  const handlePastSearchClick = (pokemonName: string) => {
    setSearch(pokemonName)
    dispatch(setPokemonAsync(pokemonName))
  }

  const showEmpty = searchResults.length === 0 && search.length > 0 && loading === LoadingState.DONE

  return (
    <div className="right-panel__wrapper">
      <input
        className="pokedex__search"
        placeholder="Search..."
        value={search}
        onChange={handleInputChange}
        onClick={handleInputClick}
        ref={inputRef}
      />
      {dropdownVisible && (
        <ul
          className="right-panel__list-wrapper"
          ref={dropdownRef}
          style={{
            width: inputRef.current?.clientWidth,
          }}
        >
          {searchResults.length > 0 &&
            searchResults.map((pokemon, index) => (
              <li
                key={index}
                className="right-panel__list-item"
                onClick={() => handleItemClick(pokemon)}
              >
                {pokemon.name}
              </li>
            ))}
          {showEmpty && <li className="right-panel__list-item">no match for "{search}""</li>}
        </ul>
      )}
      <div className="panel-row">
        <div className="right-panel__searched-items">
          Previously Searched Items:
          <ul className="search-items__list">
            {searchHistory.map((pokemonName, index) => (
              <li
                className="search-items__list-item"
                key={index}
                onClick={() => handlePastSearchClick(pokemonName)}
              >
                {pokemonName}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="panel-row">
        <PokemonStats />
        <PokemonType />
      </div>
      <Evolution />
      <MoveList />
    </div>
  )
}
