import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/International_Pokémon_logo.png';
import { useAppDispatch, useAppSelector } from '../../store';
import { RootState } from '../../store/store';
import './header.scss';
import { paginationActions } from '../../store/paginationSlice';

/**
 * Компонент "Шапка"
 * @returns {React.ReactElement} - react-элемент
 */

export const Header: React.FC = () => {
  const location = useLocation();
  let pathname = '';

  if (location.pathname === '/') {
    pathname = 'comparison';
  }

  const [searchValue, setSearchValue] = React.useState<string>('');
  const { allItems, addedToComparison } = useAppSelector(
    (state: RootState) => state.pagination
  );
  const { currentPokemon } = useAppSelector(
    (state: RootState) => state.pokemonPage
  );

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (searchValue.length !== 0) {
        const selected = allItems.filter((item) =>
          item.name.includes(searchValue)
        );
        if (selected.length === 0) {
          dispatch(paginationActions.setSearchFailed());
        } else {
          dispatch(paginationActions.setSearchSuccess());
          dispatch(paginationActions.showSearchResults(selected));
        }
      }

      if (searchValue === '') {
        dispatch(paginationActions.setSearchEmpty());
      }
    }, 150);
    return () => clearTimeout(searchTimer);
  }, [searchValue]);

  let isButtonBlocked = '';

  if (
    addedToComparison.length === 0 &&
    location.pathname !== `/${currentPokemon?.name}`
  ) {
    isButtonBlocked = 'comparison-button-block';
  }

  return (
    <header>
      <div className="wrapper">
        <img src={logo} alt="Pokemon" width={150} />
        {location.pathname === '/' && (
          <input
            value={searchValue}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(ev.target.value)
            }
            placeholder="find your Pokemon!"
          />
        )}
        <Link
          to={`/${pathname}`}
          className={`comparison-button ${isButtonBlocked}`}
          onClick={(ev) => {
            if (
              addedToComparison.length === 0 &&
              location.pathname !== `/${currentPokemon.name}`
            ) {
              ev.preventDefault();
            }
            dispatch(paginationActions.deleteShowComparison());
          }}
        >
          Go to {pathname ? 'comparison' : 'catalog'}
        </Link>
      </div>
    </header>
  );
};
