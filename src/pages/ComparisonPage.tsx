import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { RootState } from '../store/store';
import {
  LoadingSpinner,
  ComparisonTable,
  ComparisonTableRow,
} from '../components';
import { paginationActions } from '../store/paginationSlice';

/**
 * Компонент "Страница сравнения"
 * @returns {React.ReactElement} - react-элемент
 */

export const ComparisonPage = (): React.ReactElement => {
  const { comparisonItems, addedToComparison } = useAppSelector(
    (state: RootState) => state.pagination
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const filterNeededData = (data: any, url: string) => {
    return {
      id: data.id,
      pokemonName: data.name,
      image: data.sprites.front_default,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defence: data.stats[2].base_stat,
      specialAttack: data.stats[3].base_stat,
      specialDefence: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
      height: data.height,
      weight: data.weight,
      abilities: data.abilities,
      url,
    };
  };

  useEffect(() => {
    addedToComparison.forEach((pokemon) => {
      const isAlreadyAdded = !comparisonItems.some(
        (item) => item.url === pokemon.url
      );
      if (isAlreadyAdded) {
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((data) => {
            const dataToAdd = filterNeededData(data, pokemon.url);
            dispatch(paginationActions.addToShowComparison(dataToAdd));
          })
          .catch((error) => alert(error));
      }
      setIsLoading(false);
    });
  }, [addedToComparison]);

  if (addedToComparison.length === 0) {
    navigate('/');
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ComparisonTable>
      {comparisonItems.map((comparisonItem) => (
        <ComparisonTableRow
          comparisonItem={comparisonItem}
          key={comparisonItem.id}
        />
      ))}
    </ComparisonTable>
  );
};
