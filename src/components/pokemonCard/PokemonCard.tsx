import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { RootState } from '../../store/store';
import './pokemonCard.scss';
import { paginationActions } from '../../store/paginationSlice';
import { pokemonPageActions } from '../../store/pokemonPageSlice';

type PokemonCardProps = {
  name: string;
  link: string;
};

/**
 * Компонент "Карточка покемона"
 * @returns {React.ReactElement} - react-элемент
 */

export const PokemonCard: React.FC<PokemonCardProps> = ({
  name: pokemonName,
  link: pokemonLink,
}) => {
  const addedPokemon = useAppSelector(
    (state: RootState) => state.pagination.addedToComparison
  );

  const isChecked = addedPokemon.some(
    (item) => item.name === pokemonName && item.url === pokemonLink
  );

  const dispatch = useAppDispatch();

  /**
   * Меняет текст URL для запроса характеристик покемона по API
   * @param {string} link  - имя покемона и ссылка на него по API
   * @returns {void}
   */
  const handlerPokemonCardClick = (link: string): void => {
    dispatch(pokemonPageActions.addPokemonUrl(link));
  };

  /**
   * Удаляет покемона из списка сравнения
   * @param {string} name - имя покемона
   * @param {string} url - ссылка на покемона для API
   * @returns {void}
   */
  const handlerComparisonToggle = (name: string, url: string): void => {
    dispatch(paginationActions.toggleComparison({ name, url }));
  };

  return (
    <div className="card-item">
      <Link
        to={`/${pokemonName}`}
        onClick={() => handlerPokemonCardClick(pokemonLink)}
      >
        {pokemonName}
      </Link>
      <label htmlFor={pokemonName}>
        Add to comparison
        <input
          type="checkbox"
          onChange={() => handlerComparisonToggle(pokemonName, pokemonLink)}
          value="selected"
          id={pokemonName}
          checked={isChecked}
        />
      </label>
    </div>
  );
};
