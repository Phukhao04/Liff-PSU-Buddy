import MenuButton from '@/components/modules/Button/MenuButton';
import GroupCard from '@/components/modules/card/GroupCard';
import HeadTab from '@/components/modules/Tab/HeadTab';
import Context from '@/contexts/Context';
import { useContext } from 'react';
import { FaBuilding, FaFacebook, FaPhone } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const langs = {
  titleTab: {
    th: 'ทุนการศึกษา',
    en: 'Scholarship',
  },
  scholarshipCard: {
    th: 'ทุนการศึกษา',
    en: 'Scholarship',
  },
  scholarshipFacebook: {
    th: 'Facebook: ทุนการศึกษา กองพัฒนานักศึกษาฯ',
    en: 'Facebook: PSU Scholarship ',
  },
  scholarshipPhone: {
    th: 'โทรศัพท์: 074-282215',
    en: 'Phone: 074-282215',
  },
  tonklaCard: {
    th: 'ทุนกล้า สงขลานครินทร์',
    en: 'Tonkla Scholarship',
  },
  tonklaFacebook: {
    th: 'Facebook: ต้นกล้าสงขลานครินทร์',
    en: 'Facebook: Tonkla Scholarship',
  },
  tonklaPhone: {
    th: 'โทรศัพท์: 074-282211',
    en: 'Phone: 074-282211',
  },

  dslCard: {
    th: 'กยศ.',
    en: 'Student Loan',
  },
  dslFacebook: {
    th: 'Facebook: กยศ.(ม.อ.หาดใหญ่)',
    en: 'Facebook: Student Loan (PSU Hatyai)',
  },
  dslPhone: {
    th: 'โทรศัพท์: 074-282213',
    en: 'Phone: 074-282213',
  },
};

const ScholarshipMenu = () => {
  const { language, liff } = useContext(Context);
  const navigate = useNavigate();

  return (
    <>
      <HeadTab title={langs.titleTab[language]}></HeadTab>
      <GroupCard groupName={langs.scholarshipCard[language]}>
        <MenuButton
          onClick={() => {
            liff.openWindow({
              url: 'https://www.facebook.com/PSU.scholarship',
              external: true,
            });
          }}
          icon={<FaFacebook />}
        >
          {langs.scholarshipFacebook[language]}
        </MenuButton>
        <MenuButton
          onClick={() => {
            liff.openWindow({
              url: 'tel:074282215',
              external: true,
            });
          }}
          icon={<FaPhone />}
        >
          {langs.scholarshipPhone[language]}
        </MenuButton>
      </GroupCard>

      <GroupCard groupName={langs.tonklaCard[language]}>
        <MenuButton
          onClick={() => {
            liff.openWindow({
              url: 'https://www.facebook.com/tonklapsu',
              external: true,
            });
          }}
          icon={<FaFacebook />}
        >
          {langs.tonklaFacebook[language]}
        </MenuButton>
        <MenuButton
          onClick={() => {
            liff.openWindow({
              url: 'tel:074282211',
              external: true,
            });
          }}
          icon={<FaPhone />}
        >
          {langs.tonklaPhone[language]}
        </MenuButton>
      </GroupCard>

      {/* DSL contact */}

      <GroupCard groupName={langs.dslCard[language]}>
        <MenuButton
          onClick={() =>
            liff.openWindow({
              url: 'https://www.facebook.com/psustl.hatyai',
              external: true,
            })
          }
          icon={<FaFacebook />}
        >
          {langs.dslFacebook[language]}
        </MenuButton>
        <MenuButton
          onClick={() =>
            liff.openWindow({
              url: 'tel:074282213',
              external: true,
            })
          }
          icon={<FaPhone />}
        >
          {langs.dslPhone[language]}
        </MenuButton>
      </GroupCard>
    </>
  );
};
export default ScholarshipMenu;
