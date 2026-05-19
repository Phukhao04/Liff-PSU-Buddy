import Context from '@/contexts/Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../modules/Button/MenuButton';
import { FaBuilding, FaHamburger, FaTicketAlt } from 'react-icons/fa';
import {
  FaBahtSign,
  FaList,
  FaLocationDot,
  FaU,
  FaUser,
  FaUserGraduate,
} from 'react-icons/fa6';
import { RiMentalHealthFill, RiMentalHealthLine } from "react-icons/ri";
import HeadTab from '../modules/Tab/HeadTab';
const langs = {
  menuTitle: {
    th: 'เมนูต่างๆ',
    en: 'Various Menus',
  },
  activityStudent: {
    th: 'กิจกรรมของนักศึกษา',
    en: 'Student Activities',
  },
  dormitory: {
    th: 'หอพักนักศึกษา',
    en: 'Student Dormitory',
  },
  scholarship: {
    th: 'ทุนการศึกษา',
    en: 'Scholarship',
  },
  wellBeing: {
    th: 'สุขภาวะนักศึกษา',
    en: 'Well-being',
  },
  alumniRelation: {
    th: 'ศิษย์เก่าสัมพันธ์',
    en: 'Alumni Relation',
  },
  others: {
    th: 'อื่นๆ',
    en: 'Others',
  },
};

const Menu = () => {
  const { theUser, language } = useContext(Context);
  const navigate = useNavigate();
  return (
    <>
      <HeadTab title={langs.menuTitle[language]} canBack={false}></HeadTab>
      {theUser?.psuType == 'student' && (
        <div className='space-y-3 mb-3'>
          <MenuButton
            onClick={() => {
              navigate('/student/');
            }}
            icon={<FaUser />}
          >
            {langs.activityStudent[language]}
          </MenuButton>
          <MenuButton
            onClick={() => {
              navigate('/dormitory/');
            }}
            icon={<FaBuilding />}
          >
            {langs.dormitory[language]}
          </MenuButton>
          <MenuButton
            onClick={() => {
              navigate('/scholarship/');
            }}
            icon={<FaBahtSign />}
          >
            {langs.scholarship[language]}
          </MenuButton>
          <MenuButton
            onClick={() => {
              navigate('/well-being/');
            }}
            icon={<RiMentalHealthFill />}
          >
            {langs.wellBeing[language]}
          </MenuButton>
          <MenuButton
            onClick={() => {
              navigate('/alumni-relation/');
            }}
            icon={<FaUserGraduate />}
          >
            {langs.alumniRelation[language]}
          </MenuButton>
          <MenuButton
            onClick={() => {
              navigate('/others/');
            }}
            icon={<FaList />}
          >
            {langs.others[language]}
          </MenuButton>
        </div>
      )}
      {/* {theUser && (
        <>
          <MenuButton
            onClick={() => {
              navigate('/lucky-draw/');
            }}
            icon={<FaTicketAlt />}>
            Lucky Draw
          </MenuButton>

          <MenuButton
            onClick={() => {
              navigate('/check-location');
            }}
            icon={<FaLocationDot />}>
            Check Location
          </MenuButton>
        </>
      )} */}
    </>
  );
};

export default Menu;
