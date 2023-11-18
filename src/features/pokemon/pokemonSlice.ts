import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getPokemonByName, getAllPokemon, getEvolutions, getSpeciesData} from './pokemonAPI';
import {
  Evolution,
  FlavorTextEntry,
  LoadingState,
  PartialPokemon,
  Pokemon,
} from '../../types';

export interface PokemonState {
  activePokemon: Pokemon | null;
  allPokemon: PartialPokemon[];
  description: string;
  evolutions: Evolution | null;
  speciesData: any; // TODO: tighten this
  status: LoadingState;
}

const initialState: PokemonState = {
  activePokemon: null,
  allPokemon: [],
  description: '',
  evolutions: null,
  speciesData: {},
  status: LoadingState.NOT_STARTED,
};

export const setPokemonAsync = createAsyncThunk(
  'pokemon/getPokemonByName',
  async (name: string) => {
    const response = await getPokemonByName(name);
    return response;
  }
);

export const setPokemonEvolutions = createAsyncThunk(
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

export const getSpeciesDataAsync = createAsyncThunk(
  'pokemon/getSpeciesDataAsync',
  async (url: string) => {
    const response = await getSpeciesData(url);
    return response;
  }
);

export const getEvolutionAsync = createAsyncThunk(
  'pokemon/getEvolutionAsync',
  async (url: string) => {
    const response = await getEvolutions(url);
    return response;
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
        state.activePokemon = action.payload;
      })
      .addCase(setPokemonAsync.rejected, (state) => {
        state.status = LoadingState.ERROR;
      });
    builder
      .addCase(getSpeciesDataAsync.pending, (state) => {
        state.description = 'Loading...';
      })
      .addCase(getSpeciesDataAsync.fulfilled, (state, action) => {
        const descriptions = action.payload.flavor_text_entries
          .filter((flavorText: FlavorTextEntry) => flavorText.language.name === 'en')
          .map((flavorText: FlavorTextEntry) => flavorText.flavor_text);

        const description: string = descriptions[Math.floor(Math.random() * descriptions.length)];
        state.description = description;
        state.speciesData = action.payload;
      })
      .addCase(getSpeciesDataAsync.rejected, (state) => {
        state.description =
          'An error occurred while trying to search for the pokemon. Please try again.';
      })
    builder
      .addCase(getEvolutionAsync.fulfilled, (state, action) => {
        state.evolutions = action.payload;
      })
  },
});

export default pokemonSlice.reducer;
