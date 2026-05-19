import Context from '@/contexts/Context';
import { useContext, useEffect, useState } from 'react';

import ActRegCard from './ActRegCard';
import { motion } from 'framer-motion';

const langs = {
  activityRegister: {
    th: 'ลงทะเบียนกิจกรรม',
    en: 'Activity Registration',
  },
  activityRegisterDesc: {
    th: 'ลงทะเบียนเข้าร่วมกิจกรรมที่ต้องการและติดตามชั่วโมงกิจกรรมของคุณ',
    en: 'Register for your desired activities and track your participation.',
  },
  noActivityToRegister: {
    th: 'ไม่มีข้อมูลกิจกรรมให้ลงทะเบียน',
    en: 'No activities to register.',
  },
};
const API_BASE = 'https://transcript.psu.ac.th/transcript_api/events';

const populateFields = ['organization', 'club', 'address'];

const ActivityRegisterSection = () => {
  const { language, theUser } = useContext(Context);
  const [activityList, setActivityList] = useState([]);
  const buildActivityUrl = (campusid) => {
    const activityFilter = {
      campus: campusid,
      isPublish: true,
      end: { $gte: new Date().setHours(0, 0, 0, 0) },
      // 'registration.isOpen': true,
      // start: { $gte: '2026-01-13T00:00:00.000Z' },
      // add 2 months limit
      // 'registration.close': {
      //   $gte: new Date().toISOString(),
      // },
      // category: { $in: [1, null] },
    };
    const find = encodeURIComponent(JSON.stringify(activityFilter));
    const populate = populateFields.map((f) => `populate[]=${f}`).join('&');
    return `${API_BASE}?find=${find}&${populate}`;
  };

  useEffect(() => {
    fetchActivityList();
  }, []);

  const canRegister = (activity) => {
    if (activity.registration === undefined || !activity.registration.isOpen) {
      // registration is closed
      return false;
    }

    // time now
    const now = new Date();
    const regOpen = new Date(activity.registration.open);
    const regClose = new Date(activity.registration.close);
    if (now < regOpen || now > regClose) {
      // not in registration period
      return false;
    }
    // check campus

    console.log(activity.registration);

    const userCampus = theUser.campusId;
    const allowedCampuses = Object.keys(activity.registration.campuses);
    if (!allowedCampuses.includes(userCampus)) {
      // user campus is not allowed
      return false;
    }
    const campusFacs = activity.registration.campuses[userCampus];
    if (campusFacs.length > 0 && !campusFacs.includes(theUser.facId)) {
      // user faculty is not allowed
      return false;
    }
    // check year
    if (!activity.registration.years.includes(+theUser.yearStatus)) {
      // user year is not allowed
      return false;
    }
    // all conditions is not met => can register
    if (activity.registration.isLimit) {
      if (activity.registrantsNoCanceled >= activity.registration.valid) {
        // registration is full
        return false;
      }
    }

    return true;
  };
  const fetchActivityList = async () => {
    try {
      const response = await fetch(buildActivityUrl(theUser.campusId));
      const data = await response.json();
      const filterCanRegister = data.map((activity) => {
        // return true;
        // check if registration is not open
        // if (theUser.stillStudent === 'N') {
        //   return false;
        // }
        return {
          ...activity,
          canRegister: canRegister(activity),
        };
      });
      setActivityList(filterCanRegister);
      // console.log('Fetched activity list:', theUser);
    } catch (error) {
      console.error('Error fetching activity list:', error);
    }
  };
  return (
    <>
      {activityList.length === 0 ? (
        <div className='p-4 rounded-3xl shadow-xl bg-white '>
          {langs.noActivityToRegister[language]}
        </div>
      ) : (
        <div className='overflow-x-auto flex space-x-2 pb-2 snap-x snap-mandatory'>
          {activityList.map((activity, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5+ index * 0.1 }}
              key={activity._id}
              className='min-w-[90%] max-w-[90%]  snap-center'
            >
              <ActRegCard activity={activity} />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default ActivityRegisterSection;
