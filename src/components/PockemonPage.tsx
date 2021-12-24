import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addAbilitiesDescription,
  addPockemon,
} from '../store/pockeonPageSlice';

import { RootState } from '../store/store';
import Tooltip from './Tooltip';

const PockemonPage = function (): React.ReactElement {
  const url = useAppSelector(
    (state: RootState) => state.pockemonPage.currentUrl,
  );
  const pockemon = useAppSelector(
    (state: RootState) => state.pockemonPage.currentPockemon,
  );
  const abilities = useAppSelector(
    (state: RootState) => state.pockemonPage.abilities,
  );
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => dispatch(addPockemon(data)));
    setIsLoading(false);
  }, []);

  useEffect((): void => {
    if (pockemon) {
      pockemon.abilities.map(
        (item: { ability: { name: string; url: string } }) => (
          fetch(item.ability.url)
            .then((response) => response.json())
            .then((data) => {
              const ability = {
                name: data.name,
                description: data.effect_entries[1].effect,
              };
              console.log(ability);
              dispatch(addAbilitiesDescription(ability));
            })
        ),
      );
      setIsLoading(false);
    }
  }, [pockemon]);

  return (
    !isLoading
    && pockemon && (
      <div className="card-item">
        <p>{pockemon.name}</p>
        <img src={pockemon.sprites.front_default} alt="Pockemon" />
        {pockemon.types.map(
          (type: { name: string; url: string }, index: number) => (
            <p key={index.toString()}>{type.name}</p>
          ),
        )}
        {pockemon.stats.map(
          (
            item: {
              base_stat: number;
              effort: number;
              stat: { name: string; url: string };
            },
            index: number,
          ) => (
            <p key={index.toString()}>
              {item.stat.name}
              {' '}
              is
              {item.base_stat}
            </p>
          ),
        )}
        {abilities.length !== 0
          && abilities.map(
            (item: { name: string; description: string }, index: number) => (
              <Tooltip content={item.description} key={index.toString()}>
                <p>{item.name}</p>
              </Tooltip>
            ),
          )}
      </div>
    )
  );
};

export default PockemonPage;
