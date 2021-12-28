import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { addAllPockemons, paginationActions } from '../store/pockemonSlice';
import PockemonCard from '../components/pockemonCard/PockemonCard';
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner';
import Pagination from '../components/pagination/Pagination';
import MainLayout from '../components/layout/MainLayout';

const Catalogue = function (): React.ReactElement {
  const dispatch = useAppDispatch();
  const {
    itemsToShow, itemsOffset, itemsPerPage, totalQuantity,
  } = useAppSelector((state: RootState) => state.pagination);

  React.useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${itemsPerPage}&offset=${itemsOffset}`,
    )
      .then((data) => data.json())
      .then((response) => {
        dispatch(paginationActions.fetchData(response));
      });
  }, [itemsOffset, itemsPerPage]);

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
    <MainLayout>
      {itemsToShow.length === 0 && <LoadingSpinner />}
      <div className="wrapper cards-container">
        {itemsToShow.map((item: { name: string; url: string }) => (
          <PockemonCard name={item.name} link={item.url} key={item.name} />
        ))}
      </div>
      {itemsToShow.length !== 0 && <Pagination />}
    </MainLayout>
  );
};

export default Catalogue;
