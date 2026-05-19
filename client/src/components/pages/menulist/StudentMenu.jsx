import Context from '@/contexts/Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../../modules/Button/MenuButton';
import { FaCalendarCheck, FaClock, FaPersonCircleCheck } from 'react-icons/fa6';
import { FaFacebook, FaPhone } from 'react-icons/fa6';
import HeadTab from '@/components/modules/Tab/HeadTab';
import GroupCard from '@/components/modules/card/GroupCard';
const langs = {
  menuTab: {
    th: 'กิจกรรมนักศึกษา',
    en: 'Student Activities',
  },
  menuTitle: {
    th: 'เมนูกิจกรรมนักศึกษา',
    en: 'Student Activities Menu',
  },
  activityCheck: {
    th: 'ตรวจสอบชั่วโมงกิจกรรม',
    en: 'Check Activity Hours',
  },
  activityRegister: {
    th: 'ตรวจสอบกิจกรรมที่สามารถลงทะเบียนได้',
    en: 'Registerable Activities',
  },
  competencyLink: {
    th: 'ระบบสมรรถนะ',
    en: 'Competency System',
  },
  contactTitle: {
    th: 'ติดต่อ',
    en: 'Contact',
  },
  contactFachebook: {
    th: 'Facebook: งานพัฒนานักศึกษา ม.อ. หาดใหญ่',
    en: 'Facebook: PSU Student Development Section',
  },
  contactPhone: {
    th: 'โทรศัพท์: 074-282209',
    en: 'Phone: 074-282209',
  },

};

const StudentMenu = () => {
  const { theUser, language, liff } = useContext(Context);
  const navigate = useNavigate();
  return (
    <>
      <HeadTab title={langs.menuTab[language]}></HeadTab>
      {theUser?.psuType == 'student' && (
        <div className='mb-3'>
          {/* Menu */}

          <GroupCard groupName={langs.menuTitle[language]}>
            <MenuButton
              onClick={() => {
                navigate('/student/activity-check');
              }}
              icon={<FaClock />}
            >
              {langs.activityCheck[language]}
            </MenuButton>
            <MenuButton
              onClick={() => {
                navigate('/student/activity-register');
              }}
              icon={<FaCalendarCheck />}
            >
              {langs.activityRegister[language]}
            </MenuButton>
            <MenuButton
              onClick={() => {
                liff.openWindow({
                  url: 'https://transcript.psu.ac.th/competency/',
                  external: true,
                });
              }}
              icon={<FaPersonCircleCheck />}
            >
              {langs.competencyLink[language]}
            </MenuButton>
          </GroupCard>

          {/* contact */}

          <GroupCard groupName={langs.contactTitle[language]}>
            <MenuButton
              onClick={() =>
                liff.openWindow({
                  url: 'https://www.facebook.com/psusds',
                  external: true,
                })
              }
              icon={<FaFacebook />}
            >
              {langs.contactFachebook[language]}
            </MenuButton>

            <MenuButton
              onClick={() =>
                liff.openWindow({
                  url: 'tel:074282209',
                  external: true,
                })
              }
              icon={<FaPhone />}
            >
              {langs.contactPhone[language]}
            </MenuButton>
          </GroupCard>

          
        </div>
      )}
    </>
  );
};

export default StudentMenu;
