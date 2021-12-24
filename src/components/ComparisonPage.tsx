import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { RootState } from '../store/store';
import { addToShowComparison } from '../store/pockemonSlice';

const ComparisonPage = function (): React.ReactElement {
  const pockemons = useAppSelector(
    (state: RootState) => state.pagination.addedToComparison,
  );
  const comperison = useAppSelector(
    (state: RootState) => state.pagination.comperisonItems,
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    pockemons.map((pockemon) => fetch(pockemon.url)
      .then((response) => response.json())
      .then((data) => {
        const addedData = {
          pockemonName: data.name,
          image: data.sprites.front_default,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defence: data.stats[2].base_stat,
          specialAttack: data.stats[3].base_stat,
          specialDefence: data.stats[4].base_stat,
          speed: data.stats[5].base_stat,
          abilities: data.abilities,
        };

        dispatch(addToShowComparison(addedData));
      }));
  }, []);

  return (
    <div>
      <table>
        <colgroup>
          <col style={{ width: '50px' }} />
          <col style={{ width: '50px' }} />
          <col style={{ width: '50px' }} />
          <col style={{ width: '50px' }} />
          <col style={{ width: '50px' }} />
          <col style={{ width: '50px' }} />
          <col style={{ width: '50px' }} />
          <col style={{ width: '50px' }} />
        </colgroup>
        <thead>
          <tr>
            <td>name</td>
            <td>image</td>
            <td>hp</td>
            <td>attack</td>
            <td>defence</td>
            <td>Special Attack</td>
            <td>Special defence</td>
            <td>speed</td>
            <td>abilities</td>
          </tr>
        </thead>
        <tbody>
          {comperison.map((comperisonItem, index) => (
            <tr key={index.toString()}>
              <td>{comperisonItem.pockemonName}</td>
              <td>
                <img src={comperisonItem.image} alt="pockemon" />
              </td>
              <td>{comperisonItem.hp}</td>
              <td>{comperisonItem.attack}</td>
              <td>{comperisonItem.defence}</td>
              <td>{comperisonItem.specialAttack}</td>
              <td>{comperisonItem.specialDefence}</td>
              <td>{comperisonItem.speed}</td>
              <td>{comperisonItem.abilities.map((abilityItem) => abilityItem.ability.name)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonPage;
