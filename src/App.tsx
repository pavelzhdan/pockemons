import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import PockemonPage from './components/PockemonPage';
import ComparisonPage from './components/ComparisonPage';

const App = function (): React.ReactElement {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/:name" element={<PockemonPage />} />
        <Route path="comparison" element={<ComparisonPage />} />
      </Routes>
    </Router>
  );
};

export default App;
