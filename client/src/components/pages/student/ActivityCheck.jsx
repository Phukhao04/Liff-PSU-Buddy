import DonutChart from '@/components/modules/Chart/DonutChart';
import ActivityCard from '@/components/modules/student/ActivityCard';
import HeadTab from '@/components/modules/Tab/HeadTab';
import Axios from '@/config/Axios';
import Context from '@/contexts/Context';
import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

const selectionHour = [
  {
    title: 'all',
    th: 'ทั้งหมด',
    en: 'All',
  },
  {
    title: 'competencies',
    th: 'สมรรถนะ',
    en: 'Competency ',
  },
  {
    title: 'electives',
    th: 'เลือกเข้าร่วม',
    en: 'Electives',
  },
];

const ActivityCheck = () => {
  const { language } = useContext(Context);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hrsTarget, setHrsTarget] = useState({
    competencies: 50,
    electives: 50,
  });
  const [hrsCompleted, setHrsCompleted] = useState({
    competencies: 0,
    electives: 0,
  });
  const [filterHour, setFilterHour] = useState(selectionHour[0].title);
  const [searchText, setSearchText] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchActivity();
  }, []);
  const fetchActivity = async () => {
    // fetch activity data from api
    const { data } = await Axios.get('/liff/student/activity-check');
    // console.log(data);
    // set target hours
    setHrsTarget(data.hrsTarget);
    let completed = {
      competencies: 0,
      electives: 0,
    };
    data.events.forEach((event) => {
      if (event.hour.title === 'competencies') {
        completed.competencies += event.hour.total;
      } else if (event.hour.title === 'electives') {
        completed.electives += event.hour.total;
      }
    });
    setHrsCompleted(completed);
    // console.log(completed);
    const sortedActivity = data.events
      .map((event) => ({
        title: event.title,
        start: event.start,
        hour: event.hour,
        place: event.place,
        club: event.club.name,
      }))
      .sort((a, b) => new Date(b.start) - new Date(a.start));
    setActivity(sortedActivity);
    setLoading(false);
  };

  const handleFilterChange = (e) => {
    setFilterHour(e.target.value);
  };

  const filteredActivity = useMemo(() => {
    return activity.filter(
      (act) =>
        (act.hour.title === filterHour || filterHour === 'all') &&
        (act.title.th.toLowerCase().includes(searchText.toLowerCase()) ||
          act.title.en.toLowerCase().includes(searchText.toLowerCase()) ||
          act.place.th.toLowerCase().includes(searchText.toLowerCase()) ||
          act.place.en.toLowerCase().includes(searchText.toLowerCase()) ||
          act.club.th
            .toLowerCase()
            .includes(
              searchText.toLowerCase() ||
                act.club.en.toLowerCase().includes(searchText.toLowerCase()),
            )),
    );
  }, [activity, filterHour, searchText]);

  return (
    <>
      <HeadTab title={langs.title[language]}></HeadTab>

      {loading ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className='bg-white rounded-3xl shadow-xl  p-4 max-w-md w-full mt-3'
        >
          <p className='text-gray-600'>{langs.loading[language]}</p>
        </motion.div>
      ) : activity.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className='bg-white rounded-3xl shadow-xl  p-4 max-w-md w-full mt-3'
        >
          <p className='text-gray-600'>{langs.noActivity[language]}</p>
        </motion.div>
      ) : (
        <>
          <div className='flex flex-row gap-2 mt-3 max-w-md w-full'>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className='basis-1/2 bg-white rounded-3xl shadow-xl  p-3 max-w-md w-full'
            >
              <p className='  mb-3'>{langs.competencies[language]}</p>
              {/* donut circle with number green border */}
              <DonutChart
                value={hrsCompleted.competencies}
                max={hrsTarget.competencies}
                // blue color
                color={'#0066FF'}
                //
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className='basis-1/2 bg-white rounded-3xl shadow-xl  p-3 max-w-md w-full'
            >
              <p className='  mb-3'>{langs.electives[language]}</p>
              <DonutChart
                value={hrsCompleted.electives}
                max={hrsTarget.electives}
                color={'#0066FF'}
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className='bg-white rounded-3xl shadow-xl  p-4 max-w-md w-full mt-3'
          >
            {/* <h1 className="text-3xl font-bold mb-4">Activity Check Page</h1>*/}
            <p className='text-lg text-gray-600'>
              {langs.recentActivities[language]}
            </p>
          </motion.div>
          {/* select filter hour */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className='bg-white rounded-3xl shadow-xl  p-1 max-w-md w-full mt-3'
          >
            <div className='grid grid-cols-3 justify-between gap-1'>
              {selectionHour.map((option, index) => (
                <Fragment key={index}>
                  <input
                    type='radio'
                    name='hourFilter'
                    className='hidden'
                    key={index}
                    onClick={handleFilterChange}
                    value={option.title}
                    id={'input-' + option.title}
                    defaultChecked={index === 0}
                  />
                  <label
                    htmlFor={'input-' + option.title}
                    className={`block text-center  rounded-2xl py-2 hover:cursor-pointer hover:bg-blue-50 transition ${
                      filterHour === option.title ? 'bg-blue-200 ' : 'bg-white '
                    }`}
                  >
                    {option[language]}
                  </label>
                </Fragment>
              ))}
            </div>
          </motion.div>

          {/* search text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className='bg-white rounded-3xl shadow-xl  p-2 max-w-md w-full mt-3'
          >
            <FaSearch className='absolute ml-3 mt-3 text-gray-400' />
            <input
              type='text'
              className='w-full border border-gray-300 rounded-2xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder={
                language === 'th' ? 'ค้นหากิจกรรม...' : 'Search activities...'
              }
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </motion.div>
          {filteredActivity.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className='bg-white rounded-3xl shadow-xl  p-4 max-w-md w-full mt-3'
            >
              <p className=''>
                {language === 'th'
                  ? 'ไม่มีกิจกรรมที่ตรงกับการค้นหา'
                  : 'No activities match the search'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className='overflow-x-auto flex space-x-2 pb-2 snap-x snap-mandatory m-3'
            >
              {filteredActivity.map((act, index) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={index}
                  className='min-w-[90%] max-w-[90%] snap-center'
                >
                  <ActivityCard activity={act} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* {filteredActivity.slice(0, 3).map((act, index) => (
            <ActivityCard key={index} activity={act} />
          ))}
          {filteredActivity.length > 3 && !showAll && (
            <div
              onClick={() => setShowAll(true)}
              className="bg-white rounded-3xl shadow-xl  p-4 max-w-md w-full mt-3 hover:cursor-pointer hover:bg-blue-50 transition text-center">
              <p className="text-blue-600">
                {language === 'th' ? 'ดูทั้งหมด' : 'Show All'}
              </p>
            </div>
          )}
          {showAll &&
            filteredActivity
              .slice(3)
              .map((act, index) => (
                <ActivityCard key={index + '_extend'} activity={act} />
              ))} */}
        </>
      )}
    </>
  );
};

export default ActivityCheck;
