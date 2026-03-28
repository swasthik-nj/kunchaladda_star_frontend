import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'
import Loader from './components/Loader'
import SeoMeta from './components/SeoMeta'

const Home = lazy(() => import('./Home'))
const Gallery = lazy(() => import('./components/Gallery'))
const Members = lazy(() => import('./components/Members'))
const Adminnj = lazy(() => import('./components/Adminnj'))
const Events = lazy(() => import('./components/Events'))
const Register = lazy(() => import('./components/Register'))
const Login = lazy(() => import('./components/Login'))
const VerifyEmail = lazy(() => import('./components/VerifyEmail'))

function RouteSeo() {
  const { pathname } = useLocation()

  const seoByPath = {
    '/': {
      title: 'Kunchaladda Family - Alankar, Kadaba | History, Members and Updates',
      description:
        'Official website of the Kunchaladda Family from Alankar, Kadaba, Karnataka. Explore family history, members, events, photos, and community updates.',
      noindex: false,
    },
    '/gallery': {
      title: 'Family Gallery | Kunchaladda Family',
      description:
        'Browse family photos, memories, and special moments shared by the Kunchaladda Family community.',
      noindex: false,
    },
    '/gallary': {
      title: 'Family Gallery | Kunchaladda Family',
      description:
        'Browse family photos, memories, and special moments shared by the Kunchaladda Family community.',
      noindex: false,
    },
    '/members': {
      title: 'Family Members | Kunchaladda Family',
      description:
        'Discover the members of Kunchaladda Family and stay connected across generations.',
      noindex: false,
    },
    '/events': {
      title: 'Family Events | Kunchaladda Family',
      description:
        'View upcoming and past family events, traditions, and gatherings organized by Kunchaladda Family.',
      noindex: false,
    },
    '/admin': {
      title: 'Admin Dashboard | Kunchaladda Family',
      description: 'Admin dashboard for Kunchaladda Family website management.',
      noindex: true,
    },
    '/login': {
      title: 'Login | Kunchaladda Family',
      description: 'Login to access your Kunchaladda Family account.',
      noindex: true,
    },
    '/register': {
      title: 'Register | Kunchaladda Family',
      description: 'Create your Kunchaladda Family account to join the community.',
      noindex: true,
    },
    '/verify-email': {
      title: 'Verify Email | Kunchaladda Family',
      description: 'Verify your email address to activate your account.',
      noindex: true,
    },
  }

  const current = seoByPath[pathname] || seoByPath['/']
  const canonicalPath = pathname === '/gallary' ? '/gallery' : pathname

  return (
    <SeoMeta
      title={current.title}
      description={current.description}
      canonicalPath={canonicalPath}
      path={pathname}
      noindex={current.noindex}
    />
  )
}

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <RouteSeo />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/gallery' element={<Gallery/>}/>
          <Route path='/gallary' element={<Gallery/>}/>
          <Route path='/members' element={<Members/>}/>
          <Route path='/events' element={<Events/>}/>
          <Route path='/admin' element={<Adminnj/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/verify-email' element={<VerifyEmail/>}/>
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
