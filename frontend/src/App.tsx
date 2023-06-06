import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.module.css';
import './index.css';
import HomePage from './app/containers/Home';
import CreateSharing from './app/containers/CreateSharing';
import GlobalContainer from './app/containers/Global';
import ProtectedRoutes from './app/components/ProtectedRoute';
function App() {
  return (
    <div className="App">
      <GlobalContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/share" element={<ProtectedRoutes />}>
              <Route path='' element={<CreateSharing />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContainer>
    </div>
  );
}

export default App;
