import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/forms/auth/Signup'
import Login from './components/forms/auth/Login'
import Navbar from './components/Navbar'
import Home from './components/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
