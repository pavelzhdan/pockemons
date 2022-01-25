import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { addToShowComparison, deleteShowComparison, toggleComparison } from '../store/pockemonSlice';
import { MainLayout } from '../components/layout/MainLayout';
import { addPockemonUrl } from '../store/pockeonPageSlice';
import { LoadingSpinner } from '../components/loadingSpinner/LoadingSpinner';

export const ComparisonPage = (): React.ReactElement => {
  const { comparisonItems, addedToComparison } = useAppSelector(
    (state: RootState) => state.pagination,
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    addedToComparison.forEach((pockemon) => {
      if (!comparisonItems.some((item) => item.url === pockemon.url)) {
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
          })
          .catch((error) => alert(error));
      }
      setIsLoading(false);
    });
  }, [addedToComparison]);

  if (addedToComparison.length === 0) {
    navigate('/');
  }

  const handlerPockemonLinkClick = (link: string) => dispatch(addPockemonUrl(link));

  const handlerComparisonToggle = (name: string, link: string) => {
    dispatch(deleteShowComparison());
    dispatch(toggleComparison({ name, url: link }));
  };

  return (
    <MainLayout>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <table className="pockemon-table">
          <colgroup>
            <col style={{ width: '100px' }} />
            <col style={{ width: '100px' }} />
            <col style={{ width: '50px' }} />
            <col style={{ width: '70px' }} />
            <col style={{ width: '70px' }} />
            <col style={{ width: '70px' }} />
            <col style={{ width: '70px' }} />
            <col style={{ width: '70px' }} />
            <col style={{ width: '70px' }} />
            <col style={{ width: '70px' }} />
            <col />
            <col style={{ width: '70px' }} />
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
              <td />
            </tr>
          </thead>
          <tbody>
            {comparisonItems.map((comparisonItem) => (
              <tr key={uuidv4()}>
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
                    <div key={uuidv4()}>{abilityItem.ability.name}</div>
                  ))}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handlerComparisonToggle(
                      comparisonItem.pockemonName,
                      comparisonItem.url,
                    )}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </MainLayout>
  );
};
