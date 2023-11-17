import { NetworkResponse, PartialPokemon, Pokemon } from "../../types";

const API = 'https://pokeapi.co/api/v2/pokemon/';
const ALL_POKEMON_COUNT = 1292;

export function getPokemonById(id: number): Promise<NetworkResponse<Pokemon[]>> {
  const request = `${API}${id}/`;
  return fetch(request, {
    cache: 'force-cache',
  }).then((response) => response.json());
}

export function getAllPokemon(): Promise<NetworkResponse<PartialPokemon[]>> {
  /**
   * NOTE: no need to filter out the fields since the API will do that by default
   * to return a partial pokemon:
   * { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/"}
   * ...
   */
  const request = `${API}?limit=${ALL_POKEMON_COUNT}`;
  return fetch(request, {
    cache: 'force-cache',
  }).then((response) => response.json());
}