import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { RootState } from '../store/store';
import { Tooltip, LoadingSpinner } from '../components';
import { pokemonPageActions } from '../store/pokemonPageSlice';

/**
 * Компонент "Страница покемона"
 * @returns {React.ReactElement} - react-элемент
 */

export const PokemonPage: React.FC = () => {
  const { currentUrl, currentPokemon, abilities } = useAppSelector(
    (state: RootState) => state.pokemonPage
  );
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const filterPocemonData = (data: any) => {
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      types: data.types,
      stats: data.stats,
      abilities: data.abilities,
    };
  };

  useEffect(() => {
    if (currentUrl) {
      fetch(currentUrl)
        .then((response) => response.json())
        .then((data) => {
          const infoToAdd = filterPocemonData(data);
          dispatch(pokemonPageActions.addPokemon(infoToAdd));
        })
        .catch((error) => alert(error));
    }
  }, []);

  useEffect((): void => {
    if (currentPokemon) {
      const abilitiesToAdd: { name: string; description: string }[] = [];
      currentPokemon.abilities.map(
        (item: { ability: { name: string; url: string } }, index: number) =>
          fetch(item.ability.url)
            .then((response) => response.json())
            .then((data) => {
              const [filteredData] = data.effect_entries.filter(
                (position: { language: { name: string } }) =>
                  position.language.name === 'en'
              );
              abilitiesToAdd.push({
                name: data.name,
                description: filteredData.effect,
              });
              if (index === currentPokemon.abilities.length - 1) {
                dispatch(
                  pokemonPageActions.addAbilitiesDescription(abilitiesToAdd)
                );
              }
            })
            .catch((error) => alert(error))
      );
      setIsLoading(false);
    }
  }, [currentPokemon]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="wrapper pokemon-page">
      <h1 className="pokemon-page-header">{currentPokemon.name}</h1>
      <div className="pokemon-page-content">
        <img
          src={currentPokemon.image}
          alt="Pokemon"
          width={200}
          height={200}
        />
        <div className="pokemon-page-info">
          <div className="pokemon-page-type-container">
            {currentPokemon.types.map(
              (slot: { type: { name: string; url: string } }) => (
                <div
                  key={currentPokemon.id + slot.type.name}
                  className="pokemon-page-types"
                >
                  {slot.type.name}
                </div>
              )
            )}
          </div>
          <dl className="pokemon-page-stats-list">
            {currentPokemon.stats.map(
              (item: {
                ['base_stat']: number;
                stat: { name: string; url: string };
              }) => (
                <React.Fragment key={currentPokemon.id + item.stat.name}>
                  <dt>{item.stat.name}</dt>
                  <dd>{item.base_stat}</dd>
                </React.Fragment>
              )
            )}
          </dl>
          <ul>
            {abilities.map((item: { name: string; description: string }) => (
              <li key={currentPokemon.id + item.name}>
                <Tooltip content={item.description}>
                  <span>{item.name}</span>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
