import React, { useCallback, useEffect, useState } from "react";
import { PokemonImageSmall } from "../PokemonImageSmall";
import './Evolution.css';
import { getPokemonByName } from "../../features/pokemon/pokemonAPI";
import {
  getEvolutionAsync,
} from '../../features/pokemon/pokemonSlice';
import { selectSpeciesData, selectEvolutions } from "../../features/pokemon/selectors";
import {useAppSelector, useAppDispatch} from '../../app/hooks';

export function Evolution() {
  const speciesData = useAppSelector(selectSpeciesData);
  const evolutions = useAppSelector(selectEvolutions);
  const dispatch = useAppDispatch();
  const [evoSprites, setEvoSprites] = useState<string[]>([]);
  const [evoNames, setEvoNames] = useState<string[]>([]);

  const getEvolutionMetadata = useCallback(() => {
    if (evolutions) {
      const first = evolutions.chain;
      let second;
      let third;
      let evos = [];
      if (first) {
        const e1 = getPokemonByName(first.species.name);
        evos.push(e1);
        second = first.evolves_to[0];
      }
      if (second) {
        const e2 = getPokemonByName(second.species.name);
        third = second.evolves_to[0];

        evos.push(e2);
      }
      if (third) {
        const e3 = getPokemonByName(third.species.name);
        evos.push(e3);
      }
      Promise.all(evos)
        .then((data) => {
          const sprites = data.map((v) => v.sprites.front_default ?? '');
          const names = data.map((n) => n.name);
          setEvoSprites(sprites);
          setEvoNames(names);
        });
    }
  }, [evolutions])


  useEffect(() => {
    if (evolutions?.chain) {
      getEvolutionMetadata();
    }
  }, [evolutions?.chain, getEvolutionMetadata]);

  const changeEvolutions = useCallback(() => {
    if (speciesData != null) {
      const evo_chain = speciesData.evolution_chain.url;
      dispatch(getEvolutionAsync(evo_chain));
    }
  }, [dispatch, speciesData]);

  useEffect(() => {
    if (speciesData?.name) {
      changeEvolutions();
    }
  }, [changeEvolutions, speciesData?.name]);

  const [evo1, evo2, evo3] = evoSprites;
  const [name1, name2, name3] = evoNames;

  return (
    <>
      <div className="evolution__title">Evolutions</div>
      <div className="evolution__row">
        <PokemonImageSmall src={evo1} evo="I" name={name1} />
        <PokemonImageSmall src={evo2} evo="II" name={name2} />
        <PokemonImageSmall src={evo3} evo="III" name={name3} />
      </div>
    </>
  );
}
