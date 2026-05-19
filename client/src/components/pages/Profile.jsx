import { useContext, useEffect, useState } from 'react';

import Context from '@/contexts/Context';

const Profile = () => {
  const { language, theUser, lineUser } = useContext(Context);

  useEffect(() => {
    // console.log('Context values:', { language, theUser });
  }, [language, theUser]);

  return (
    <>
      <div className="bg-white  rounded-3xl shadow-xl p-4 max-w-md w-full">
        {/* set button to right */}

        <h1 className="text-3xl font-bold text-cente mb-4">
          {language === 'th' ? 'ข้อมูลส่วนตัวของคุณ' : 'Your profile.'}
        </h1>

        <h2 className="text-xl font-semibold text-center mb-4">
          {theUser?.name[language] || 'Guest'}
        </h2>
        {theUser ? (
          theUser.psuType === 'staff' ? (
            <>
              {/* staffId */}
              <div className="text-center  mb-2">
                <div className="inline-block font-semibold mr-2">
                  {language === 'th' ? 'รหัสพนักงาน' : 'Staff ID'}:
                </div>
                <div className="inline-block font-semibold mr-2">
                  {theUser?.psuId || ''}
                </div>
              </div>
              {/* posNameThai posNameEng */}
              <div className="text-center  mb-2">
                <div className="inline-block font-semibold mr-2">
                  {language === 'th' ? 'ตำแหน่ง' : 'Position'}:
                </div>
                <div className="inline-block font-semibold mr-2">
                  {language === 'th'
                    ? theUser?.posNameThai || ''
                    : theUser?.posNameEng || ''}{' '}
                  ({theUser?.posTypeName})
                </div>
              </div>
              {/* campusName */}
              <div className="text-center  mb-2">
                <div className="inline-block font-semibold mr-2">
                  {language === 'th' ? 'วิทยาเขต' : 'Campus'}:
                </div>
                <div className="inline-block font-semibold mr-2">
                  {theUser?.campusName[language] || theUser?.campusName['th']}
                </div>
              </div>
              {/* facName */}
              <div className="text-center  mb-2">
                <div className="inline-block font-semibold mr-2">
                  {language === 'th' ? 'คณะ' : 'Faculty'}:
                </div>
                <div className="inline-block font-semibold mr-2">
                  {theUser?.facName[language] || theUser?.facName['th']}
                </div>
              </div>
              {/* deptName */}
              <div className="text-center  mb-2">
                <div className="inline-block font-semibold mr-2">
                  {language === 'th' ? 'หน่วยงาน' : 'Department'}:
                </div>
                <div className="inline-block font-semibold mr-2">
                  {theUser?.deptName[language] || theUser?.deptName['th']}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* psuId */}
              <div className="text-center  mb-2">
                <div className="inline-block font-semibold mr-2">
                  {language === 'th' ? 'รหัสนักศึกษา' : 'Student ID'}:
                </div>
                <div className="inline-block font-semibold mr-2">
                  {theUser?.psuId || ''}
                </div>
              </div>
              {/* campusName */}
              <div className="text-center  mb-2">
                {/* inLine */}
                <div className="inline-block font-semibold mr-2">
                  {language === 'th' ? 'วิทยาเขต' : 'Campus'}:
                </div>
                <div className="inline-block font-semibold mr-2">
                  {theUser?.campusName[language] || theUser?.campusName['th']}
                </div>
              </div>
              {/* facName */}
              <div className="text-center  mb-2">
                <div className="inline-block font-semibold mr-2">
                  {language === 'th' ? 'คณะ' : 'Faculty'}:
                </div>
                <div className="inline-block font-semibold mr-2">
                  {theUser?.facName[language] || theUser?.facName['th']}
                </div>
              </div>
              {/* deptName */}
              <div className="text-center  mb-2">
                <div className="inline-block font-semibold mr-2">
                  {language === 'th' ? 'สาขา' : 'Department'}:
                </div>
                <div className="inline-block font-semibold mr-2">
                  {theUser?.deptName[language] || theUser?.deptName['th']}
                </div>
              </div>
            </>
          )
        ) : (
          <p className="text-center text-red-500 mb-4">
            {language === 'th'
              ? 'ไม่พบข้อมูลผู้ใช้ โปรดตรวจสอบการเชื่อมต่อกับ PSU Passport'
              : 'User data not found. Please check your connection with PSU Passport.'}
          </p>
        )}
      </div>
    </>
  );
};

export default Profile;
