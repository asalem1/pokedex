import {RootState} from '../../app/store';

export const selectActivePokemon = (state: RootState) => state.pokemon.activePokemon;
export const selectAllPokemon = (state: RootState) => state.pokemon.allPokemon;
export const selectDescription = (state: RootState) => state.pokemon.description;
export const selectEvolutions = (state: RootState) => state.pokemon.evolutions;
export const selectSpeciesData = (state: RootState) => state.pokemon.speciesData;
export const selectStatus = (state: RootState) => state.pokemon.status;
