import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import errorAnimation from '../assets/error-404-animation.json';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setDarkMode(e.matches);
    
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-100'} p-10`}>
      <div className="w-1/2 max-w-md">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>
      <h1 className={`text-5xl font-arima font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
        Oops!
      </h1>
      <p className={`text-2xl  font-medium ${darkMode ? 'text-white' : 'text-gray-600'} mb-8`}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 text-2xl font-bold bg-emerald-500/80 text-white rounded-lg hover:bg-emerald-600 transition-colors"
      >
        Go Back Home
      </button>
    </div>
  );
}
