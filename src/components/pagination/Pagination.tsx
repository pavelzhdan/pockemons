import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { nextPage, prevPage, setPageSize } from '../../store/pockemonSlice';
import './pagination.scss';

const Pagination = function (): React.ReactElement {
  const dispatch = useAppDispatch();
  const {
    previousUrl, nextUrl, itemsPerPage, totalQuantity,
  } = useAppSelector(
    (state) => state.pagination,
  );

  const handlerPageSizeChange = (
    ev: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    dispatch(setPageSize(ev.target.value));
  };

  const handlerNextPage = (): void => {
    if (nextUrl) {
      fetch(nextUrl)
        .then((data) => data.json())
        .then(
          (response: {
            count: number;
            next: string | null;
            previous: string | null;
            results: { name: string; url: string }[];
          }) => {
            dispatch(nextPage(response));
          },
        )
        .catch((error) => alert(error));
    }
  };

  const handlerPrevPage = (): void => {
    if (previousUrl) {
      fetch(previousUrl)
        .then((data) => data.json())
        .then(
          (response: {
            count: number;
            next: string | null;
            previous: string | null;
            results: { name: string; url: string }[];
          }) => {
            dispatch(prevPage(response));
          },
        )
        .catch((error) => alert(error));
    }
  };

  return (
    <div className="pagination">
      <button type="button" onClick={handlerPrevPage} disabled={!previousUrl}>
        prev
      </button>
      <button type="button" onClick={handlerNextPage} disabled={!nextUrl}>
        next
      </button>
      <select value={itemsPerPage} onChange={handlerPageSizeChange}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span className="quantity">
        Total pockemons quantity:
        {totalQuantity}
      </span>
    </div>
  );
};

export default Pagination;
