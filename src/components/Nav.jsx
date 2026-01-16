import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePopup from './ProfilePopup';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
   
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
    }


    const handleStorageChange = (e) => {
      if (e.key === 'user' && e.newValue) {
        const updatedUser = JSON.parse(e.newValue);
        setUser(updatedUser);
        
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setShowDropdown(false);
    navigate('/');
  };

  const handleProfileUpdate = (updatedUser) => {
    console.log('Profile updated in Nav:', updatedUser);
    console.log('New avatar URL:', updatedUser.avatar?.url || updatedUser.avatar);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    // Update state with the new user data to trigger re-render
    setUser(updatedUser);
  };

  return (
    <>
      <nav className='bg-gray-800/70 h-16 fixed top-0 left-0 right-0 text-white mx-3 mt-3 md:mx-8 md:mt-4 rounded-xl flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-20 md:h-20 lg:h-20 z-40'>
        <div className='text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold'>
          <h1>
            <span className='text-amber-700 text-2xl'>K</span>unchaladda
            <span className='text-amber-700 text-2xl font-sans'>S</span>tar
          </h1>
        </div>

        
        <button 
          onClick={toggleMenu}
          className='lg:hidden flex flex-col cursor-pointer z-50'
          aria-label='Toggle menu'
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

       
        <div className='hidden lg:flex items-center gap-0'>
          <div className='flex flex-row'>
            <a href='/' className='px-4 py-3 lg:mx-4 lg:py-0 hover:text-yellow-400 lg:text-lg transition duration-300'>
              Home
            </a>
            <a href='#about' className='px-4 py-3 lg:mx-4 lg:py-0 hover:text-yellow-400 lg:text-lg transition duration-300'>
              About
            </a>
            <a href='/gallary' className='px-4 py-3 lg:mx-4 lg:py-0 hover:text-yellow-400 lg:text-lg transition duration-300'>
              Gallery
            </a>
            <a href='#footer' className='px-4 py-3 lg:mx-4 lg:py-0 hover:text-yellow-400 lg:text-lg transition duration-300'>
              Contact
            </a>
          </div>
          <div className='flex lg:ml-36 border-l border-gray-700 pl-4'>
            {user ? (
              <div className='relative'>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className='flex items-center gap-2 hover:opacity-80 transition'
                >
                  <img
                    key={user?.avatar?.url}
                    src={typeof user.avatar === 'string' ? user.avatar : (user.avatar?.url || 'https://placehold.co/40x40')}
                    alt={user.fullname}
                    onError={(e) => {
                      // console.log('Image failed to load:', e.target.src);
                      e.target.src = 'https://placehold.co/40x40';
                    }}
                    onLoad={() => {
                      // console.log('Image loaded successfully:', typeof user.avatar === 'string' ? user.avatar : (user.avatar?.url || 'https://placehold.co/40x40'));
                    }}
                    className='w-10 h-10 rounded-full object-cover border-2 border-yellow-400'
                  />
                  <span className='hidden md:block text-sm'>{user.fullname}</span>
                </button>
                
                {showDropdown && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50'>
                    <button
                      className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100'
                      onClick={() => {
                        setShowProfilePopup(true);
                        setShowDropdown(false);
                      }}
                    >
                      Profile
                    </button>
                    <a
                      href='/settings'
                      className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                      onClick={() => setShowDropdown(false)}
                    >
                      Settings
                    </a>
                    <hr className='my-1' />
                    <button
                      onClick={handleLogout}
                      className='block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100'
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a href='/login' className='px-4 py-3 lg:mx-4 lg:py-0 hover:text-yellow-400 lg:text-lg transition duration-300'>
                Login
              </a>
            )}
          </div>
        </div>
      </nav>

      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800/95 shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col h-full text-white'>
          
          <div className='flex justify-end p-4'>
            <button
              onClick={() => setIsOpen(false)}
              className='text-white hover:text-yellow-400 focus:outline-none'
              aria-label='Close menu'
            >
              <svg
                className='h-6 w-6'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          
          <div className='flex flex-col space-y-1 px-4 py-2'>
            <a
              href='/'
              className='text-white hover:text-yellow-400 hover:bg-gray-700 px-4 py-3 rounded-md text-base font-medium transition duration-300'
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href='#about'
              className='text-white hover:text-yellow-400 hover:bg-gray-700 px-4 py-3 rounded-md text-base font-medium transition duration-300'
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href='/gallary'
              className='text-white hover:text-yellow-400 hover:bg-gray-700 px-4 py-3 rounded-md text-base font-medium transition duration-300'
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </a>
            <a
              href='#footer'
              className='text-white hover:text-yellow-400 hover:bg-gray-700 px-4 py-3 rounded-md text-base font-medium transition duration-300'
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <div className='border-t border-gray-700 my-2'></div>
            {user ? (
              <>
                <div className='px-4 py-3 flex items-center gap-3'>
                  <img
                    key={user?.avatar?.url}
                    src={typeof user.avatar === 'string' ? user.avatar : (user.avatar?.url || 'https://placehold.co/40x40')}
                    alt={user.fullname}
                    onError={(e) => {
                      // console.log('Mobile image failed to load:', e.target.src);
                      e.target.src = 'https://placehold.co/40x40';
                    }}
                    onLoad={() => {
                      // console.log('Mobile image loaded successfully:', typeof user.avatar === 'string' ? user.avatar : (user.avatar?.url || 'https://placehold.co/40x40'));
                    }}
                    className='w-10 h-10 rounded-full object-cover border-2 border-yellow-400'
                  />
                  <span className='text-sm font-medium'>{user.fullname}</span>
                </div>
                <button
                  className='text-white hover:text-yellow-400 hover:bg-gray-700 px-4 py-3 rounded-md text-base font-medium transition duration-300 text-left w-full'
                  onClick={() => {
                    setShowProfilePopup(true);
                    setIsOpen(false);
                  }}
                >
                  Profile
                </button>
                <a
                  href='/settings'
                  className='text-white hover:text-yellow-400 hover:bg-gray-700 px-4 py-3 rounded-md text-base font-medium transition duration-300'
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </a>
                <button
                  onClick={handleLogout}
                  className='text-red-400 hover:text-red-500 hover:bg-gray-700 px-4 py-3 rounded-md text-base font-medium transition duration-300 text-left w-full'
                >
                  Logout
                </button>
              </>
            ) : (
              <a
                href='/login'
                className='text-white hover:text-yellow-400 hover:bg-gray-700 px-4 py-3 rounded-md text-base font-medium transition duration-300'
                onClick={() => setIsOpen(false)}
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>

      <ProfilePopup 
        user={user} 
        isOpen={showProfilePopup} 
        onClose={() => setShowProfilePopup(false)}
        onProfileUpdate={handleProfileUpdate}
      />
    </>
  );
}