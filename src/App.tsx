import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonPage, ComparisonPage, Catalogue } from './pages';
import { MainLayout } from './components/layout/MainLayout';

export const App = (): React.ReactElement => (
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
