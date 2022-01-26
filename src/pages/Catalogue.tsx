import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../store';
import { RootState } from '../store/store';
import { addAllPokemons, paginationActions } from '../store/pokemonSlice';
import {
  PokemonCard,
  LoadingSpinner,
  Pagination,
  NoResultsBanner,
} from '../components';

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
        dispatch(paginationActions.fetchData(response));
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
          dispatch(addAllPokemons(data.results));
        })
        .catch((error) => alert(error));
    }
  }, [totalQuantity]);

  return (
    <>
      {itemsToShow.length === 0 && !searchFailed && <LoadingSpinner />}
      {searchFailed ? (
        <NoResultsBanner />
      ) : (
        <div className="wrapper cards-container">
          {itemsToShow.map((item: { name: string; url: string }) => (
            <PokemonCard name={item.name} link={item.url} key={uuidv4()} />
          ))}
        </div>
      )}
      {itemsToShow.length !== 0 && !searchFailed && <Pagination />}
    </>
  );
};
