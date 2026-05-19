import Context from '@/contexts/Context';
import { useContext } from 'react';
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaFlag,
  FaHourglassEnd,
  FaMapPin,
} from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';

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
  register: {
    th: 'ลงทะเบียนกิจกรรม',
    en: 'Register Activity',
  },
  detail: {
    th: 'ดูรายละเอียด',
    en: 'View Details',
  },
};
const ActRegCard = ({ activity, onRegister }) => {
  const { language, liff } = useContext(Context);

  const startDate = new Date(activity.start);
  const endDate = new Date(activity.end);
  const isSameDay =
    startDate.toLocaleDateString('th-TH') ===
    endDate.toLocaleDateString('th-TH');

  const formatDate = (date) => date.toLocaleDateString('th-TH');
  const formatTime = (date) =>
    date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

  let timeRemaining = null;
  let openRegistration = null;
  let closeRegistration = null;
  if (activity.canRegister) {
    openRegistration = new Date(activity.registration.open);
    closeRegistration = activity.registration.close
      ? new Date(activity.registration.close)
      : null;

    timeRemaining = closeRegistration
      ? Math.max(0, closeRegistration - new Date())
      : null;
  }
  const gotoUrl = (url) => () => {
    if (liff.isInClient()) {
      liff.openWindow({ url, external: true });
    } else {
      window.open(url, '_blank');
    }
  };

  const formatTimeRemaining = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <div className='bg-white rounded-3xl shadow-xl p-5 max-w-md w-full mt-3 flex flex-col border border-gray-100 min-h-100'>
      {/* ส่วนหัว: ชื่อกิจกรรม และ Badges */}
      <div className='flex justify-between items-start mb-4 gap-3  '>
        <h3 className='text-xl font-bold leading-tight text-start overflow-y-auto min-h-full max-h-[125px]'>
          {activity.title[language]}
        </h3>

        <div className='flex flex-col gap-2 shrink-0'>
          {/* Badge: ชั่วโมง */}
          <div className='flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-bold'>
            <FaHourglassEnd className='text-xs' />
            <span>
              {activity.hour.total} {langs.short_hr[language]} (
              {activity.hour.title === 'competencies' ? 'C' : 'E'})
            </span>
          </div>

          {/* Badge: จำนวนคน */}
          {activity.registration?.isOpen && (
            <>
              <div className='flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-bold'>
                <FaUser className='text-xs' />
                <span>
                  {activity.registrantsNoCanceled} /{' '}
                  {activity.registration.isLimit
                    ? activity.registration.valid
                    : activity.registrantsNo}{' '}
                  {activity.registration.waiting && (
                    <> (+{activity.registration.waiting})</>
                  )}
                </span>
              </div>
              {/* Badge: เวลาที่เหลือในการลงทะเบียน */}
              {timeRemaining !== null && timeRemaining > 0 ? (
                <div className='flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-bold'>
                  <FaHourglassEnd className='text-xs' />
                  <span>
                    {language === 'th'
                      ? `${formatTimeRemaining(timeRemaining)}`
                      : `${formatTimeRemaining(timeRemaining)}`}
                  </span>
                </div>
              ) : (
                <>
                  <div className='flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm font-bold'>
                    <FaHourglassEnd className='text-xs' />
                    <span>{language === 'th' ? `ปิด` : `Closed`}</span>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* ส่วนรายละเอียด: Scrollable Area */}
      <div className='space-y-3 pr-2 custom-scrollbar h-[100%]'>
        <ActivityDetail IconTag={FaFlag}>
          {activity.club.name[language]}
        </ActivityDetail>

        <ActivityDetail IconTag={FaCalendarAlt}>
          {formatDate(startDate)} {!isSameDay && `- ${formatDate(endDate)}`}
        </ActivityDetail>

        {activity.canRegister && (
          <ActivityDetail IconTag={FaCalendarCheck}>
            <span className='text-sm'>
              {`${formatDate(
                new Date(activity.registration.open),
              )} ${formatTime(new Date(activity.registration.open))}`}
              {activity.registration.close &&
                ` - ${formatDate(
                  new Date(activity.registration.close),
                )} ${formatTime(new Date(activity.registration.close))}`}
            </span>
          </ActivityDetail>
        )}

        <ActivityDetail IconTag={FaMapPin}>
          {activity.place[language]}
        </ActivityDetail>
      </div>

      {/* ส่วนปุ่มกด */}
      <div className='mt-auto'>
        {activity.canRegister &&
        timeRemaining !== null &&
        timeRemaining >= 0 &&
        false ? (
          <button
            onClick={onRegister}
            className='w-full border-2 border-psu-andaman-blue-500  hover:bg-psu-andaman-blue-500 text-psu-andaman-blue-500 hover:text-psu-sritrang-100 font-bold py-3 px-6 rounded-2xl active:scale-[0.98] transition-all shadow-lg shadow-blue-200'
          >
            {langs.register[language]}
          </button>
        ) : (
          <button
            onClick={gotoUrl(
              `https://transcript.psu.ac.th/main/event/${activity._id}`,
            )}
            className='w-full border-2 border-psu-andaman-blue-500  hover:bg-psu-andaman-blue-500 text-psu-andaman-blue-500 hover:text-psu-sritrang-100  font-bold py-3 px-6 rounded-2xl active:scale-[0.98] transition-all shadow-lg shadow-blue-200'
          >
            {langs.detail[language]}
          </button>
        )}
      </div>
    </div>
  );
};

const ActivityDetail = ({ children, IconTag }) => {
  return (
    <div className='flex flex-auto items-top mb-2 gap-2'>
      <div className='text-xl p-0 m-0'>
        <IconTag className='inline' />
      </div>
      <div className='mt-1  text-start'>{children}</div>
    </div>
  );
};
export default ActRegCard;
