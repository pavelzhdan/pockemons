import React from 'react';
import { Header } from '../header/Header';
import './MainLayout.scss';

/**
 * Компонент "Общий макет страницы"
 * @returns {React.ReactElement} - react-элемент
 */

export const MainLayout: React.FC = ({ children }) => (
  <>
    <Header />
    <main className="page-content">{children}</main>
  </>
);
