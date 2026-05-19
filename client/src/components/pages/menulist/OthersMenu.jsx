import MenuButton from '@/components/modules/Button/MenuButton';
import GroupCard from '@/components/modules/card/GroupCard';
import HeadTab from '@/components/modules/Tab/HeadTab';
import Context from '@/contexts/Context';
import { useContext } from 'react';
import {
  FaBuilding,
  FaEarthAsia,
  FaFacebook,
  FaPhone,
  FaInstagram,
} from 'react-icons/fa6';
import { RiMentalHealthFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const langs = {
  titleTab: {
    th: 'อื่นๆ',
    en: 'Others',
  },

  psuToeicCard: {
    th: 'PSU TOEIC',
    en: 'PSU TOEIC',
  },
  psuToeicFacebook: {
    // https://www.facebook.com/TOEICPSUHatyai
    th: 'Facebook: TOEIC PSU Hatyai',
    en: 'Facebook: TOEIC PSU Hatyai',
  },
  psuToeicPhone: {
    th: 'โทรศัพท์: 074-282205',
    en: 'Phone: 074-282205',
  },

  sdaCard: {
    th: 'กองพัฒนานักศึกษาและศิษย์เก่าสัมพันธ์ ม.อ.',
    en: 'Student Development and Alumni Relations Division, PSU',
  },
  sdaWebsite: {
    //https://student.psu.ac.th/web/main/home
    th: 'เว็บไซต์: กองพัฒนานักศึกษาและศิษย์เก่าสัมพันธ์ ม.อ.',
    en: 'Website: Student Development and Alumni Relations Division, PSU',
  },
  sdaFacebook: {
    // https://www.facebook.com/sda.psu
    th: 'Facebook: กองพัฒนานักศึกษาและศิษย์เก่าสัมพันธ์ ม.อ.',
    en: 'Facebook: Student Development and Alumni Relations Division, PSU',
  },
  sdaInstragram: {
    // https://www.instagram.com/sda.psu
    th: 'Instagram: sda.psu',
    en: 'Instagram: sda.psu',
  },
};

const OthersMenu = () => {
  const { language, liff } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      <HeadTab title={langs.titleTab[language]}></HeadTab>
      <GroupCard groupName={langs.psuToeicCard[language]}>
        <MenuButton
          icon={<FaFacebook />}
          text={langs.psuToeicFacebook[language]}
          onClick={() =>
            liff.openWindow({ url: 'https://www.facebook.com/TOEICPSUHatyai' })
          }
        >
          {langs.psuToeicFacebook[language]}
        </MenuButton>
        <MenuButton
          icon={<FaPhone />}
          text={langs.psuToeicPhone[language]}
          onClick={() => liff.openWindow({ url: 'tel:074-282205' })}
        >
          {langs.psuToeicPhone[language]}
        </MenuButton>
      </GroupCard>
      <GroupCard groupName={langs.sdaCard[language]}>
        <MenuButton
          icon={<FaEarthAsia />}
          text={langs.sdaWebsite[language]}
          onClick={() =>
            liff.openWindow({ url: 'https://student.psu.ac.th/web/main/home' })
          }
        >
          {langs.sdaWebsite[language]}
        </MenuButton>
        <MenuButton
          icon={<FaFacebook />}
          text={langs.sdaFacebook[language]}
          onClick={() =>
            liff.openWindow({ url: 'https://www.facebook.com/sda.psu' })
          }
        >
          {langs.sdaFacebook[language]}
        </MenuButton>
        <MenuButton
          icon={<FaInstagram />}
          text={langs.sdaInstragram[language]}
          onClick={() =>
            liff.openWindow({ url: 'https://www.instagram.com/sda.psu' })
          }
        >
          {langs.sdaInstragram[language]}
        </MenuButton>
      </GroupCard>
    </>
  );
};
export default OthersMenu;
