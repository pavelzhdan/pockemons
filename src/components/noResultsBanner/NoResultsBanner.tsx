import React from 'react';
import './noResultsBanner.scss';

export const NoResultsBanner = (): React.ReactElement => {
  return (
    <div className="banner">
      Oooops... nothing was found! Try something else!
    </div>
  );
};
