import Axios from '@/config/Axios';
import Context from '@/contexts/Context';
import { useContext, useEffect, useState } from 'react';

const lang = {
  scanQRCode: {
    th: 'สแกนคิวอาร์โค้ด',
    en: 'Scan QR Code',
  },
  header: {
    th: 'ลุ้นโชค',
    en: 'Lucky Draw',
  },
  description: {
    th: 'สแกนคิวอาร์โค้ดหรือกรอกรหัส PIN เพื่อเข้าร่วมกิจกรรมลุ้นโชค',
    en: 'Scan QR code or enter PIN to participate in lucky draw',
  },
  scanButton: {
    th: 'สแกนคิวอาร์โค้ดเพื่อเข้าร่วม',
    en: 'Scan QR Code to Participate',
  },
  pinLabel: {
    th: 'หรือกรอกรหัส PIN',
    en: 'Or Enter PIN Code',
  },
  pinPlaceholder: {
    th: 'กรอกรหัส PIN',
    en: 'Enter PIN code',
  },
  pinSubmit: {
    th: 'ส่งรหัส',
    en: 'Submit',
  },
  entriesHeader: {
    th: 'รายการลุ้นโชคของคุณ',
    en: 'Your Lucky Draw Entries',
  },
  noEntries: {
    th: 'ไม่พบรายการ',
    en: 'No entries found.',
  },
  entry: {
    th: 'รายการที่',
    en: 'Entry #',
  },
  winner: {
    th: '🎉 ผู้ชนะ',
    en: '🎉 WINNER',
  },
  project: {
    th: 'กิจกรรม',
    en: 'Project',
  },
  name: {
    th: 'ชื่อ',
    en: 'Name',
  },
  psuID: {
    th: 'รหัส PSU',
    en: 'PSU ID',
  },
  prize: {
    th: '🏆 รางวัล',
    en: '🏆 Prize',
  },
  redeemStatus: {
    th: 'สถานะการรับรางวัล',
    en: 'Redeem Status',
  },
  redeemed: {
    th: 'รับแล้ว',
    en: 'redeemed',
  },
  notRedeemed: {
    th: 'ยังไม่ได้รับ',
    en: 'not redeemed',
  },
  verifyCode: {
    th: 'รหัสยืนยัน',
    en: 'Verification Code',
  },
  qrScanned: {
    th: 'สแกนคิวอาร์โค้ดแล้ว:',
    en: 'QR Code scanned:',
  },
  errorScan: {
    th: 'เกิดข้อผิดพลาดในการสแกนคิวอาร์โค้ด:',
    en: 'Error scanning QR Code:',
  },
  errorFetch: {
    th: 'เกิดข้อผิดพลาดในการดึงข้อมูลลุ้นโชค:',
    en: 'Error fetching lucky draw data:',
  },
};

const LuckyDraw = () => {
  const { liff, language } = useContext(Context);
  const [message, setMessage] = useState('');
  const [pin, setPin] = useState('');
  const [luckyDrawData, setLuckyDrawData] = useState([]);

  const handleScan = (data) => {
    if (data) {
      setMessage(`${lang.qrScanned[language]} ${data.value}`);
    }
  };

  const initScan = () => {
    liff
      .scanCodeV2()
      .then(handleScan)
      .catch((error) => {
        setMessage(`${lang.errorScan[language]} ${error.message}`);
      });
  };

  const getLuckyDrawData = async () => {
    try {
      const response = await Axios.get('/liff/lucky-draw/');
      setLuckyDrawData(response.data);
    } catch (error) {
      setMessage(`${lang.errorFetch[language]} ${error.message}`);
    }
  };

  useEffect(() => {
    getLuckyDrawData();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      {/* Header Card */}
      <div className="bg-white rounded-3xl shadow-xl p-6 max-w-md w-full mb-6">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          {lang.header[language]}
        </h1>
        <p className="text-md text-gray-600 text-center">
          {lang.description[language]}
        </p>
        {message && (
          <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-sm text-gray-800">{message}</p>
          </div>
        )}
      </div>

      {/* Scan QR Code & PIN Input */}
      <div className="max-w-md w-full space-y-4 mb-6">
        <div
          onClick={initScan}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl shadow-lg p-6 flex items-center justify-center hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group">
          <svg
            className="w-6 h-6 text-white mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
          <span className="text-white font-semibold text-lg">
            {lang.scanButton[language]}
          </span>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {lang.pinLabel[language]}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder={lang.pinPlaceholder[language]}
              className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium">
              {lang.pinSubmit[language]}
            </button>
          </div>
        </div>
      </div>

      {/* Lucky Draw Entries */}
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {lang.entriesHeader[language]}
          </h2>

          {luckyDrawData.length === 0 ? (
            <div className="text-center py-8">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="text-md text-gray-500">
                {lang.noEntries[language]}
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {luckyDrawData.map((entry, index) => (
                <li
                  key={index}
                  className={`p-4 rounded-2xl border-2 transition-all hover:shadow-md ${
                    entry.is_winner
                      ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}>
                  <div className="flex justify-between items-start mb-3">
                    <p className="font-bold text-lg text-gray-800 text-left">
                      {lang.entry[language]}
                      {language === 'th' ? ' ' : ''}
                      {index + 1}
                    </p>
                    {entry.is_winner && (
                      <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                        {lang.winner[language]}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-start">
                    <p className="text-gray-700">
                      <span className="font-medium">
                        {lang.project[language]}:
                      </span>{' '}
                      {entry.project_info.name}
                    </p>

                    <p className="text-gray-700">
                      <span className="font-medium">
                        {lang.name[language]}:
                      </span>{' '}
                      {entry.ticket_detail.name}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">
                        {lang.psuID[language]}:
                      </span>{' '}
                      {entry.ticket_detail.psuID}
                    </p>
                    {entry.is_winner && entry.prize_info && (
                      <p className="text-yellow-700 font-semibold mt-2">
                        {lang.prize[language]} {entry.prize_info.prize_name}
                      </p>
                    )}
                    <p className="text-gray-600 mt-2">
                      <span className="font-medium">
                        {lang.redeemStatus[language]}:
                      </span>{' '}
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          entry.redeem_status === 'redeemed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-200 text-gray-800'
                        }`}>
                        {entry.redeem_status === 'redeemed'
                          ? lang.redeemed[language]
                          : lang.notRedeemed[language]}
                      </span>
                    </p>
                    {entry.verify_code && (
                      <p className="text-gray-600 mt-2 align-middle">
                        <span className="font-medium align-middle">
                          {lang.verifyCode[language]}:
                        </span>{' '}
                        <span className="font-medium align-middle  text-xl">
                          {entry.verify_code}
                        </span>
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default LuckyDraw;
