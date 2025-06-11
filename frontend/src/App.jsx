import React from 'react';
import './App.css';
import Login from './components/login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Registration from './components/register';
import Task from './components/task';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/profile'
          element={<Task />}
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
