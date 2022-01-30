import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import './pagination.scss';
import { paginationActions } from '../../store/paginationSlice';
import { InitialData } from '../../types';

/**
 * Компонент "Пагинация"
 * @returns {React.ReactElement} - react-элемент
 */

export const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { previousUrl, nextUrl, itemsPerPage, totalQuantity } = useAppSelector(
    (state) => state.pagination
  );

  /**
   * Меняет количество выводимых покемонов для запроса по API
   * @returns {void}
   */
  const handlerPageSizeChange = (
    ev: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    dispatch(paginationActions.setPageSize(ev.target.value));
  };

  /**
   * Запрашивает покемонов для отображения на следующей страницы по API
   * @returns {void}
   */
  const handlerNextPage = (): void => {
    if (nextUrl) {
      fetch(nextUrl)
        .then((data) => data.json())
        .then((response: InitialData) => {
          dispatch(paginationActions.goToNextPage(response));
        })
        .catch((error) => alert(error));
    }
  };

  /**
   * Запрашивает покемонов для отображения на предыдущей страницы по API
   * @returns {void}
   */
  const handlerPrevPage = (): void => {
    if (previousUrl) {
      fetch(previousUrl)
        .then((data) => data.json())
        .then((response: InitialData) => {
          dispatch(paginationActions.goToPrevPage(response));
        })
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
        Total pokemons quantity:
        {totalQuantity}
      </span>
    </div>
  );
};
