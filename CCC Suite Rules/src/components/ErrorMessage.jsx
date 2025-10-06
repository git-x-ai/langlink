import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className='flex flex-col items-center justify-center py-12'>
      <div className='bg-red-900/20 border border-red-500 text-red-300 px-6 py-4 rounded-lg mb-4'>
        <div className='flex items-center'>
          <svg
            className='w-6 h-6 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
          <span className='font-semibold'>Error</span>
        </div>
        <p className='mt-2'>{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
