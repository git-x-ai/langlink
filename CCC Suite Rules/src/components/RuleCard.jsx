import React from 'react';

const RuleCard = ({ rule, isSelected, onToggle, isDownloaded }) => {
  const formatRuleName = name => {
    // Remove common suffixes and prefixes
    let cleanName = name
      .replace(/-enhanced-cursorrules-prompt-file$/gi, '')
      .replace(/-cursorrules-prompt-file$/gi, '')
      .replace(/-enhanced$/gi, '')
      .replace(/^enhanced-/gi, '');

    // Convert to readable format
    return cleanName
      .split('-')
      .map(word => {
        // Handle special cases
        if (word.toLowerCase() === 'js') return 'JS';
        if (word.toLowerCase() === 'ts') return 'TS';
        if (word.toLowerCase() === 'css') return 'CSS';
        if (word.toLowerCase() === 'api') return 'API';
        if (word.toLowerCase() === 'ui') return 'UI';
        if (word.toLowerCase() === 'ux') return 'UX';
        if (word.toLowerCase() === 'sdk') return 'SDK';
        if (word.toLowerCase() === 'orm') return 'ORM';
        if (word.toLowerCase() === 'sql') return 'SQL';
        if (word.toLowerCase() === 'nosql') return 'NoSQL';
        if (word.toLowerCase() === 'rest') return 'REST';
        if (word.toLowerCase() === 'graphql') return 'GraphQL';
        if (word.toLowerCase() === 'jwt') return 'JWT';
        if (word.toLowerCase() === 'oauth') return 'OAuth';
        if (word.toLowerCase() === 'aws') return 'AWS';
        if (word.toLowerCase() === 'gcp') return 'GCP';
        if (word.toLowerCase() === 'azure') return 'Azure';
        if (word.toLowerCase() === 'docker') return 'Docker';
        if (word.toLowerCase() === 'kubernetes') return 'Kubernetes';
        if (word.toLowerCase() === 'microservices') return 'Microservices';
        if (word.toLowerCase() === 'serverless') return 'Serverless';
        if (word.toLowerCase() === 'pwa') return 'PWA';
        if (word.toLowerCase() === 'spa') return 'SPA';
        if (word.toLowerCase() === 'ssr') return 'SSR';
        if (word.toLowerCase() === 'csr') return 'CSR';
        if (word.toLowerCase() === 'ssg') return 'SSG';
        if (word.toLowerCase() === 'isr') return 'ISR';

        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ')
      .trim();
  };

  const getRuleDescription = name => {
    const descriptions = {
      react: 'React component patterns and best practices',
      nextjs: 'Next.js App Router and performance optimization',
      vue: 'Vue.js Composition API and modern patterns',
      typescript: 'TypeScript type safety and advanced patterns',
      python: 'Python best practices and modern development',
      'node-express': 'Node.js and Express.js backend development',
      tailwind: 'Tailwind CSS styling and component patterns',
      database: 'Database design and ORM best practices',
      'clean-code': 'Clean code principles and maintainability',
      'code-quality': 'Code quality standards and practices',
      gitflow: 'Git workflow and version control best practices',
      cpp: 'C++ programming guidelines and best practices',
      fastapi: 'FastAPI development and API design',
      rust: 'Rust and Solana smart contract development',
      svelte: 'Svelte component patterns and best practices',
      nativescript: 'NativeScript mobile app development',
      medusa: 'Medusa e-commerce platform development',
    };

    const key = name.toLowerCase().replace(/-enhanced.*$/, '');
    return descriptions[key] || 'Development best practices and patterns';
  };

  const formattedName = formatRuleName(rule.name);
  const description = getRuleDescription(rule.name);

  return (
    <div
      className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg card-hover relative professional-card ${
        isDownloaded
          ? 'border-gray-500 bg-gray-700/50 cursor-not-allowed opacity-60'
          : isSelected
            ? 'border-blue-500 bg-blue-900/20 shadow-md cursor-pointer ring-2 ring-blue-500/20'
            : 'border-gray-600/50 bg-gray-800/30 hover:border-gray-500 cursor-pointer hover:bg-gray-750/50'
      }`}
      onClick={() => !isDownloaded && onToggle(rule)}
    >
      <div className='flex items-start justify-between'>
        <div className='flex-1 min-w-0'>
          <div className='flex items-start mb-3'>
            <input
              type='checkbox'
              checked={isSelected}
              onChange={() => !isDownloaded && onToggle(rule)}
              disabled={isDownloaded}
              className={`mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded bg-gray-700 mt-1 flex-shrink-0 ${
                isDownloaded ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
            <div className='flex-1 min-w-0'>
              <h3
                className={`text-lg font-semibold leading-tight break-words ${
                  isDownloaded ? 'text-gray-400' : 'text-gray-100'
                }`}
              >
                {formattedName}
              </h3>
            </div>
          </div>
          <p
            className={`text-sm mb-3 leading-relaxed ${
              isDownloaded ? 'text-gray-500' : 'text-gray-300'
            }`}
          >
            {description}
          </p>
        </div>
      </div>

      {/* File count positioned at bottom left */}
      <div className='absolute bottom-3 left-3'>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            isDownloaded
              ? 'bg-gray-600 text-gray-400'
              : 'bg-gray-700 text-gray-300'
          }`}
        >
          {rule.files.length} file{rule.files.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Downloaded indicator */}
      {isDownloaded && (
        <div className='absolute bottom-3 right-3'>
          <span className='bg-green-800 text-green-200 px-2 py-1 rounded text-xs font-medium'>
            Downloaded
          </span>
        </div>
      )}
    </div>
  );
};

export default RuleCard;
