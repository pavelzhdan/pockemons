import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    addAbilitiesDescription,
    addPokemon,
} from '../store/pokemonPageSlice';
import { RootState } from '../store/store';
import { Tooltip } from '../components/tooltip/Tooltip';
import { LoadingSpinner } from '../components/loadingSpinner/LoadingSpinner';

export const PokemonPage: React.FC = () => {
    const { currentUrl, currentPokemon, abilities } = useAppSelector(
        (state: RootState) => state.pokemonPage
    );
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [isLoadingAbilities, setIsLoadingAbilities] =
        React.useState<boolean>(true);

    useEffect(() => {
        if (currentUrl) {
            fetch(currentUrl)
                .then((response) => response.json())
                .then((data) => {
                    dispatch(addPokemon(data));
                })
                .catch((error) => alert(error));
        }
    }, []);

    useEffect((): void => {
        if (currentPokemon) {
            const abilitiesToAdd: { name: string; description: string }[] = [];
            currentPokemon.abilities.map(
                (
                    item: { ability: { name: string; url: string } },
                    index: number
                ) =>
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
                            if (
                                index ===
                                currentPokemon.abilities.length - 1
                            ) {
                                dispatch(
                                    addAbilitiesDescription(abilitiesToAdd)
                                );
                                setIsLoadingAbilities(false);
                            }
                        })
                        .catch((error) => alert(error))
            );
            setIsLoading(false);
        }
    }, [currentPokemon]);

    return (
      <>
            {!isLoading && (
                <div className="wrapper pokemon-page">
                    <h1 className="pokemon-page-header">
                        {currentPokemon.name}
                    </h1>
                    <div className="pokemon-page-content">
                        <img
                            src={currentPokemon.sprites.front_default}
                            alt="Pokemon"
                            width={200}
                            height={200}
                        />
                        <div className="pokemon-page-info">
                            <div className="pokemon-page-type-container">
                                {currentPokemon.types.map(
                                    (slot: {
                                        type: { name: string; url: string };
                                    }) => (
                                        <div
                                            key={uuidv4()}
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
                                        base_stat: number;
                                        effort: number;
                                        stat: { name: string; url: string };
                                    }) => (
                                        <React.Fragment key={uuidv4()}>
                                            <dt>{item.stat.name}</dt>
                                            <dd>{item.base_stat}</dd>
                                        </React.Fragment>
                                    )
                                )}
                            </dl>
                            {!isLoadingAbilities && (
                                <ul>
                                    {abilities.map(
                                        (item: {
                                            name: string;
                                            description: string;
                                        }) => (
                                            <li key={uuidv4()}>
                                                <Tooltip
                                                    content={item.description}
                                                    key={uuidv4()}
                                                >
                                                    <span>{item.name}</span>
                                                </Tooltip>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                            {isLoadingAbilities && <LoadingSpinner />}
                        </div>
                    </div>
                </div>
            )}
            {isLoading && <LoadingSpinner />}
      </>
    );
};
