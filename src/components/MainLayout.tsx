import React from 'react';
import Header from './Header';
import PockemonCard from './PockemonCard';
import Pagination from './Pagination';
import { addAllPockemons, paginationActions } from '../store/pockemonSlice';
import { RootState } from '../store/store';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import LoadingSpinner from './LoadingSpinner';

const MainLayout = function (): React.ReactElement {
  const dispatch = useAppDispatch();
  const items = useAppSelector(
    (state: RootState) => state.pagination.itemsToShow,
  );
  const offset = useAppSelector(
    (state: RootState) => state.pagination.itemsOffset,
  );
  const itemsPerPage = useAppSelector(
    (state: RootState) => state.pagination.itemsPerPage,
  );
  const totalQuantity = useAppSelector(
    (state: RootState) => state.pagination.totalQuantity,
  );

  React.useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${itemsPerPage}&offset=${offset}`,
    )
      .then((data) => data.json())
      .then((response) => {
        dispatch(paginationActions.fetchData(response));
      });
  }, [offset, itemsPerPage]);

  React.useEffect(() => {
    if (totalQuantity !== 0) {
      fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${totalQuantity}&offset=0`,
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch(addAllPockemons(data.results));
        });
    }
  }, [totalQuantity]);

  return (
    <main className="main-layout">
      <Header />
      <div className="content-wrapper">
        {items.map((item: { name: string; url: string }, index: number) => (
          <PockemonCard
            name={item.name}
            link={item.url}
            key={index.toString()}
          />
        ))}
        {items.length === 0 && <LoadingSpinner />}
      </div>
      <Pagination />
    </main>
  );
};

export default MainLayout;
