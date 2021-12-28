import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addPockemonUrl } from '../../store/pockeonPageSlice';
import { toggleComparison } from '../../store/pockemonSlice';
import { RootState } from '../../store/store';
import './pockemonCard.scss';

interface PockemonCardProps {
  name: string;
  link: string;
}

const PockemonCard = function (props: PockemonCardProps): React.ReactElement {
  const { name: pockemonName, link } = props;

  const addedPockemon = useAppSelector(
    (state: RootState) => state.pagination.addedToComparison,
  );

  const isChecked = addedPockemon.some(
    (item) => item.name === pockemonName && item.url === link,
  );

  const dispatch = useAppDispatch();
  const handlerPockemonCardClick = () => dispatch(addPockemonUrl(link));

  const handlerComparisonToggle = () => {
    dispatch(toggleComparison({ name: pockemonName, url: link }));
  };

  return (
    <div className="card-item">
      <Link to={`/${pockemonName}`} onClick={handlerPockemonCardClick}>
        {pockemonName}
      </Link>
      <label htmlFor={pockemonName}>
        Add to comparison
        <input
          type="checkbox"
          onChange={handlerComparisonToggle}
          value="selected"
          id={pockemonName}
          checked={isChecked}
        />
      </label>
    </div>
  );
};

export default PockemonCard;
