import React, { useEffect } from 'react';
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

  useEffect(() => {
    fetch(currentUrl)
      .then((response) => response.json())
      .then((data) => {
        dispatch(addPockemon(data));
      });
    setIsLoading(false);
  }, []);

  useEffect((): void => {
    if (currentPockemon) {
      currentPockemon.abilities.map(
        (item: { ability: { name: string; url: string } }) => (
          fetch(item.ability.url)
            .then((response) => response.json())
            .then((data) => {
              const ability = {
                name: data.name,
                description: data.effect_entries[1].effect,
              };
              dispatch(addAbilitiesDescription(ability));
            })
        ),
      );
      setIsLoading(false);
    }
  }, [currentPockemon]);

  return (
    <MainLayout>
      {!isLoading
      && currentPockemon
      && (
      <div className="wrapper pockemon-page">
        <h1 className="pockemon-page-header">{currentPockemon.name}</h1>
        <div className="pockemon-page-content">
          <img src={currentPockemon.sprites.front_default} alt="Pockemon" width={200} />
          <div className="pockemon-page-info">
            <div className="pockemon-page-type-container">
              {currentPockemon.types.map(
                (slot: {type: { name: string; url: string }}, index: number) => (
                  <div key={index.toString()} className="pockemon-page-types">{slot.type.name}</div>
                ),
              )}
            </div>
            <dl className="pockemon-page-stats-list">
              {currentPockemon.stats.map(
                (
                  item: {
                      base_stat: number;
                      effort: number;
                      stat: { name: string; url: string };
                    },
                  index: number,
                ) => (
                  <React.Fragment key={item.stat.name}>
                    <dt key={index.toString()}>
                      {item.stat.name}
                    </dt>
                    <dd>
                      {item.base_stat}
                    </dd>
                  </React.Fragment>
                ),
              )}
            </dl>
            {abilities.length !== 0
            && abilities.map(
              (item: { name: string; description: string }, index: number) => (
                <Tooltip content={item.description} key={index.toString()}>
                  <p>{item.name}</p>
                </Tooltip>
              ),
            )}
          </div>
        </div>
      </div>
      )}
      {isLoading && <LoadingSpinner />}
    </MainLayout>
  );
};

export default PockemonPage;
