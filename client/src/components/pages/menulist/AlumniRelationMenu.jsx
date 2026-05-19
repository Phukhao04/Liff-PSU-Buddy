import MenuButton from '@/components/modules/Button/MenuButton';
import GroupCard from '@/components/modules/card/GroupCard';
import HeadTab from '@/components/modules/Tab/HeadTab';
import Context from '@/contexts/Context';
import { useContext } from 'react';
import { FaBuilding, FaEarthAsia, FaFacebook, FaPhone } from 'react-icons/fa6';
import { RiMentalHealthFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const langs = {
  titleTab: {
    th: 'ศิษย์เก่าสัมพันธ์',
    en: 'Alumni Relations',
  },

  alumniCard: {
    th: 'ศิษย์เก่าสัมพันธ์',
    en: 'Alumni Relations',
  },
  alumniWebsite: {
    // alumni.psu.ac.th
    th: 'เว็บไซต์ศิษย์เก่าสัมพันธ์',
    en: 'Alumni Relations Website',
  },

  contactCard: {
    th: 'ติดต่อ',
    en: 'Contact',
  },
  contactFacebook: {
    // https://www.facebook.com/alumnipsu
    th: 'Facebook: ศิษย์เก่าสัมพันธ์ ม.อ.',
    en: 'Facebook: PSU Alumni Relations',
  },
  contactPhone: {
    th: 'โทรศัพท์: 074-282207',
    en: 'Phone: 074-282207',
  },
};

const AlumniRelationMenu = () => {
  const { language, liff } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      <HeadTab title={langs.titleTab[language]}></HeadTab>

      <GroupCard groupName={langs.alumniCard[language]}>
        <MenuButton
          text={langs.alumniWebsite[language]}
          icon={<FaEarthAsia />}
          onClick={() => liff.openWindow({ url: 'https://alumni.psu.ac.th' })}
        >
          {langs.alumniWebsite[language]}
        </MenuButton>
      </GroupCard>
      <GroupCard groupName={langs.contactCard[language]}>
        <MenuButton
          text={langs.contactFacebook[language]}
          icon={<FaFacebook />}
          onClick={() =>
            liff.openWindow({ url: 'https://www.facebook.com/alumnipsu' })
          }
        >
          {langs.contactFacebook[language]}
        </MenuButton>
        <MenuButton
          text={langs.contactPhone[language]}
          icon={<FaPhone />}
          onClick={() => liff.openWindow({ url: 'tel:074282207' })}
        >
          {langs.contactPhone[language]}
        </MenuButton>
      </GroupCard>
    </>
  );
};
export default AlumniRelationMenu;
