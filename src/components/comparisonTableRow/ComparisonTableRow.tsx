import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { paginationActions } from '../../store/paginationSlice';
import { pokemonPageActions } from '../../store/pokemonPageSlice';

type ComparisonTableRowProps = {
  comparisonItem: any;
};

/**
 * Компонент "Строка таблицы сравнения"
 * @returns {React.ReactElement} - react-элемент
 */

export const ComparisonTableRow: React.FC<ComparisonTableRowProps> = ({
  comparisonItem,
}) => {
  const dispatch = useAppDispatch();

  /**
   * Меняет текст URL для запроса характеристик покемона по API
   * @param {string} link - ссылка на покемона по API
   * @returns {void}
   */
  const handlerPokemonLinkClick = (link: string) =>
    dispatch(pokemonPageActions.addPokemonUrl(link));

  /**
   * Удаляет покемона из списка сравнения и из стейта
   * @param {string} name - имя покемона
   * @param {string} link - ссылка на покемона для API
   * @returns {void}
   */
  const handlerComparisonToggle = (name: string, link: string): void => {
    dispatch(paginationActions.deleteShowComparison());
    dispatch(paginationActions.toggleComparison({ name, url: link }));
  };

  return (
    <tr>
      <td>
        <Link
          to={`/${comparisonItem.pokemonName}`}
          onClick={() => handlerPokemonLinkClick(comparisonItem.url)}
        >
          {comparisonItem.pokemonName}
        </Link>
      </td>
      <td>
        <img src={comparisonItem.image} alt="pokemon" width={96} />
      </td>
      <td>{comparisonItem.hp}</td>
      <td>{comparisonItem.attack}</td>
      <td>{comparisonItem.defence}</td>
      <td>{comparisonItem.specialAttack}</td>
      <td>{comparisonItem.specialDefence}</td>
      <td>{comparisonItem.speed}</td>
      <td>{comparisonItem.height}</td>
      <td>{comparisonItem.weight}</td>
      <td>
        {comparisonItem.abilities.map(
          (abilityItem: {
            ability: {
              name: string;
            };
          }) => (
            <div key={comparisonItem.id + abilityItem.ability.name}>
              {abilityItem.ability.name}
            </div>
          )
        )}
      </td>
      <td>
        <button
          type="button"
          onClick={() =>
            handlerComparisonToggle(
              comparisonItem.pokemonName,
              comparisonItem.url
            )
          }
        >
          Remove
        </button>
      </td>
    </tr>
  );
};
