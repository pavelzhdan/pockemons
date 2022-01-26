import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateProps = {
  items: { name: string; url: string }[];
  allItems: { name: string; url: string }[];
  itemsToShow: { name: string; url: string }[];
  filteredItems: { name: string; url: string }[];
  searchFailed: boolean;
  comparisonItems: {
    id: string;
    pokemonName: string;
    image: string;
    hp: number;
    attack: number;
    defence: number;
    specialAttack: number;
    specialDefence: number;
    speed: number;
    height: number;
    weight: number;
    abilities: { ability: { name: string } }[];
    url: string;
  }[];
  totalQuantity: number;
  itemsPerPage: string;
  itemsOffset: string;
  nextUrl: string | null;
  previousUrl: string | null;
  isInitial: boolean;
  addedToComparison: { name: string; url: string }[];
};

const initialState: initialStateProps = {
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
    fetchData(
      state: initialStateProps,
      action: PayloadAction<{
        count: number;
        next: string | null;
        previous: string | null;
        results: { name: string; url: string }[];
      }>
    ) {
      return {
        ...state,
        itemsToShow: [...action.payload.results],
        nextUrl: action.payload.next,
        previousUrl: action.payload.previous,
        items: [...action.payload.results],
        totalQuantity: action.payload.count,
      };
    },
    setPageSize: (state: initialStateProps, action: PayloadAction<string>) => {
      return { ...state, itemsPerPage: action.payload };
    },
    nextPage: (
      state: initialStateProps,
      action: PayloadAction<{
        count: number;
        next: string | null;
        previous: string | null;
        results: { name: string; url: string }[];
      }>
    ) => {
      return {
        ...state,
        previousUrl: action.payload.previous,
        nextUrl: action.payload.next,
        items: action.payload.results,
        itemsToShow: action.payload.results,
      };
    },
    prevPage: (
      state: initialStateProps,
      action: PayloadAction<{
        count: number;
        next: string | null;
        previous: string | null;
        results: { name: string; url: string }[];
      }>
    ) => {
      return {
        ...state,
        previousUrl: action.payload.previous,
        nextUrl: action.payload.next,
        items: action.payload.results,
        itemsToShow: [...state.items],
      };
    },
    addAllPokemons: (
      state: initialStateProps,
      action: PayloadAction<{ name: string; url: string }[]>
    ) => {
      return { ...state, allItems: action.payload };
    },
    showSearchResults: (
      state: initialStateProps,
      action: PayloadAction<{ name: string; url: string }[] | []>
    ) => {
      return {
        ...state,
        filteredItems: action.payload,
        itemsToShow: [...state.filteredItems],
      };
    },
    searchFailed: (state: initialStateProps) => {
      return { ...state, searchFailed: true, itemsToShow: [] };
    },
    searchSuccess: (state: initialStateProps) => {
      return { ...state, searchFailed: false };
    },
    searchEmpty: (state: initialStateProps) => {
      return { ...state, filteredItems: [], itemsToShow: [...state.items] };
    },
    addToComparison: (
      state: initialStateProps,
      action: PayloadAction<{ name: string; url: string }>
    ) => {
      return {
        ...state,
        addedToComparison: [...state.addedToComparison, action.payload],
      };
    },
    addToShowComparison: (
      state: initialStateProps,
      action: PayloadAction<{
        id: string;
        pokemonName: string;
        image: string;
        hp: number;
        attack: number;
        defence: number;
        specialAttack: number;
        specialDefence: number;
        speed: number;
        height: number;
        weight: number;
        abilities: [];
        url: string;
      }>
    ) => {
      return {
        ...state,
        comparisonItems: [...state.comparisonItems, action.payload],
      };
    },
    deleteShowComparison: (state: initialStateProps) => {
      return { ...state, comparisonItems: [] };
    },
    toggleComparison(
      state: initialStateProps,
      action: PayloadAction<{ name: string; url: string }>
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

export const {
  nextPage,
  setPageSize,
  prevPage,
  addAllPokemons,
  searchFailed,
  searchSuccess,
  showSearchResults,
  searchEmpty,
  toggleComparison,
  addToShowComparison,
  deleteShowComparison,
} = paginationSlice.actions;

export const paginationActions = paginationSlice.actions;
