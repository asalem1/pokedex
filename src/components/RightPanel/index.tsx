import React, {useCallback, useEffect, useRef, useState} from 'react';
import './RightPanel.css';
import {Loader} from '../Loader';
import {debounce} from '../../utils';
import {useAppSelector} from '../../app/hooks';
import {selectAllPokemon} from '../../features/pokemon/selectors';
import {LoadingState, PartialPokemon, Pokemon} from '../../types';
import {PokemonStats} from '../PokemonStats';
import {PokemonType} from '../PokemonType';
import {Evolution} from '../Evolution';
import {MoveList} from '../MoveList';

export function RightPanel(props: any) {
  const allPokemon = useAppSelector(selectAllPokemon) ?? [];
  const types = props.pData.types;
  const stats = props.pData.stats;
  const moves = props.pData.moves;
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const [pokemon, setPokemon] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState<LoadingState>(
    LoadingState.NOT_STARTED
  );
  const [searchHistory, setSearchHistory] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  // TODO: update the type to a pokemon
  const [searchResults, setSearchResults] = useState<PartialPokemon[]>([]);

  const debouncedGetPokemon = useCallback(
    debounce(async (value: string) => {
      try {
        // TODO: clean this up
        setLoading(LoadingState.LOADING);
        const filteredResults = allPokemon.filter((pokemon) => pokemon.name
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase()));
        setSearchHistory((prev: any[]) => {
          console.log({prev, value});
          return [...prev, value];
        });
        setSearchResults(filteredResults);
        setLoading(LoadingState.DONE);
      } catch (error) {
        setLoading(LoadingState.ERROR);
        console.error(error);
        setSearchResults([]);
      }
    }, 300),
    [allPokemon]
  );

  useEffect(() => {
    if (search) {
      debouncedGetPokemon(search);
    }
    if (!search && loading !== LoadingState.NOT_STARTED) {
      setLoading(LoadingState.NOT_STARTED);
      setSearchResults([]);
    }
  }, [debouncedGetPokemon, loading, search]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearch(newValue);
  };

  const handleInputClick = () => {
    setDropdownVisible(true);
  }

  const handleItemClick = (pokemon: PartialPokemon) => {
    console.log({pokemon})
    setSearch(pokemon.name);
    setDropdownVisible(false);
    // TODO: set the active pokemon
  }

  if (types) {
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
            {searchResults.map((pokemon, index) => (
              <li
                key={index}
                className="right-panel__list-item"
                onClick={() => handleItemClick(pokemon)}
              >
                {pokemon.name}
              </li>
            ))}
          </ul>
        )}
        <div className="panel-row">
          <PokemonStats stats={stats} />
          <PokemonType types={types} />
        </div>
        <Evolution evoSprites={props.evoSprites} evoNames={props.evoNames} />
        <MoveList moves={moves} />
      </div>
    );
  } else {
    return <Loader />;
  }
}
