import { useState, useEffect } from 'react';

import Axios from '../config/Axios';
import { frontUrl } from '../config/config';
import { isSameUrlPath, joinPaths } from '../components/modules/utils';
import Context from './Context';

import liff from '@line/liff';

const { VITE_basename, VITE_service_id, VITE_loginUrl, VITE_logoutUrl } =
  import.meta.env;

const redirect_uri = joinPaths(frontUrl, 'auth');
const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [theUser, setTheUser] = useState(null);
  const [lineUser, setLineUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthDone, setAuthDone] = useState(false);
  const [isLiffError, setLiffError] = useState(false);

  const [language, setLanguage] = useState('th');

  useEffect(() => {
    getLanguage();
  }, []);

  useEffect(() => {
    auth();
  }, [token]);

  useEffect(() => {
    liff_function();
    liff.ready.then(async () => {
      // console.log('liff_ready');
      try {
        // console.log(liff.isLoggedIn());

        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          const getIdToken = liff.getIDToken();

          // throw new Error('Test liff error handling');
          const myres = await Axios.post(
            'liff/verify',
            {
              idToken: getIdToken,
            },
            {
              validateStatus: false,
            },
          );
          if (myres.status === 200) {
            setToken(() => {
              return myres.data;
            });
          } else if (myres.status === 401) {
            liff.logout();
            liff.login({
              redirectUri: window.location.href,
            });
            return;
          } else {
            // console.log(myres);
            setAuthDone(true);
          }

          setLineUser(profile);

          // setAuthDone(true);
        } else {
          let currentpath = window.location.href.replace(frontUrl, '');
          console.log(currentpath);
          liff.login({
            redirectUri: window.location.href,
          });
        }
      } catch (error) {
        console.error('Error during LIFF authentication:', error);
        setLiffError(true);
        setAuthDone(true);
      }
    });
  }, []);

  const liff_function = async () => {
    await liff
      .init({
        liffId:
          import.meta.env.MODE === 'production'
            ? import.meta.env.VITE_LIFF_PROD_ID
            : import.meta.env.VITE_LIFF_DEV_ID,
      })
      .catch((err) => {
        console.error('LIFF Initialization failed', err);
        setLiffError(true);
        setAuthDone(true);
      });
  };

  const auth = async () => {
    if (!token) {
      return;
    }
    Axios.defaults.headers.Authorization = `Bearer ${token}`;
    const { data: user } = await Axios.post('/liff/auth', {
      validateStatus: false,
    });
    if (!user) {
      liff.logout();
      return;
    }
    setIsAuth(true);
    setAuthDone(true);
    setTheUser(user);
  };

  const getLanguage = () => {
    const lang = localStorage.getItem(`${VITE_basename}-language`);
    if (!lang) localStorage.setItem(`${VITE_basename}-language`, language);
    setLanguage(lang || language);
  };

  const switchLanguage = () => {
    const newLanguage = language === 'en' ? 'th' : 'en';
    localStorage.setItem(`${VITE_basename}-language`, newLanguage);
    setLanguage(newLanguage);
    // addToast(langs.changedLanguage[newLanguage], 'info');
  };

  const contextValue = {
    token,
    setToken,
    theUser,
    setTheUser,
    isAuth,
    setIsAuth,
    isAuthDone,
    setAuthDone,
    language,
    setLanguage,
    liff,
    lineUser,
    switchLanguage,
    isLiffError,
  };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
export default ContextProvider;
