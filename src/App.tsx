import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import {LeftPanel} from "./components/LeftPanel";
import {RightPanel} from "./components/RightPanel";
import { Divider } from "./components/Divider";
import {useAppDispatch, useAppSelector} from './app/hooks';
import { getAllPokemonAsync, getSpeciesDataAsync } from "./features/pokemon/pokemonSlice";
import { selectActivePokemon } from "./features/pokemon/selectors";

const API = "https://pokeapi.co/api/v2/pokemon/"

function App() {
    const dispatch = useAppDispatch();
    const activePokemon = useAppSelector(selectActivePokemon);

    const [evoSprites, setEvoSprites] = useState<string[]>([]);
    const [evoNames, setEvoNames] = useState<string[]>([]);

    const handleGetAllPokemon = useCallback(() => {
      dispatch(getAllPokemonAsync());
    }, [dispatch]);

    useEffect(() => {
      handleGetAllPokemon();
    }, [handleGetAllPokemon]);

    const changePokemon = React.useCallback(() => {
      // TODO: move this up
      console.log('changing pokemon: ', activePokemon);
      if (activePokemon != null) {
        const speciesRequest = activePokemon.species.url;
        dispatch(getSpeciesDataAsync(speciesRequest));

        fetch(speciesRequest)
          .then((response) => response.json())
          .then((data) => {
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
                    const sprites = dataList.map(
                      (v) => v.sprites.front_default
                    );
                    const names = dataList.map((n) => n.name);
                    setEvoSprites(sprites);
                    setEvoNames(names);
                  });
              });
          });
      }
    }, [activePokemon, dispatch]);

    React.useEffect(() => {
      if (activePokemon?.name) {
        changePokemon();
      }
    }, [changePokemon, activePokemon?.name]);

    return (
      <div className="pokedex">
        <LeftPanel />
        <Divider />
        <RightPanel
          evoSprites={evoSprites}
          evoNames={evoNames}
        />
      </div>
    );
}



export default App
