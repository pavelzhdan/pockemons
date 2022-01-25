import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/International_Pokémon_logo.png';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { RootState } from '../../store/store';
import {
  showSearchResults,
  searchEmpty,
  deleteShowComparison,
  searchFailed,
  searchSuccess,
} from '../../store/pockemonSlice';
import './header.scss';

export const Header = (): React.ReactElement => {
  const location = useLocation();
  let pathname = '';

  if (location.pathname === '/') {
    pathname = 'comparison';
  }

  const [searchValue, setSearchValue] = React.useState<string>('');
  const { allItems, addedToComparison } = useAppSelector(
    (state: RootState) => state.pagination,
  );
  const { currentPockemon } = useAppSelector(
    (state: RootState) => state.pockemonPage,
  );

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (searchValue.length !== 0) {
        const selected = allItems.filter((item) => item.name.includes(searchValue));
        if (selected.length === 0) {
          dispatch(searchFailed());
        } else {
          dispatch(searchSuccess());
          dispatch(showSearchResults(selected));
        }
      }

      if (searchValue === '') {
        dispatch(searchEmpty());
      }
    }, 150);
    return () => clearTimeout(searchTimer);
  }, [searchValue]);

  return (
    <header>
      <div className="wrapper">
        <img src={logo} alt="Pockemon" width={150} />
        {location.pathname === '/' && (
          <input
            value={searchValue}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setSearchValue(ev.target.value)}
            placeholder="find your Pockemon!"
          />
        )}
        <Link
          to={`/${pathname}`}
          className={`comparison-button ${
            addedToComparison.length === 0
            && location.pathname !== `/${currentPockemon?.name}`
            && 'comparison-button-block'
          }`}
          onClick={(ev) => {
            if (
              addedToComparison.length === 0
              && location.pathname !== `/${currentPockemon.name}`
            ) {
              ev.preventDefault();
            }
            dispatch(deleteShowComparison());
          }}
        >
          Go to
          {' '}
          {pathname ? 'comparison' : 'catalog'}
        </Link>
      </div>
    </header>
  );
};
