import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { nextPage, prevPage, setPageSize } from '../../store/pockemonSlice';
import './pagination.scss';

const Pagination = function (): React.ReactElement {
  const dispatch = useAppDispatch();
  const nextUrlString = useAppSelector((state) => state.pagination.nextUrl);
  const prevUrlString = useAppSelector((state) => state.pagination.previousUrl);
  const handlerPageSizeChange = (
    ev: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    dispatch(setPageSize(ev.target.value));
  };

  const handlerNextPage = (): void => {
    if (nextUrlString != null) {
      fetch(nextUrlString)
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
        );
    }
  };

  const handlerPrevPage = (): void => {
    if (prevUrlString != null) {
      fetch(prevUrlString)
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
        );
    }
  };

  return (
    <div className="pagination">
      <button type="button" onClick={handlerPrevPage}>prev</button>
      <button type="button" onClick={handlerNextPage}>next</button>
      <select onChange={handlerPageSizeChange}>
        <option>10</option>
        <option>20</option>
        <option>50</option>
        <option>100</option>
      </select>
    </div>
  );
};

export default Pagination;
