import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialStateProps {
  currentUrl: string;
  currentPockemon: any;
  abilities: { name: string; description: string }[];
}

const initialState: initialStateProps = {
  currentUrl: '',
  currentPockemon: null,
  abilities: [],
};

export const pockemonPageSlice = createSlice({
  name: 'pockemonPage',
  initialState,
  reducers: {
    addPockemonUrl: (
      state: initialStateProps,
      action: PayloadAction<string>,
    ) => {
      state.currentUrl = action.payload;
    },
    addPockemon: (state: initialStateProps, action: PayloadAction<any>) => {
      state.currentPockemon = action.payload;
    },
    addAbilitiesDescription: (
      state: initialStateProps,
      action: PayloadAction<{ name: string; description: string }[]>,
    ) => {
      state.abilities = [];
      state.abilities.push(...action.payload);
    },
  },
});

export const { addPockemonUrl, addPockemon, addAbilitiesDescription } = pockemonPageSlice.actions;
