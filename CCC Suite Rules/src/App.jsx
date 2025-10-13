import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { categorizeRules } from './utils/ruleUtils';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RuleCategory from './components/RuleCategory';
import DownloadButton from './components/DownloadButton';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [rules, setRules] = useState([]);
  const [filteredRules, setFilteredRules] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [downloadedRules, setDownloadedRules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadRules();

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const loadRules = async () => {
    try {
      setLoading(true);
      setError(null);

      if (window.electronAPI) {
        const rulesData = await window.electronAPI.getRulesDirectory();
        setRules(rulesData);
        setFilteredRules(rulesData);
      } else {
        throw new Error('Electron API not available');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load rules');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRule = rule => {
    setSelectedRules(prev => {
      const isSelected = prev.some(selected => selected.name === rule.name);
      if (isSelected) {
        return prev.filter(selected => selected.name !== rule.name);
      } else {
        return [...prev, rule];
      }
    });
  };

  const handleDownload = async () => {
    if (selectedRules.length === 0) return;

    try {
      setDownloading(true);
      setError(null);

      if (window.electronAPI) {
        const result =
          await window.electronAPI.downloadSelectedRules(selectedRules);

        if (result.success) {
          setDownloadComplete(true);
          setDownloadedRules(prev => [
            ...prev,
            ...selectedRules.map(rule => rule.name),
          ]);
          setTimeout(() => {
            setDownloadComplete(false);
          }, 3000);
        } else {
          throw new Error('Download failed');
        }
      } else {
        throw new Error('Electron API not available');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setDownloading(false);
    }
  };

  const handleSearch = searchValue => {
    setSearchTerm(searchValue);
    if (searchValue.trim() === '') {
      setFilteredRules(rules);
    } else {
      const filtered = rules.filter(
        rule =>
          rule.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          rule.files.some(file =>
            file.name.toLowerCase().includes(searchValue.toLowerCase())
          )
      );
      setFilteredRules(filtered);
    }
  };

  const categorizedRules = categorizeRules(filteredRules);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-900'>
        <Header
          title='LangLink'
          subtitle='Loading your development rules...'
        />
        <div className='max-w-6xl mx-auto px-6 py-8'>
          <LoadingSpinner message='Scanning rules directory...' />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-900'>
        <Header title='LangLink' subtitle='Error loading rules' />
        <div className='max-w-6xl mx-auto px-6 py-8'>
          <ErrorMessage message={error} onRetry={loadRules} />
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-900 flex flex-col'>
      <Header
        title='LangLink'
        subtitle='Select and download your Cursor AI development rules'
      />

      <main className='flex-1 max-w-7xl mx-auto px-6 py-8 overflow-y-auto pb-24'>
        {downloadComplete && (
          <div className='mb-6 bg-green-900/20 border border-green-500 text-green-300 px-6 py-4 rounded-lg'>
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
                  d='M5 13l4 4L19 7'
                />
              </svg>
              <span className='font-semibold'>Download Complete!</span>
            </div>
            <p className='mt-1'>
              Rules have been saved to Desktop/.cursor/rules/
            </p>
          </div>
        )}

        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-gray-100 mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
            Available Development Rules
          </h1>
          <p className='text-gray-300 text-lg max-w-2xl mx-auto'>
            Select the rules you want to use for your project. Files will be
            downloaded to your Desktop/.cursor/rules/ folder.
          </p>
        </div>

        <SearchBar
          onSearch={handleSearch}
          placeholder='Search rules by name or technology...'
        />

        {searchTerm && (
          <div className='mb-6 text-center'>
            <p className='text-gray-400 text-sm'>
              Showing {filteredRules.length} of {rules.length} rules
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        )}

        {Object.entries(categorizedRules).map(([category, categoryRules]) => (
          <RuleCategory
            key={category}
            title={category}
            rules={categoryRules}
            selectedRules={selectedRules}
            onToggleRule={handleToggleRule}
            downloadedRules={downloadedRules}
          />
        ))}
      </main>

      {selectedRules.length > 0 && (
        <div className='fixed bottom-0 left-0 right-0 z-50'>
          <DownloadButton
            selectedRules={selectedRules}
            onDownload={handleDownload}
            isDownloading={downloading}
          />
        </div>
      )}
    </div>
  );
};

export default App;
