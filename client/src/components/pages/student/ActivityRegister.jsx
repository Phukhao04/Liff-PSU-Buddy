import ActivityRegisterSection from '@/components/modules/student/ActivityRegisterSection';
import HeadTab from '@/components/modules/Tab/HeadTab';
import Context from '@/contexts/Context';
import { useContext } from 'react';

const langs = {
  activityTitle: {
    th: 'ตรวจสอบกิจกรรมที่สามารถลงทะเบียนได้',
    en: 'Registerable Activities',
  },
};

const ActivityRegister = () => {
  const { language } = useContext(Context);
  return (
    <>
      <HeadTab title={langs.activityTitle[language]}></HeadTab>
      <ActivityRegisterSection />
    </>
  );
};

export default ActivityRegister;
