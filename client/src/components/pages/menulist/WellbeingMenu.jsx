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
    th: 'เมนูสุขภาพและความเป็นอยู่',
    en: 'Well-Being Menu',
  },

  formCard: {
    th: 'แบบประเมินสุขภาพจิต',
    en: 'Mental Health Assessment Forms',
  },
  dass21: {
    /* transcript.psu.ac.th/dass21/ */
    th: 'แบบคัดกรองภาวะซึมเศร้า ความวิตกกังวล และความเครียด (DASS-21)',
    en: 'Depression, Anxiety, and Stress Scale (DASS-21)',
  },

  waisaihouseCard: {
    th: 'บ้านวัยใส',
    en: 'PSU HomeCare',
  },
  waisaiHouseFacebook: {
    th: 'Facebook: บ้านวัยใส สงขลานครินทร์ PSU HomeCare',
    en: 'Facebook: PSU HomeCare',
  },
  waisaiHousePhone: {
    th: 'โทรศัพท์: 074-282604',
    en: 'Phone: 074-282604',
  },

  //การขึ้นสิทธิ์ประกันสุขภาพถ้วนหน้า

  insuranceCard: {
    th: 'การขึ้นสิทธิ์ประกันสุขภาพถ้วนหน้า',
    en: 'Universal Health Coverage Eligibility',
  },
  insuranceSystem: {
    th: 'ระบบขึ้นทะเบียนสิทธิ์ประกันสุขภาพถ้วนหน้า',
    en: 'Universal Health Coverage Registration System',
  },
};

const WellbeingMenu = () => {
  const { language, liff } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      <HeadTab title={langs.titleTab[language]}></HeadTab>
      <GroupCard groupName={langs.formCard[language]}>
        <MenuButton
          onClick={() => {
            liff.openWindow({
              url: 'https://transcript.psu.ac.th/dass21/',
              external: true,
            });
          }}
          icon={<RiMentalHealthFill />}
        >
          {langs.dass21[language]}
        </MenuButton>
      </GroupCard>
      <GroupCard groupName={langs.waisaihouseCard[language]}>
        <MenuButton
          onClick={() => {
            liff.openWindow({
              url: 'https://www.facebook.com/PSUhomeCARE',
              external: true,
            });
          }}
          icon={<FaFacebook />}
        >
          {langs.waisaiHouseFacebook[language]}
        </MenuButton>
        <MenuButton
          onClick={() => {
            liff.openWindow({
              url: 'tel:074282604',
              external: true,
            });
          }}
          icon={<FaPhone />}
        >
          {langs.waisaiHousePhone[language]}
        </MenuButton>
      </GroupCard>

      <GroupCard groupName={langs.insuranceCard[language]}>
        <MenuButton
          onClick={() => {
            liff.openWindow({
              url: 'https://medstudent.medicine.psu.ac.th/hospital4student/index',
              external: true,
            });
          }}
          icon={<FaEarthAsia />}
        >
          {langs.insuranceSystem[language]}
        </MenuButton>
      </GroupCard>
    </>
  );
};
export default WellbeingMenu;
