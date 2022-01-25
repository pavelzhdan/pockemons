import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateProps = {
  currentUrl: string;
  currentPockemon: any;
  abilities: { name: string; description: string }[];
}

const initialState: InitialStateProps = {
  currentUrl: '',
  currentPockemon: null,
  abilities: [],
};

export const pockemonPageSlice = createSlice({
  name: 'pockemonPage',
  initialState,
  reducers: {
    addPockemonUrl: (
      state: InitialStateProps,
      action: PayloadAction<string>,
    ) => {
      state.currentUrl = action.payload;
    },
    addPockemon: (state: InitialStateProps, action: PayloadAction<any>) => {
      state.currentPockemon = action.payload;
    },
    addAbilitiesDescription: (
      state: InitialStateProps,
      action: PayloadAction<{ name: string; description: string }[]>,
    ) => {
      state.abilities = [];
      state.abilities.push(...action.payload);
    },
  },
});

export const { addPockemonUrl, addPockemon, addAbilitiesDescription } = pockemonPageSlice.actions;
