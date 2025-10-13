import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = 'Search rules...' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = value => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className='relative max-w-md mx-auto mb-8'>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
          <svg
            className='h-5 w-5 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
        <input
          type='text'
          value={searchTerm}
          onChange={e => handleSearch(e.target.value)}
          className='block w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-lg'
          placeholder={placeholder}
        />
        {searchTerm && (
          <button
            onClick={() => handleSearch('')}
            className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-200 transition-colors duration-200'
          >
            <svg
              className='h-5 w-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
