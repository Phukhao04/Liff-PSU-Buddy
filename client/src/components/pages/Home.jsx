import { useContext, useEffect, useState } from 'react';

import Context from '@/contexts/Context';

const lang = {
  welcome: {
    th: 'ยินดีต้อนรับกลับ',
    en: 'Welcome back',
  },
  sendmessage: {
    th: 'ส่งข้อความ',
    en: 'Send Message',
  },
  logout: {
    th: 'ออกจากระบบ',
    en: 'Logout',
  },
  login: {
    th: 'เข้าสู่ระบบ',
    en: 'Login',
  },
  pleaseLogin: {
    th: 'กรุณาเข้าสู่ระบบ PSU Passport เพื่อดำเนินการต่อ',
    en: 'Please log in PSU Passport to continue',
  },
};

const footer = true;
const Home = () => {
  const { language, theUser, liff, lineUser } = useContext(Context);
  const login = async () => {
    if (!liff.isLoggedIn()) {
      await liff.login();
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl  p-4 max-w-md w-full">
        {/* set button to right */}

        <h1 className="text-3xl font-bold text-center mb-4">
          PSU Buddy Home
        </h1>

        {(theUser && (
          <p className="text-md  text-center mb-4">
            {lang.welcome[language]} {theUser.name[language]}!
          </p>
        )) || (
          <p className="text-md  text-center mb-4">
            {lang.pleaseLogin[language]}
          </p>
        )}

        {(lineUser?.userId && (
          <>
            <div className="flex flex-col items-center gap-4">
              <img
                className="h-24 w-24 rounded-full shadow-md"
                src={lineUser.pictureUrl}
                alt=""
              />
              <div className="text-center">
                <p className="text-lg  ">{lineUser.displayName}</p>
              </div>
            </div>
          </>
        )) || (
          <div className="flex flex-col gap-4 items-center">
            <button
              className="bg-amber-300 rounded-xl py-2  hover:bg-amber-400 transition"
              onClick={login}>
              {lang.login[language]}
            </button>
          </div>
        )}
      </div>

      {/* <>

        <div className="mt-6 grid grid-cols-2 gap-4 max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-xl p-4 flex items-center justify-between hover:scale-[1.02] transition cursor-pointer">
            <div className="w-100 text-center">Scholarship</div>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-4 flex items-center justify-between hover:scale-[1.02] transition cursor-pointer">
            <div className="w-100 text-center">Voice of Customer</div>
          </div>
        </div>
      </> */}
    </>
  );
};
export default Home;
