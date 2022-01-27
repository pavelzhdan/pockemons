import React from 'react';
import './loadingSpinner.scss';

/**
 * Компонент "Спиннер"
 * @returns {React.ReactElement} - react-элемент
 */

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
