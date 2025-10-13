import React from 'react';
import RuleCard from './RuleCard';

const RuleCategory = ({
  title,
  rules,
  selectedRules,
  onToggleRule,
  downloadedRules,
}) => {
  if (rules.length === 0) return null;

  return (
    <div className='mb-8'>
      <h2 className='text-xl font-bold text-gray-100 mb-4 border-b border-gray-600 pb-2 relative'>
        <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
          {title}
        </span>
        <span className='ml-2 text-sm font-normal text-gray-400 bg-gray-700 px-2 py-1 rounded-full'>
          {rules.length} rule{rules.length !== 1 ? 's' : ''}
        </span>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {rules.map(rule => (
          <RuleCard
            key={rule.name}
            rule={rule}
            isSelected={selectedRules.some(
              selected => selected.name === rule.name
            )}
            onToggle={onToggleRule}
            isDownloaded={downloadedRules.includes(rule.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default RuleCategory;
