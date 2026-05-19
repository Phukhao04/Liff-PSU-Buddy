import { Suspense, lazy, useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Context from '../../contexts/Context';
import Loading from './Loading';
import Footer from './Footer';
import ProtectedRoute from './module/ProtectedRoute';
import HeadBar from './HeadBar';

const Home = lazy(() => import('../pages/Home'));
const Profile = lazy(() => import('../pages/Profile'));
const Menu = lazy(() => import('../pages/Menu'));
const StudentMenu = lazy(() => import('../pages/menulist/StudentMenu'));
const ActivityCheck = lazy(() => import('../pages/student/ActivityCheck'));
const LuckyDraw = lazy(() => import('../pages/misc/LuckyDraw'));
const CheckLocation = lazy(() => import('../pages/misc/CheckLocation'));
const ActivityRegister = lazy(
  () => import('../pages/student/ActivityRegister'),
);
const DormitoryMenu = lazy(() => import('../pages/menulist/DormitoryMenu'));
const ScholarshipMenu = lazy(() => import('../pages/menulist/ScholarshipMenu'));
const WellbeingMenu = lazy(() => import('../pages/menulist/WellbeingMenu'));
const AlumniRelationMenu = lazy(
  () => import('../pages/menulist/AlumniRelationMenu'),
);
const OthersMenu = lazy(() => import('../pages/menulist/OthersMenu'));

const Layout = () => {
  const { isAuthDone, isLiffError, theUser } = useContext(Context);
  const location = useLocation();

  return !isAuthDone || location.pathname === '/auth' ? (
    <Suspense fallback={<Loading />}>
      <Loading />
    </Suspense>
  ) : isLiffError ? (
    <Suspense fallback={<Loading />}>
      <div className='min-h-screen flex flex-col items-center justify-center bg-red-100 p-4'>
        <h1 className='text-2xl font-bold text-red-600 mb-4'>
          LIFF Initialization Error
        </h1>
        <p className='text-red-500 mb-2'>
          There was an error initializing the LIFF SDK.
        </p>
        <p className='text-red-500'>
          Please ensure that you are accessing this application within the LINE
          app.
        </p>
      </div>
    </Suspense>
  ) : (
    <>
      <div className='pb-18 text-psu-deep-blue-500 min-h-screen flex flex-col items-center bg-linear-to-br from-psu-sritrang-200 to-psu-sritrang-500 p-3  overflow-auto'>
        <HeadBar />
        <div className='grow w-full max-w-md'>
          <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
              <Route
                path='/'
                element={
                  <MotionRoute>
                    <Home />
                  </MotionRoute>
                }
              />
              <Route
                path='/menu'
                element={
                  <MotionRoute>
                    <Menu />
                  </MotionRoute>
                }
              />
              <Route
                path='/profile'
                element={
                  <MotionRoute>
                    <Profile />
                  </MotionRoute>
                }
              />
              <Route
                path='/lucky-draw'
                element={
                  <MotionRoute>
                    <LuckyDraw />
                  </MotionRoute>
                }
              />
              <Route
                path='/check-location'
                element={
                  <MotionRoute>
                    <CheckLocation />
                  </MotionRoute>
                }
              />
              <Route
                element={
                  <ProtectedRoute
                    isAllow={theUser?.psuType === 'student'}
                    redirect='/menu'
                  />
                }
              >
                <Route
                  path='/student'
                  element={
                    <MotionRoute>
                      <StudentMenu />
                    </MotionRoute>
                  }
                />
                <Route
                  path='/student/activity-check'
                  element={
                    <MotionRoute>
                      <ActivityCheck />
                    </MotionRoute>
                  }
                />
                <Route
                  path='/student/activity-register'
                  element={
                    <MotionRoute>
                      <ActivityRegister />
                    </MotionRoute>
                  }
                />
                <Route
                  path='/dormitory/'
                  element={
                    <MotionRoute>
                      <DormitoryMenu />
                    </MotionRoute>
                  }
                />
                <Route
                  path='/scholarship/'
                  element={
                    <MotionRoute>
                      <ScholarshipMenu />
                    </MotionRoute>
                  }
                />
                <Route
                  path='/well-being/'
                  element={
                    <MotionRoute>
                      <WellbeingMenu />
                    </MotionRoute>
                  }
                />
                <Route
                  path='/alumni-relation/'
                  element={
                    <MotionRoute>
                      <AlumniRelationMenu />
                    </MotionRoute>
                  }
                />
                <Route
                  path='/others/'
                  element={
                    <MotionRoute>
                      <OthersMenu />
                    </MotionRoute>
                  }
                />
              </Route>
            </Routes>
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
};

const MotionRoute = ({ children }) => {
  return (
    // Circle Wheel animation from right to left
    <motion.div
      initial={{ opacity: 0, rotateY: 90, x: 100 }}
      animate={{ opacity: 1, rotateY: 0, x: 0 }}
      exit={{ opacity: 0, rotateY: -90, x: -100 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className='w-full'
    >
      {children}
    </motion.div>
  );
};

export default Layout;
