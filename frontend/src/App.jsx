import React from 'react';
import './App.css';
import Login from './components/login/index.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Registration from './components/register/index.jsx';
import Home from './components/home/index.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/signup'
          element={<Registration />}
        />
        <Route
          path='*'
          element={<Navigate to='/login' />}
        />
      </Routes>
    </Router>
  );
}

export default App;
