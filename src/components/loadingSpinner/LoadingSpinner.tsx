import React from 'react';
import './loadingSpinner.scss';

export const LoadingSpinner = (): React.ReactElement => {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
