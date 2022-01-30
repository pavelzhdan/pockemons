import React from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { RootState } from '../store/store';
import { paginationActions } from '../store/paginationSlice';
import {
  PokemonCard,
  LoadingSpinner,
  Pagination,
  NoResultsBanner,
} from '../components';

/**
 * Компонент "Каталог покемонов"
 * @returns {React.ReactElement} - react-элемент
 */

export const Catalogue = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const {
    itemsToShow,
    itemsOffset,
    itemsPerPage,
    totalQuantity,
    searchFailed,
  } = useAppSelector((state: RootState) => state.pagination);

  React.useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${itemsPerPage}&offset=${itemsOffset}`
    )
      .then((data) => data.json())
      .then((response) => {
        dispatch(paginationActions.getFirstData(response));
      })
      .catch((error) => alert(error));
  }, [itemsOffset, itemsPerPage]);

  React.useEffect(() => {
    if (totalQuantity !== 0) {
      fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=${totalQuantity}&offset=0`
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch(paginationActions.addAllPokemons(data.results));
        })
        .catch((error) => alert(error));
    }
  }, [totalQuantity]);

  if (itemsToShow.length === 0 && !searchFailed) {
    return <LoadingSpinner />;
  }

  if (searchFailed) {
    return <NoResultsBanner />;
  }

  return (
    <>
      <div className="wrapper cards-container">
        {itemsToShow.map((item) => (
          <PokemonCard name={item.name} link={item.url} key={item.name} />
        ))}
      </div>
      <Pagination />
    </>
  );
};
