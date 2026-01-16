import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './Home'
import Gallery from './components/Gallery'
import './App.css'
import Members from './components/Members'
import Register from './components/Register'
import Login from './components/Login'
import VerifyEmail from './components/VerifyEmail'

function App() {
  

  return (
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

  )
}

export default App
