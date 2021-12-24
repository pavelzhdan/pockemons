import { configureStore } from '@reduxjs/toolkit';
import { paginationSlice } from './pockemonSlice';
import { pockemonPageSlice } from './pockeonPageSlice';

const store = configureStore({
  reducer: {
    pagination: paginationSlice.reducer,
    pockemonPage: pockemonPageSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
