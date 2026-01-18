import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { useState, useEffect, Suspense } from 'react'
import Home from './Home'
import Gallery from './components/Gallery'
import './App.css'
import Members from './components/Members'
import Register from './components/Register'
import Login from './components/Login'
import VerifyEmail from './components/VerifyEmail'
import Loader from './components/Loader'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/gallary' element={<Gallery/>}/>
          <Route path='/members' element={<Members/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/verify-email' element={<VerifyEmail/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
