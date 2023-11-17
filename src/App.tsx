import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import {LeftPanel} from "./components/LeftPanel";
import {RightPanel} from "./components/RightPanel";
import { Divider } from "./components/Divider";
import {useAppDispatch} from './app/hooks';
import { getAllPokemonAsync } from "./features/pokemon/pokemonSlice";
import { FlavorTextEntry } from "./types";

const POKEMON_ID = 1;

const API = "https://pokeapi.co/api/v2/pokemon/"

function App() {
    const dispatch = useAppDispatch();

    const [pokemonId, setPokemonId] = useState(POKEMON_ID);
    const [pokemonData, setPokemonData] = useState({});
    const [pokemonDescription, setPokemonDescription] = useState('');
    const [speciesData, setSpeciesData] = useState({});
    const [evoSprites, setEvoSprites] = useState<string[]>([]);
    const [evoNames, setEvoNames] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleGetAllPokemon = useCallback(() => {
      dispatch(getAllPokemonAsync());
    }, [dispatch]);

    useEffect(() => {
      handleGetAllPokemon();
    }, [handleGetAllPokemon]);

    const changePokemon = React.useCallback((index: number) => {
      setLoading(true);
      const request = `${API}${index}/`;
      fetch(request, {
        cache: 'force-cache',
      })
        .then((response) => response.json())
        .then((data) => {
          setPokemonData(data);
          setPokemonId(data.id);
          const speciesRequest = data.species.url;
          return fetch(speciesRequest);
        })
        .then((response) => response.json())
        .then((data) => {
          setSpeciesData(data);
          const descriptions = data.flavor_text_entries
            .filter(
              (flavorText: FlavorTextEntry) => flavorText.language.name === 'en'
            )
            .map((flavorText: FlavorTextEntry) => flavorText.flavor_text);
          const description: string =
            descriptions[Math.floor(Math.random() * descriptions.length)];
          setPokemonDescription(description);
          setLoading(false);
          const evo_chain = data.evolution_chain.url;
          fetch(evo_chain)
            .then((response) => response.json())
            .then((data) => {
              const first = data.chain;
              let second;
              let third;
              let evos = [];
              if (first) {
                const e1 = fetch(`${API}${first.species.name}/`);
                evos.push(e1);
                second = first.evolves_to[0];
              }
              if (second) {
                const e2 = fetch(`${API}${second.species.name}/`);
                third = second.evolves_to[0];

                evos.push(e2);
              }
              if (third) {
                const e3 = fetch(`${API}${third.species.name}/`);
                evos.push(e3);
              }
              Promise.all(evos)
                .then((responses) =>
                  Promise.all(responses.map((value) => value.json()))
                )
                .then((dataList) => {
                  const sprites = dataList.map((v) => v.sprites.front_default);
                  const names = dataList.map((n) => n.name);
                  setEvoSprites(sprites);
                  setEvoNames(names);
                });
            });
        });
    }, [pokemonId]);

    React.useEffect(() => {
      // TODO: connect this with the selected pokemon
      changePokemon(POKEMON_ID);
    }, [changePokemon]);

    return (
      <div className="pokedex">
        <LeftPanel
          pData={pokemonData}
          id={pokemonId}
          description={pokemonDescription}
        />
        <Divider />
        <RightPanel
          pData={pokemonData}
          sData={speciesData}
          evoSprites={evoSprites}
          evoNames={evoNames}
          no={pokemonId}
        />
      </div>
    );
}



export default App
