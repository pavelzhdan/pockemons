import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { addToShowComparison } from '../store/pokemonSlice';
import { LoadingSpinner } from '../components/loadingSpinner/LoadingSpinner';
import { ComparisonTable } from '../components/comparisonTable/ComparisonTable';
import { ComparisonTableRow } from '../components/comparisonTableRow/ComparisonTableRow';

export const ComparisonPage = (): React.ReactElement => {
  const { comparisonItems, addedToComparison } = useAppSelector(
    (state: RootState) => state.pagination
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    addedToComparison.forEach((pokemon) => {
      if (!comparisonItems.some((item) => item.url === pokemon.url)) {
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((data) => {
            const addedData = {
              id: data.order,
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
              url: pokemon.url,
            };
            dispatch(addToShowComparison(addedData));
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
        <ComparisonTableRow comparisonItem={comparisonItem} />
      ))}
    </ComparisonTable>
  );
};
