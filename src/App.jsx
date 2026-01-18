import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'
import Loader from './components/Loader'

const Home = lazy(() => import('./Home'))
const Gallery = lazy(() => import('./components/Gallery'))
const Members = lazy(() => import('./components/Members'))
const Register = lazy(() => import('./components/Register'))
const Login = lazy(() => import('./components/Login'))
const VerifyEmail = lazy(() => import('./components/VerifyEmail'))

function App() {
  return (
    <Suspense fallback={<Loader />}>
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
    </Suspense>
  )
}

export default App
