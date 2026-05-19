import Context from '@/contexts/Context';
import { useContext } from 'react';
import {
  FaCalendarAlt,
  FaFlag,
  FaHourglassEnd,
  FaMapPin,
} from 'react-icons/fa';

const langs = {
  title: {
    th: 'ตรวจสอบชั่วโมงกิจกรรมนักศึกษา',
    en: 'Student Activity Hour Check',
  },
  competencies: {
    th: 'เสริมสร้างสมรรถนะ',
    en: 'Competency ',
  },
  electives: {
    th: 'เลือกเข้าร่วม',
    en: 'Electives',
  },
  recentActivities: {
    th: 'กิจกรรมที่เข้าร่วมล่าสุด',
    en: 'Recent Activities Joined',
  },
  loading: {
    th: 'กำลังโหลด...',
    en: 'Loading...',
  },
  noActivity: {
    th: 'ไม่มีข้อมูลกิจกรรมที่เข้าร่วม',
    en: 'No activity data available',
  },
  date: {
    th: 'วันที่',
    en: 'Date',
  },
  hoursReceived: {
    th: 'ชั่วโมงที่ได้รับ',
    en: 'Hours Received',
  },
  hour: {
    th: 'ชั่วโมง',
    en: 'Hour',
  },
  short_hr: {
    th: 'ชม.',
    en: 'Hr.',
  },
  place: {
    th: 'สถานที่',
    en: 'Place',
  },
};
const ActivityCard = ({ activity }) => {
  const { language } = useContext(Context);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-5 max-w-md w-full my-3 flex flex-col border border-gray-100 min-h-[310px] max-h-[310px]">
      {/* header card title and hour */}
      <div className="flex justify-between items-start mb-4 gap-3">
        <h3 className="text-xl font-bold  leading-tight text-start overflow-y-auto min-h-[100%] max-h-[75px]">
          {activity.title[language]}
        </h3>
        <div className="flex flex-col gap-2 shrink-0">
          {/* Badge: ชั่วโมง */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-md font-bold">
            <FaHourglassEnd className="text-md" />
            <div>
              {activity.hour.total} {langs.short_hr[language]} (
              {activity.hour.title === 'competencies' ? 'C' : 'E'})
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3 pr-2 overflow-y-auto min-h-[200px] max-h-[200px]">
        <ActivityDetail IconTag={FaFlag}>
          {activity.club[language]}
        </ActivityDetail>
        <ActivityDetail IconTag={FaCalendarAlt}>
          {new Date(activity.start).toLocaleDateString('th-TH')}
        </ActivityDetail>
        <ActivityDetail IconTag={FaMapPin}>
          {activity.place[language]}
        </ActivityDetail>
      </div>
    </div>
  );
};

const ActivityDetail = ({ children, IconTag }) => {
  return (
    <div className="flex flex-auto items-top mb-2 gap-2">
      <div className="text-xl p-0 m-0">
        <IconTag className="inline" />
      </div>
      <div className="mt-1  text-start">{children}</div>
    </div>
  );
};
export default ActivityCard;
