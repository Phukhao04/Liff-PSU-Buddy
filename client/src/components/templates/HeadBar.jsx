import Context from '@/contexts/Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
const HeadBar = () => {
  const { lineUser, switchLanguage, language } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-3xl shadow-xl p-2 max-w-md w-full mb-4">
      <div className="flex justify-between align-center">
        <div>
          <button
            onClick={() => switchLanguage()}
            className="bg-psu-andaman-blue-200 text-psu-deep-blue-500 rounded-full px-4 py-2 hover:bg-psu-andaman-blue-300 transition">
            {language === 'th' ? 'EN' : 'TH'}
          </button>
        </div>
        <div
          onClick={() => {
            navigate('/profile');
          }}
          className="flex justify-between align-center hover:cursor-pointer hover:bg-blue-50 rounded-full px-2 py-1 transition">
          <div className="flex flex-col text-psu-deep-blue-500 justify-center text-center mx-1 align-center max-[300px]:hidden">
            <p className="text-lg  text-psu-deep-blue-500">{lineUser.displayName}</p>
          </div>
          <div className="flex flex-col justify-center  mx-1">
            <img
              className="h-9 w-9 rounded-full shadow-md"
              src={lineUser.pictureUrl}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeadBar;
