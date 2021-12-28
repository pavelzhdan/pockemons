import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/International_Pokémon_logo.png';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { RootState } from '../../store/store';
import {
  showSearchResults,
  setSearch,
  searchEmpty,
} from '../../store/pockemonSlice';
import './header.scss';

const Header = function (): React.ReactElement {
  const location = useLocation();
  let pathname = '';

  if (location.pathname === '/') {
    pathname = 'comparison';
  }

  const [searchValue, setSearchValue] = React.useState<string>('');
  const allItems = useAppSelector(
    (state: RootState) => state.pagination.allItems,
  );
  const searchField = useAppSelector(
    (state: RootState) => state.pagination.searchField,
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (
        searchField.length !== searchValue.length
        && searchValue.length !== 0
      ) {
        dispatch(setSearch(searchValue));
        const selected = allItems.filter((item) => item.name.includes(searchValue));
        dispatch(showSearchResults(selected));
      } else if (searchValue.length === 0) {
        dispatch(searchEmpty());
      }
    }, 150);
    return () => clearTimeout(searchTimer);
  }, [searchValue, searchField]);

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
        <Link to={`/${pathname}`} className="comparison-button">
          Go to
          {pathname ? 'comparison' : 'catalog'}
        </Link>
      </div>
    </header>
  );
};

export default Header;
