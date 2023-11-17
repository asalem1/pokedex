import React from "react";
import { PokemonImageSmall } from "../PokemonImageSmall";

interface Props {
  evoSprites: string[];
  evoNames: string[];
}

export function Evolution({ evoNames, evoSprites }: Props) {
  const [evo1, evo2, evo3] = evoSprites;
  const [name1, name2, name3] = evoNames;

  return (
    <div className="panel-row panel-evo">
      <div className="panel-header evo-header">Evolutions</div>
      <PokemonImageSmall src={evo1} evo="I" name={name1} />
      <PokemonImageSmall src={evo2} evo="II" name={name2} />
      <PokemonImageSmall src={evo3} evo="III" name={name3} />
    </div>
  );
}
