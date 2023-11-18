import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getPokemonByName, getAllPokemon} from './pokemonAPI';
import { LoadingState, PartialPokemon, Pokemon } from '../../types';

export interface PokemonState {
  activePokemon: Pokemon | null;
  allPokemon: PartialPokemon[];
  status: LoadingState;
}

const initialState: PokemonState = {
  activePokemon: null,
  allPokemon: [],
  status: LoadingState.NOT_STARTED,
};

export const setPokemonAsync = createAsyncThunk(
  'pokemon/getPokemonByName',
  async (name: string) => {
    const response = await getPokemonByName(name);
    return response;
  }
);

export const getAllPokemonAsync = createAsyncThunk(
  'pokemon/getAllPokemon',
  async () => {
    const response = await getAllPokemon();
    return response.results;
  }
);

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPokemonAsync.pending, (state) => {
        state.status = LoadingState.LOADING;
      })
      .addCase(getAllPokemonAsync.fulfilled, (state, action) => {
        state.status = LoadingState.DONE;
        state.allPokemon = action.payload;
      })
      .addCase(getAllPokemonAsync.rejected, (state) => {
        state.status = LoadingState.ERROR;
      });
    builder
      .addCase(setPokemonAsync.pending, (state) => {
        state.status = LoadingState.LOADING;
      })
      .addCase(setPokemonAsync.fulfilled, (state, action) => {
        state.status = LoadingState.DONE;
        console.log({action, payload: action.payload})
        state.activePokemon = action.payload;
      })
      .addCase(setPokemonAsync.rejected, (state) => {
        state.status = LoadingState.ERROR;
      });
  },
});

export default pokemonSlice.reducer;
