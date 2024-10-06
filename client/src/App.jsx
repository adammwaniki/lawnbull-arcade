import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import About from "./components/AboutPage"
import MarketingPage from "./components/MarketingPage"
import LoadingPage from "./components/LoadingPage"
import AdminLogin from './components/AdminLogin'
//import Footer from './components/Footer'
import AdminDash from './components/AdminDash'

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or use actual loading logic
    const timer = setTimeout(() => {
    setIsLoading(false);
    }, 5000); // Adjust time as needed
    
    
    return () => clearTimeout(timer);
    }, []);

  if (isLoading) {
    return <LoadingPage isLoading={isLoading} />;
  }

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/marketing" element={<MarketingPage />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDash />} />
          </Routes>
        </div>
      </Router>
      
    </>
  )
}
