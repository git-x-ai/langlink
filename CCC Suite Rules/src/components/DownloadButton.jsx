import React from 'react';

const DownloadButton = ({ selectedRules, onDownload, isDownloading }) => {
  const totalFiles = selectedRules.reduce(
    (total, rule) => total + rule.files.length,
    0
  );

  return (
    <div className='bg-gray-800 border-t border-gray-700 p-6 shadow-lg'>
      <div className='max-w-6xl mx-auto'>
        {/* Selected rules display - full width */}
        {selectedRules.length > 0 && (
          <div className='mb-4'>
            <div className='flex flex-wrap gap-3 max-h-32 overflow-y-auto'>
              {selectedRules.map(rule => (
                <span
                  key={rule.name}
                  className='bg-blue-800 text-blue-200 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors duration-200'
                >
                  {rule.name.replace(/-enhanced-cursorrules-prompt-file$/, '')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom row with info and download button */}
        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <h3 className='text-sm font-medium text-gray-200'>
              {selectedRules.length > 0
                ? `${selectedRules.length} Rules Selected`
                : 'No Rules Selected'}
            </h3>
            <p className='text-gray-400 text-xs'>
              {totalFiles} files ready to download
            </p>
          </div>
          <button
            onClick={onDownload}
            disabled={selectedRules.length === 0 || isDownloading}
            className={`px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 text-sm ${
              selectedRules.length === 0 || isDownloading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
            }`}
          >
            {isDownloading ? (
              <div className='flex items-center'>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                Downloading...
              </div>
            ) : (
              `Download to Desktop/.cursor/rules`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadButton;
