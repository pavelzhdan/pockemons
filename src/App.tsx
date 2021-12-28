import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import PockemonPage from './pages/PockemonPage';
import ComparisonPage from './pages/ComparisonPage';
import Catalogue from './pages/Catalogue';

const App = function (): React.ReactElement {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/:name" element={<PockemonPage />} />
        <Route path="comparison" element={<ComparisonPage />} />
      </Routes>
    </Router>
  );
};

export default App;
