import React from 'react';
import { Header } from '../header/Header';
import './MainLayout.scss';

export const MainLayout: React.FC = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <main className="page-content">{children}</main>
    </>
  );
};
