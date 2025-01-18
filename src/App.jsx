import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Ride from './pages/Ride'
import Drive from './pages/Drive'
import React, { useCallback, useState } from 'react'
import { StateProvider } from './context/StateContext'

function App() {
  
  return (
    <>
    <StateProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='ride' element={<Ride />} />
        <Route path='drive' element={<Drive />} />
      </Routes>
      </StateProvider>
    </>
  )
}

export default App
