import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';

const HeadTab = ({ title = null, canBack = true, children }) => {
  const navigate = useNavigate();
  return (
    <div className='bg-white rounded-3xl shadow-xl p-4 max-w-md w-full mb-3'>
      <div className='flex justify-between align-center'>
        <div>
          {canBack && (
            <button
              className='flex items-center h-full  text-psu-deep-blue-500 hover:bg-psu-andaman-blue-200 rounded-full px-3 py-1 transition'
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft />
            </button>
          )}
        </div>
        <div className='flex justify-center align-center mx-auto'>
          {title ? <div className='text-xl font-bold'>{title}</div> : children}
        </div>
      </div>
    </div>
  );
};
export default HeadTab;
