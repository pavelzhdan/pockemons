import React from 'react';
import Header from '../header/Header';
import './MainLayout.scss';

const MainLayout: React.FC = function (props) {
  const { children } = props;

  return (
    <>
      <Header />
      <main className="page-content">{children}</main>
    </>
  );
};
export default MainLayout;
