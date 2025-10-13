import React from 'react';

const LoadingSpinner = ({ message = 'Loading rules...' }) => {
  return (
    <div className='flex flex-col items-center justify-center py-12'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4'></div>
      <p className='text-gray-300 text-lg'>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
