import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonPage, ComparisonPage, Catalogue } from './pages';
import { MainLayout } from './components';

/**
 * Компонент "Роутинг"
 * Отображает компоненты по указанному роутингу
 * @returns {React.ReactElement} - react-элемент
 */

export const App: React.FC = () => (
  <Router>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/:name" element={<PokemonPage />} />
        <Route path="comparison" element={<ComparisonPage />} />
      </Routes>
    </MainLayout>
  </Router>
);
