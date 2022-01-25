import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { addAllPockemons, paginationActions } from '../store/pockemonSlice';
import { PockemonCard } from '../components/pockemonCard/PockemonCard';
import { LoadingSpinner } from '../components/loadingSpinner/LoadingSpinner';
import { Pagination } from '../components/pagination/Pagination';
import { MainLayout } from '../components/layout/MainLayout';
import { NoResultsBanner } from '../components/noResultsBanner/NoResultsBanner';

export const Catalogue = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const {
    itemsToShow, itemsOffset, itemsPerPage, totalQuantity, searchFailed,
  } = useAppSelector((state: RootState) => state.pagination);

  React.useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${itemsPerPage}&offset=${itemsOffset}`,
    )
      .then((data) => data.json())
      .then((response) => {
        dispatch(paginationActions.fetchData(response));
      })
      .catch((error) => alert(error));
  }, [itemsOffset, itemsPerPage]);

  React.useEffect(() => {
    if (totalQuantity !== 0) {
      fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${totalQuantity}&offset=0`,
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch(addAllPockemons(data.results));
        })
        .catch((error) => alert(error));
    }
  }, [totalQuantity]);

  return (
    <MainLayout>
      {itemsToShow.length === 0 && !searchFailed && <LoadingSpinner />}
      {searchFailed ? <NoResultsBanner /> : (
        <div className="wrapper cards-container">
          {itemsToShow.map((item: { name: string; url: string }) => (
            <PockemonCard name={item.name} link={item.url} key={uuidv4()} />
          ))}
        </div>
      )}
      {itemsToShow.length !== 0 && !searchFailed && <Pagination />}
    </MainLayout>
  );
};
