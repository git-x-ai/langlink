import React from 'react';
import WindowControls from './WindowControls';

const Header = ({ title, subtitle }) => {
  return (
    <header
      className='bg-gradient-to-r from-gray-800/80 via-gray-900/90 to-gray-800/80 text-white py-8 px-6 border-b border-gray-700/50 shadow-lg backdrop-blur-sm'
      style={{ WebkitAppRegion: 'drag' }}
    >
      <div className='max-w-6xl mx-auto'>
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <h1 className='text-2xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
              {title}
            </h1>
            {subtitle && <p className='text-gray-300 text-sm'>{subtitle}</p>}
          </div>
          <div
            className='flex items-center space-x-4'
            style={{ WebkitAppRegion: 'no-drag' }}
          >
            <div className='text-right'>
              <p className='text-gray-300 text-xs font-medium'>Version 1.0</p>
              <p className='text-gray-400 text-xs'>© 2025 CCC Suite</p>
            </div>
            <WindowControls />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
