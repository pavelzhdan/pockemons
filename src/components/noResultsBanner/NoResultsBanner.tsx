import React from 'react';
import './noResultsBanner.scss';

/**
 * Компонент "Баннер отсутствия результатов поиска"
 * @returns {React.ReactElement} - react-элемент
 */

export const NoResultsBanner: React.FC = () => (
  <div className="banner">Oooops... nothing was found! Try something else!</div>
);
