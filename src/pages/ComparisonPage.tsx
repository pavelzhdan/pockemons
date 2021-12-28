import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { addToShowComparison } from '../store/pockemonSlice';
import MainLayout from '../components/layout/MainLayout';
import { addPockemonUrl } from '../store/pockeonPageSlice';

const ComparisonPage = function (): React.ReactElement {
  const pockemons = useAppSelector(
    (state: RootState) => state.pagination.addedToComparison,
  );
  const comparison = useAppSelector(
    (state: RootState) => state.pagination.comperisonItems,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    pockemons.forEach((pockemon) => {
      if (!comparison.some((item) => item.url === pockemon.url)) {
        fetch(pockemon.url)
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
              height: data.height,
              weight: data.weight,
              abilities: data.abilities,
              url: pockemon.url,
            };
            dispatch(addToShowComparison(addedData));
          });
      }
    });
  }, []);

  const handlerPockemonLinkClick = (link: string) => dispatch(addPockemonUrl(link));

  return (
    <MainLayout>
      <table className="pockemon-table">
        <colgroup>
          <col style={{ width: '100px' }} />
          <col style={{ width: '100px' }} />
          <col style={{ width: '100px' }} />
          <col style={{ width: '100px' }} />
          <col style={{ width: '100px' }} />
          <col style={{ width: '100px' }} />
          <col style={{ width: '100px' }} />
          <col style={{ width: '100px' }} />
          <col style={{ width: '100px' }} />
          <col style={{ width: '100px' }} />
          <col />
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
            <td>height</td>
            <td>weight</td>
            <td>abilities</td>
          </tr>
        </thead>
        <tbody>
          {comparison.map((comparisonItem, index) => (
            <tr key={index.toString()}>
              <td>
                <Link
                  to={`/${comparisonItem.pockemonName}`}
                  onClick={() => handlerPockemonLinkClick(comparisonItem.url)}
                >
                  {comparisonItem.pockemonName}
                </Link>
              </td>
              <td>
                <img src={comparisonItem.image} alt="pockemon" width={96} />
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
                {comparisonItem.abilities.map((abilityItem) => (
                  <div key={abilityItem.ability.name}>
                    {abilityItem.ability.name}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default ComparisonPage;
