import React from 'react';

const WindowControls = () => {
  const handleMinimize = async () => {
    try {
      await window.electronAPI.minimizeWindow();
    } catch (error) {
      console.error('Error minimizing window:', error);
    }
  };

  const handleClose = async () => {
    try {
      await window.electronAPI.closeWindow();
    } catch (error) {
      console.error('Error closing window:', error);
    }
  };

  return (
    <div className='window-controls flex items-center space-x-2 px-2 py-1'>
      <button
        onClick={handleMinimize}
        className='w-6 h-6 flex items-center justify-center'
        title='Minimize'
      >
        <span className='text-gray-300 text-lg font-bold hover:text-yellow-400 transition-colors duration-200'>
          −
        </span>
      </button>

      <button
        onClick={handleClose}
        className='w-6 h-6 flex items-center justify-center'
        title='Close'
      >
        <span className='text-gray-300 text-lg font-bold hover:text-red-400 transition-colors duration-200'>
          ×
        </span>
      </button>
    </div>
  );
};

export default WindowControls;
