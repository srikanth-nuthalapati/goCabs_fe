import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profileImage from '/profile.jpg'
import { StateContext } from '../../context/StateContext';
import Loading from '../ui/Loading';
import Message from '../ui/Message';
import { Menu } from 'lucide-react';

export default function Header() {

  const navigate = useNavigate();

  const { guestLogin, isAuthenticated, setIsAuthenticated, currentUser } = useContext(StateContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const user = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(!!user);
  }, [currentUser]);

  const handleGuestLogin = async () => {
    setLoading(true);
    setMenuOpen(false);
    try {
      await guestLogin();
      setMessage('logged in as Guest')
      navigate('/ride')
    }
    catch (error) {
      setMessage(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  const handleRideClick = () => {
    isAuthenticated ? navigate('/ride') : navigate('/login');
  }

  const toggleMenu = () => setMenuOpen((prev) => !prev);


  return (
    <>
      <header
        className={`header w-full 
          ${isAuthenticated ? 'bg-white text-black' : 'text-white bg-black p-5'}`
        }>
        <nav
          className={`nav flex justify-between items-center text-sm font-semibold relative 
            ${isAuthenticated ? 'border-b-[2px] pr-[20px]' : ''}`
          }>
          <ul className='px-[15px] flex items-center ml-5 gap-4'>
            <li className={`text-[25px] ${isAuthenticated ? 'py-2' : ''}`}>
              <Link to={isAuthenticated ? '/ride' : '/'}>goCabs</Link>
            </li>
            <li
              onClick={handleRideClick}
              className={`flex text-[20px] items-center py-[3px] px-[15px] cursor-pointer ${location.pathname === '/ride' ? ' py-[30px] border-b-[2px] border-b-black' : ''} ${!isAuthenticated ? 'hover:bg-[#776464e7] rounded-[30px]' : ''}`}>Ride</li>
          </ul>

          <button 
            className={`md:hidden ${isAuthenticated ? 'p-4' : 'text-white bg-transparent'} p-2 hover:bg-[rgba(177,173,173,0.9)] rounded`}
            onClick={toggleMenu}
          >
            <Menu className='w-6 h-6' />
          </button>

          <ul 
            className={`absolute md:static z-10 right-0 ${isAuthenticated ? 'text-black bg-white top-[80px]' : 'top-[58px] bg-black text-white right-[-20px] rounded-lg'} md:bg-transparent md:flex items-center gap-3 transition-all ease-in
              ${menuOpen ? 'flex flex-col p-[20px] border' : 'hidden md:flex'}`
            }>
            {!isAuthenticated ? (
              <>
                <li 
                  onClick={handleGuestLogin} 
                  className='text-[18px] flex items-center py-[4px] px-[12px] cursor-pointer hover:bg-[#776464ea] rounded-[30px]'>
                    Guest
                </li>
                <li 
                  className='text-[18px] flex items-center py-[4px] px-[12px] cursor-pointer hover:bg-[#776464d2] rounded-[30px]'>
                    <Link to={'/login'}>Log in</Link>
                </li>
                <button className='font-light text-[18px] flex items-center py-[3px] px-[12px] bg-white text-black cursor-pointer hover:bg-[rgba(255,255,255,0.9)] rounded-[30px]' >
                  <Link to={'/signup'}>Sign up</Link>
                </button>
              </>
            ) : (
              <li className='flex items-center'>
                <Link to={'/profile'}>
                  {menuOpen ? (
                    <p 
                      className='p-2 hover:bg-[rgba(197,180,180,0.53)] rounded-xl'
                      onClick={() => setMenuOpen(prev => !prev)}
                    >
                        profile
                    </p>
                  ) :
                  (
                  <img 
                    width={50} 
                    className='bg-black mr-[30px] rounded-[50%]' 
                    src={profileImage} 
                    alt="profile" 
                    title='profile' 
                  />
                  )}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {loading && (
          <Loading />
        )}

      </header>

      {message && (
        <Message message={message} onClose={() => setMessage('')} />
      )}

    </>
  )
}
