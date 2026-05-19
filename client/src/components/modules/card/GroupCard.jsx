const GroupCard = ({ groupName, children }) => {
  return (
    <div className='bg-white rounded-3xl shadow-xl p-6 mt-6 space-y-3 max-w-md w-full mx-auto'>
      <div className='text-lg font-semibold text-psu-deep-blue-500 mb-2'>
        {groupName}
      </div>
      {children}
    </div>
  );
};
export default GroupCard;
