import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ChangePageData,
  InitialData,
  ItemApi,
  PokemonData,
  PokemonPaginationState,
} from '../types';

const initialState: PokemonPaginationState = {
  items: [],
  allItems: [],
  itemsToShow: [],
  filteredItems: [],
  searchFailed: false,
  comparisonItems: [],
  totalQuantity: 0,
  itemsOffset: '0',
  itemsPerPage: '10',
  nextUrl: null,
  previousUrl: null,
  isInitial: true,
  addedToComparison: [],
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    getFirstData: (
      state: PokemonPaginationState,
      action: PayloadAction<InitialData>
    ): PokemonPaginationState => ({
      ...state,
      itemsToShow: [...action.payload.results],
      nextUrl: action.payload.next,
      previousUrl: action.payload.previous,
      items: [...action.payload.results],
      totalQuantity: action.payload.count,
    }),
    setPageSize: (
      state: PokemonPaginationState,
      action: PayloadAction<string>
    ): PokemonPaginationState => ({ ...state, itemsPerPage: action.payload }),
    goToNextPage: (
      state: PokemonPaginationState,
      action: PayloadAction<ChangePageData>
    ): PokemonPaginationState => ({
      ...state,
      previousUrl: action.payload.previous,
      nextUrl: action.payload.next,
      items: action.payload.results,
      itemsToShow: action.payload.results,
    }),
    goToPrevPage: (
      state: PokemonPaginationState,
      action: PayloadAction<ChangePageData>
    ): PokemonPaginationState => ({
      ...state,
      previousUrl: action.payload.previous,
      nextUrl: action.payload.next,
      items: action.payload.results,
      itemsToShow: [...state.items],
    }),
    addAllPokemons: (
      state: PokemonPaginationState,
      action: PayloadAction<ItemApi[]>
    ): PokemonPaginationState => ({ ...state, allItems: action.payload }),
    showSearchResults: (
      state: PokemonPaginationState,
      action: PayloadAction<ItemApi[] | []>
    ): PokemonPaginationState => ({
      ...state,
      filteredItems: action.payload,
      itemsToShow: [...action.payload],
    }),
    setSearchFailed: (
      state: PokemonPaginationState
    ): PokemonPaginationState => ({
      ...state,
      searchFailed: true,
      itemsToShow: [],
    }),
    setSearchSuccess: (
      state: PokemonPaginationState
    ): PokemonPaginationState => ({ ...state, searchFailed: false }),
    setSearchEmpty: (
      state: PokemonPaginationState
    ): PokemonPaginationState => ({
      ...state,
      filteredItems: [],
      itemsToShow: [...state.items],
      searchFailed: false,
    }),
    addToComparison: (
      state: PokemonPaginationState,
      action: PayloadAction<ItemApi>
    ): PokemonPaginationState => ({
      ...state,
      addedToComparison: [...state.addedToComparison, action.payload],
    }),
    addToShowComparison: (
      state: PokemonPaginationState,
      action: PayloadAction<PokemonData>
    ): PokemonPaginationState => ({
      ...state,
      comparisonItems: [...state.comparisonItems, action.payload],
    }),
    deleteShowComparison: (
      state: PokemonPaginationState
    ): PokemonPaginationState => ({ ...state, comparisonItems: [] }),
    toggleComparison(
      state: PokemonPaginationState,
      action: PayloadAction<ItemApi>
    ) {
      const newArray = state.addedToComparison.filter(
        (item) => item.name !== action.payload.name
      );
      if (newArray.length === state.addedToComparison.length) {
        return {
          ...state,
          addedToComparison: [...state.addedToComparison, action.payload],
        };
      }
      return { ...state, addedToComparison: newArray };
    },
  },
});

export const paginationActions = paginationSlice.actions;
