import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Ride from './pages/Ride'
import Drive from './pages/Drive'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { StateProvider } from './context/StateContext'

function App() {
  
  return (
    <>
    <StateProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/ride' element={<Ride />} />
        <Route path='/drive' element={<Drive />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes> 
    </StateProvider>
    </> 
  )
}

export default App
