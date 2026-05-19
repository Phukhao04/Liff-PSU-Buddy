import MenuButton from '@/components/modules/Button/MenuButton';
import GroupCard from '@/components/modules/card/GroupCard';
import HeadTab from '@/components/modules/Tab/HeadTab';
import Context from '@/contexts/Context';
import { useContext } from 'react';
import { FaBuilding, FaFacebook, FaPhone } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const langs = {
  titleTab: {
    th: 'เมนูหอพักนักศึกษา',
    en: 'Dormitory Menu',
  },
  menuCard: {
    th: 'เมนูหอพัก',
    en: 'Dormitory Menu',
  },
  dormSystem: {
    th: 'ระบบจัดการหอพักนักศึกษา',
    en: 'Student Dormitory Management System',
  },
  contactCard: {
    th: 'ติดต่อ',
    en: 'Contact',
  },
  facebookLink: {
    th: 'Facebook หอพักนักศึกษา',
    en: 'Student Dormitory Facebook',
  },
  telephoneLink: {
    th: 'เบอร์โทร : 074282681',
    en: 'Telephone : 074282681',
  },
};

const DormitoryMenu = () => {
  const { language, liff } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      <HeadTab title={langs.titleTab[language]}></HeadTab>
      <GroupCard groupName={langs.menuCard[language]}>
        <MenuButton
          onClick={() => {
            liff.openWindow({
              url: 'https://dorm.psu.ac.th/system',
              external: true,
            });
          }}
          icon={<FaBuilding />}
        >
          {langs.dormSystem[language]}
        </MenuButton>
      </GroupCard>
      <GroupCard groupName={langs.contactCard[language]}>
        <MenuButton
          onClick={() => {
            liff.openWindow({
              url: 'https://www.facebook.com/dormpsuhatyai',
              external: true,
            });
          }}
          icon={<FaFacebook />}
        >
          {langs.facebookLink[language]}
        </MenuButton>
        <MenuButton
          onClick={() => {
            liff.openWindow({
              url: 'tel:074282681',
              external: true,
            });
          }}
          icon={<FaPhone />}
        >
          {langs.telephoneLink[language]}
        </MenuButton>
      </GroupCard>
    </>
  );
};
export default DormitoryMenu;
