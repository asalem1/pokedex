import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getPokemonById, getAllPokemon} from './pokemonAPI';
import { PartialPokemon, Pokemon } from '../../types';

export interface PokemonState {
  activePokemon: Pokemon | null;
  allPokemon: PartialPokemon[];
  searchHistory: string[];
  searchedPokemon: string[];
  status: 'not_started' | 'done' | 'loading' | 'failed';
}

const initialState: PokemonState = {
  activePokemon: null,
  allPokemon: [],
  searchHistory: [],
  searchedPokemon: [],
  status: 'not_started',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const setPokemonAsync = createAsyncThunk(
  'pokemon/getPokemonById',
  async (id: number) => {
    const response = await getPokemonById(id);
    console.log({byId: response})
    // The value we return becomes the `fulfilled` action payload
    return response.results;
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
  reducers: {
    activePokemon: (state) => {
      console.log({state});
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPokemonAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllPokemonAsync.fulfilled, (state, action) => {
        state.status = 'done';
        console.log({action, payload: action.payload})
        state.allPokemon = action.payload;
      })
      .addCase(getAllPokemonAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {activePokemon} = pokemonSlice.actions;

export default pokemonSlice.reducer;
