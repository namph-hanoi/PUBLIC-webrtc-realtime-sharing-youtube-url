import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import styles from './App.module.css';
import './index.css';
import HomePage from './app/containers/Home';
import CreateSharing from './app/containers/CreateSharing';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/share" element={<CreateSharing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
