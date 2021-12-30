import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addAbilitiesDescription,
  addPockemon,
} from '../store/pockeonPageSlice';
import { RootState } from '../store/store';
import Tooltip from '../components/tooltip/Tooltip';
import MainLayout from '../components/layout/MainLayout';
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner';

const PockemonPage = function (): React.ReactElement {
  const { currentUrl, currentPockemon, abilities } = useAppSelector(
    (state: RootState) => state.pockemonPage,
  );

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isLoadingAbilities, setIsLoadingAbilities] = React.useState<boolean>(true);

  useEffect(() => {
    if (currentUrl) {
      fetch(currentUrl)
        .then((response) => response.json())
        .then((data) => {
          dispatch(addPockemon(data));
        });
    }
  }, []);

  useEffect((): void => {
    if (currentPockemon) {
      const abilitiesToAdd: { name: string; description: string }[] = [];
      currentPockemon.abilities.map(
        (item: { ability: { name: string; url: string } }, index: number) => fetch(item.ability.url)
          .then((response) => response.json())
          .then((data) => {
            const [filteredData] = data.effect_entries.filter(
              (position: { language: { name: string } }) => position.language.name === 'en',
            );
            abilitiesToAdd.push({
              name: data.name,
              description: filteredData.effect,
            });
            if (index === currentPockemon.abilities.length - 1) {
              dispatch(addAbilitiesDescription(abilitiesToAdd));
              setIsLoadingAbilities(false);
            }
          }),
      );
      setIsLoading(false);
    }
  }, [currentPockemon]);

  return (
    <MainLayout>
      {!isLoading && (
        <div className="wrapper pockemon-page">
          <h1 className="pockemon-page-header">{currentPockemon.name}</h1>
          <div className="pockemon-page-content">
            <img
              src={currentPockemon.sprites.front_default}
              alt="Pockemon"
              width={200}
              height={200}
            />
            <div className="pockemon-page-info">
              <div className="pockemon-page-type-container">
                {currentPockemon.types.map(
                  (slot: { type: { name: string; url: string } }) => (
                    <div key={uuidv4()} className="pockemon-page-types">
                      {slot.type.name}
                    </div>
                  ),
                )}
              </div>
              <dl className="pockemon-page-stats-list">
                {currentPockemon.stats.map(
                  (item: {
                    base_stat: number;
                    effort: number;
                    stat: { name: string; url: string };
                  }) => (
                    <React.Fragment key={uuidv4()}>
                      <dt>{item.stat.name}</dt>
                      <dd>{item.base_stat}</dd>
                    </React.Fragment>
                  ),
                )}
              </dl>
              {!isLoadingAbilities
                && abilities.map((item: { name: string; description: string }) => (
                  <Tooltip content={item.description} key={uuidv4()}>
                    <p>{item.name}</p>
                  </Tooltip>
                ))}
              {isLoadingAbilities && <LoadingSpinner />}
            </div>
          </div>
        </div>
      )}
      {isLoading && <LoadingSpinner />}
    </MainLayout>
  );
};

export default PockemonPage;
