import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addPokemonUrl } from '../../store/pokemonPageSlice';
import { toggleComparison } from '../../store/pokemonSlice';
import { RootState } from '../../store/store';
import './pokemonCard.scss';

type PokemonCardProps = {
  name: string;
  link: string;
}

export const PokemonCard = (props: PokemonCardProps): React.ReactElement => {
  const { name: pokemonName, link } = props;

  const addedPokemon = useAppSelector(
    (state: RootState) => state.pagination.addedToComparison,
  );

  const isChecked = addedPokemon.some(
    (item) => item.name === pokemonName && item.url === link,
  );

  const dispatch = useAppDispatch();
  const handlerPokemonCardClick = () => dispatch(addPokemonUrl(link));

  const handlerComparisonToggle = () => {
    dispatch(toggleComparison({ name: pokemonName, url: link }));
  };

  return (
    <div className="card-item">
      <Link to={`/${pokemonName}`} onClick={handlerPokemonCardClick}>
        {pokemonName}
      </Link>
      <label htmlFor={pokemonName}>
        Add to comparison
        <input
          type="checkbox"
          onChange={handlerComparisonToggle}
          value="selected"
          id={pokemonName}
          checked={isChecked}
        />
      </label>
    </div>
  );
};
