import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
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
