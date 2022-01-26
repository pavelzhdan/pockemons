import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateProps = {
  currentUrl: string;
  currentPokemon: any;
  abilities: { name: string; description: string }[];
};

const initialState: InitialStateProps = {
  currentUrl: '',
  currentPokemon: null,
  abilities: [],
};

export const pokemonPageSlice = createSlice({
  name: 'pokemonPage',
  initialState,
  reducers: {
    addPokemonUrl: (
      state: InitialStateProps,
      action: PayloadAction<string>
    ) => {
      return { ...state, currentUrl: action.payload };
    },
    addPokemon: (state: InitialStateProps, action: PayloadAction<any>) => {
      return { ...state, currentPokemon: action.payload };
    },
    addAbilitiesDescription: (
      state: InitialStateProps,
      action: PayloadAction<{ name: string; description: string }[]>
    ) => {
      return { ...state, abilities: [...action.payload] };
    },
  },
});

export const { addPokemonUrl, addPokemon, addAbilitiesDescription } =
  pokemonPageSlice.actions;
