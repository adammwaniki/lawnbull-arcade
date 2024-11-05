import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import AboutPage from "./components/AboutPage"
import MarketingPage from "./components/MarketingPage"
import LoadingPage from "./components/LoadingPage"
import AdminLogin from './components/AdminLogin'
//import Footer from './components/Footer'
import AdminDash from './components/AdminDash'
import { AuthProvider } from './context/AuthContext';
import NewBusinessCard from './components/cards/NewBusinessCard'
import ErrorPage from './components/ErrorPage'
import ProtectedRoute from './components/ProtectedRoute'


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    // First check localStorage for user preference
    const savedPreference = localStorage.getItem('darkMode');
    if (savedPreference !== null) {
      return JSON.parse(savedPreference);
    }
    // Fall back to system preference if no saved preference exists
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only update if there's no user preference stored
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    // Save user preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  useEffect(() => {
    const loadEssentialData = async () => {
      try {
        // Initial API connection check
        await fetch(`${import.meta.env.VITE_API_URL}/`);
        setLoadingProgress(25);

        // Load businesses data
        await fetch(`${import.meta.env.VITE_API_URL}/businesses`);
        setLoadingProgress(50);

        // Load static assets and animations
        await Promise.all([
          import('./assets/bull-flexing-animation.json'),
          import('./assets/online-marketing-animation.json')
        ]);
        setLoadingProgress(75);

        // Simulate final loading steps with a small delay for smooth transition
        await new Promise(resolve => setTimeout(resolve, 800));
        setLoadingProgress(100);

        // Complete loading
        setTimeout(() => setIsLoading(false), 200);

      } catch (error) {
        console.error('Loading failed:', error);
        // Show error state in LoadingPage
        setIsLoading(false);
      }
    };

    loadEssentialData();
  }, []);


  if (isLoading) {
    return <LoadingPage 
      isLoading={isLoading} 
      progress={loadingProgress} 
      darkMode={darkMode} 
    />;
  }


  return (
    <AuthProvider>
      <Router>
        <div className={`App ${darkMode ? 'dark' : ''}`}>
          <Routes>
            <Route path="/" element={<LandingPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/about" element={<AboutPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/marketing" element={<MarketingPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/login" element={<AdminLogin darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDash darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              </ProtectedRoute>
            } />
            <Route path="/admin/new-business" element={
                    <ProtectedRoute>
                        <NewBusinessCard />
                    </ProtectedRoute>
                } 
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
      
    </AuthProvider>
  )
}
