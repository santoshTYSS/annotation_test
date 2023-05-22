
import './App.css';
import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Annotation from './Annotation';
import AppPage from './AppPage';
import  { useState, useEffect } from 'react';

const App = () => {


  return (
      <Router>
      <Routes>
         <Route path="/" element={<AppPage/>} />
          <Route path="/annotation/:param1/:param2" element={<Annotation/>} />
        </Routes>
      </Router>
  );
};

export default App;

