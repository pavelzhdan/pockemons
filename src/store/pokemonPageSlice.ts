import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemDescription, PokemonPageState } from '../types';

const initialState: PokemonPageState = {
  currentUrl: '',
  currentPokemon: {
    id: 0,
    name: '',
    image: '',
    types: [{ type: { name: '', url: '' } }],
    stats: [{ base_stat: 0, stat: { name: '', url: '' } }],
    abilities: [{ ability: { name: '', url: '' } }],
  },
  abilities: [],
};

export const pokemonPageSlice = createSlice({
  name: 'pokemonPage',
  initialState,
  reducers: {
    addPokemonUrl: (state: PokemonPageState, action: PayloadAction<string>) => {
      return { ...state, currentUrl: action.payload };
    },
    addPokemon: (state: PokemonPageState, action: PayloadAction<any>) => {
      return { ...state, currentPokemon: action.payload };
    },
    addAbilitiesDescription: (
      state: PokemonPageState,
      action: PayloadAction<ItemDescription[]>
    ) => {
      return { ...state, abilities: [...action.payload] };
    },
  },
});

export const pokemonPageActions = pokemonPageSlice.actions;
