import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  deleteShowComparison,
  toggleComparison,
} from '../../store/pokemonSlice';
import { addPokemonUrl } from '../../store/pokemonPageSlice';
import { useAppDispatch } from '../../store/hooks';

type ComparisonTableRow = {
  comparisonItem: any;
};

export const ComparisonTableRow = (props: ComparisonTableRow) => {
  const { comparisonItem } = props;
  const dispatch = useAppDispatch();

  const handlerPokemonLinkClick = (link: string) =>
    dispatch(addPokemonUrl(link));

  const handlerComparisonToggle = (name: string, link: string) => {
    dispatch(deleteShowComparison());
    dispatch(toggleComparison({ name, url: link }));
  };

  return (
    <tr key={comparisonItem.id}>
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
            <div key={uuidv4()}>{abilityItem.ability.name}</div>
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
