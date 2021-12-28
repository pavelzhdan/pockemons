import React from 'react';
import './loadingSpinner.scss';

const LoadingIndicator = function () {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default LoadingIndicator;
