import { combineReducers, createStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { paginationSlice } from './pokemonSlice';
import { pokemonPageSlice } from './pokemonPageSlice';

const rootReducer = combineReducers({
  pagination: paginationSlice.reducer,
  pokemonPage: pokemonPageSlice.reducer,
});

export const config = {
  key: 'root',
  storage,
};

const persisted = persistReducer(config, rootReducer);

// @ts-ignore
const store = createStore(persisted,   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
