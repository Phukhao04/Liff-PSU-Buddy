import Context from '@/contexts/Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaTimes, FaUser } from 'react-icons/fa';

const Footer = () => {
  const { liff } = useContext(Context);
  const navigate = useNavigate();
  return (
    <footer className='fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.07)] z-50'>
      <nav className='flex justify-between items-center px-2 py-1 max-w-md mx-auto'>
        <button
          onClick={() => {
            // to Home
            navigate('/');
          }}
          className='flex flex-col items-center flex-1 py-2 text-psu-deep-blue-500 hover:text-psu-ocean-blue-500'
        >
          <span className='text-2xl'>
            <FaHome />
          </span>
          <span className='text-xs'>Home</span>
        </button>
        <button
          onClick={() => {
            navigate('/menu');
          }}
          className='flex flex-col items-center flex-1 py-2 text-psu-deep-blue-500 hover:text-psu-ocean-blue-500'
        >
          <span className='text-2xl'>
            <FaBars />
          </span>
          <span className='text-xs'>Menu</span>
        </button>
        {/* Main Menu (center) */}
        {/* <button className="relative flex flex-col items-center flex-1">
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-500 text-white rounded-full p-4 shadow-lg text-3xl border-4 border-white">
            ➕
          </span>
          <span className="mt-8 text-xs text-blue-600 font-bold">Main</span>
        </button>*/}

        <button
          onClick={() => {
            navigate('/profile');
          }}
          className='flex flex-col items-center flex-1 py-2 text-psu-deep-blue-500 hover:text-psu-ocean-blue-500'
        >
          <span className='text-xl'>
            <FaUser />
          </span>
          <span className='text-xs'>Profile</span>
        </button>
        <button
          onClick={() => {
            liff.closeWindow();
          }}
          className='flex flex-col items-center flex-1 py-2 text-psu-deep-blue-500 hover:text-psu-ocean-blue-500'
        >
          <span className='text-xl'>
            <FaTimes />
          </span>
          <span className='text-xs'>Close</span>
        </button>
      </nav>
    </footer>
  );
};

export default Footer;
