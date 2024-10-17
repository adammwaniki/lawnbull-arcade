import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-all duration-1000 ease-out transform ${isVisible ? '-translate-x-0' : '-translate-x-[90vw]'} flex lg:h-fit pl-2 pt-2 pb-2 text-lg md:text-[3.5vh] lg:leading-tight font-spicy-rice text-white text-center`}>
      <aside>
        <div className="flex  flex-grow">
          <nav>
            <ul className="space-y-2">
              {['Home', 'About', 'Marketing', 'Login'].map((item, index) => (
                <li
                  key={item}
                  className={`bg-gradient-to-r from-indigo-500/80 from-10% via-sky-500/80 via-30% to-emerald-500/80 to-90% hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-80 rounded-full transition-all duration-500 ease-out transform ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <a href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} className="block px-2 md:px-4 lg:px-8 md:py-2">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <button onClick={toggleDarkMode} className="p-2 mt-2 rounded-full bg-gray-200 dark:bg-gray-800">
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="yellow">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </aside>
    </div>
  );
}

Navbar.propTypes = {
  darkMode: PropTypes.bool,
  toggleDarkMode: PropTypes.func,
};