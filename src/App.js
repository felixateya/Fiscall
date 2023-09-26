import React from 'react'
// import React from 'react';

import  './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Profile from './Pages/Profile';
import Income from './Pages/Income';
import Login from './Pages/Login';
import Expenses from './Pages/Expenses';
import Registration from './Pages/Registration'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/'element={<Login/>}/>
      <Route path='/Registration'element={<Registration/>}/>
        <Route path="/Dashboard"element={<Dashboard/>}/>
        <Route path="/Profile"element={<Profile/>}/>
        <Route path="/Income"element={<Income/>}/>
        <Route path="/Expenses"element={<Expenses/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App