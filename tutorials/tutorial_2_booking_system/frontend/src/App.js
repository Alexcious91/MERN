import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import Auth from './pages/Auth'
import Events from './pages/Events'
import Bookings from './pages/Bookings'
import NavbarComponent from './components/Navbar'

function App() {
  return (
    <Router>
      <NavbarComponent/>
      <Routes>
        <Route path='/' element={<Navigate to="/auth" replace/>}/>
        <Route path='/auth' element={<Auth />}/>
        <Route path='/events' element={<Events />}/>
        <Route path='/bookings' element={<Bookings />}/>
      </Routes>
    </Router>
  )
}

export default App
