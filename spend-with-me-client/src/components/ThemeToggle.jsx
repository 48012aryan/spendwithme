import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  useEffect(() => {
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply dark mode if saved as dark, or if no preference is saved yet
    if (savedTheme === 'dark' || (!savedTheme && prefersDark) || !savedTheme) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  return (
    <button 
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:scale-110 hover:shadow-lg transition-all duration-300 overflow-hidden group"
      aria-label="Toggle Dark Mode"
    >
      {/* Sun Icon (Slides up and fades out in Dark Mode) */}
      <span className={`absolute transition-all duration-500 ease-in-out ${isDark ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100 text-amber-500 group-hover:rotate-45'}`}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
      </span>
      {/* Moon Icon (Slides down and fades in in Dark Mode) */}
      <span className={`absolute transition-all duration-500 ease-in-out ${isDark ? 'translate-y-0 opacity-100 text-blue-400 group-hover:-rotate-12' : '-translate-y-10 opacity-0'}`}>
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
      </span>
    </button>
  );
}