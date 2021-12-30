import { combineReducers, createStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { paginationSlice } from './pockemonSlice';
import { pockemonPageSlice } from './pockeonPageSlice';

const rootReducer = combineReducers({
  pagination: paginationSlice.reducer,
  pockemonPage: pockemonPageSlice.reducer,
});

export const config = {
  key: 'root',
  storage,
};

const persisted = persistReducer(config, rootReducer);

const store = createStore(persisted);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
