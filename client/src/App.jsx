import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import About from "./components/AboutPage"
import MarketingPage from "./components/MarketingPage"
import LoadingPage from "./components/LoadingPage"
import AdminLogin from './components/AdminLogin'

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // To be replaced with actual data loading logic once API is done
        await fetch('https://api.example.com/initial-data');
        
        // Space for more async opertions
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <LoadingPage isLoading={isLoading} />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="/login" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  )
}
