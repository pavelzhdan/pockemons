import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialStateProps {
  items: { name: string; url: string }[];
  allItems: { name: string; url: string }[];
  itemsToShow: { name: string; url: string }[];
  filteredItems: { name: string; url: string }[];
  searchFailed: boolean;
  comparisonItems: {
    pockemonName: string;
    image: string;
    hp: number;
    attack: number;
    defence: number;
    specialAttack: number;
    specialDefence: number;
    speed: number;
    height: number,
    weight: number,
    abilities: { ability: { name: string } }[];
    url: string
  }[];
  totalQuantity: number;
  itemsPerPage: string;
  itemsOffset: string;
  nextUrl: string | null;
  previousUrl: string | null;
  isInitial: boolean;
  addedToComparison: { name: string; url: string }[];
}

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
      }>,
    ) {
      if (state.isInitial) {
        state.isInitial = false;

        state.totalQuantity = action.payload.count;
      }
      state.nextUrl = action.payload.next;
      state.previousUrl = action.payload.previous;
      state.items = [...action.payload.results];
      state.itemsToShow = [...action.payload.results];
    },
    setPageSize: (state: initialStateProps, action: PayloadAction<string>) => {
      state.itemsPerPage = action.payload;
    },
    nextPage: (
      state: initialStateProps,
      action: PayloadAction<{
        count: number;
        next: string | null;
        previous: string | null;
        results: { name: string; url: string }[];
      }>,
    ) => {
      state.previousUrl = action.payload.previous;
      state.nextUrl = action.payload.next;
      state.items = action.payload.results;
      state.itemsToShow = action.payload.results;
    },
    prevPage: (
      state: initialStateProps,
      action: PayloadAction<{
        count: number;
        next: string | null;
        previous: string | null;
        results: { name: string; url: string }[];
      }>,
    ) => {
      state.previousUrl = action.payload.previous;
      state.nextUrl = action.payload.next;
      state.items = action.payload.results;
      state.itemsToShow = [...state.items];
    },
    addAllPockemons: (
      state: initialStateProps,
      action: PayloadAction<{ name: string; url: string }[]>,
    ) => {
      state.allItems = action.payload;
    },
    showSearchResults: (
      state: initialStateProps,
      action: PayloadAction<{ name: string; url: string }[] | []>,
    ) => {
      state.filteredItems = action.payload;
      state.itemsToShow = [...state.filteredItems];
    },
    searchFailed: (state: initialStateProps) => {
      state.searchFailed = true;
      state.itemsToShow = [];
    },
    searchSuccess: (state: initialStateProps) => {
      state.searchFailed = false;
    },
    searchEmpty: (state: initialStateProps) => {
      state.filteredItems = [];
      state.itemsToShow = [...state.items];
    },
    addToComparison: (
      state: initialStateProps,
      action: PayloadAction<{ name: string; url: string }>,
    ) => {
      state.addedToComparison.push(action.payload);
    },
    addToShowComparison: (
      state: initialStateProps,
      action: PayloadAction<{
        pockemonName: string;
        image: string;
        hp: number;
        attack: number;
        defence: number;
        specialAttack: number;
        specialDefence: number;
        speed: number;
        height: number,
        weight: number,
        abilities: [],
        url: string,
      }>,
    ) => {
      state.comparisonItems.push(action.payload);
    },
    deleteShowComparison: (
      state: initialStateProps,
    ) => {
      state.comparisonItems = [];
    },
    toggleComparison(
      state: initialStateProps,
      action: PayloadAction<{ name: string; url: string }>,
    ) {
      const newArray = state.addedToComparison.filter(
        (item) => item.name !== action.payload.name,
      );
      if (newArray.length === state.addedToComparison.length) {
        state.addedToComparison.push(action.payload);
      } else {
        state.addedToComparison = newArray;
      }
    },
  },
});

export const {
  nextPage,
  setPageSize,
  prevPage,
  addAllPockemons,
  searchFailed,
  searchSuccess,
  showSearchResults,
  searchEmpty,
  toggleComparison,
  addToShowComparison,
  deleteShowComparison,
} = paginationSlice.actions;

export const paginationActions = paginationSlice.actions;
