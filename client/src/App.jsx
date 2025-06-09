import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import AboutPage from "./components/AboutPage"
import MarketingPage from "./components/MarketingPage"
import LoadingPage from "./components/LoadingPage"
import AdminLogin from './components/AdminLogin'
import AdminDash from './components/AdminDash'
import { AuthProvider } from './context/AuthContext'
import NewBusinessCard from './components/cards/NewBusinessCard'
import ErrorPage from './components/ErrorPage'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [darkMode, setDarkMode] = useState(() => {
        const savedPreference = localStorage.getItem('darkMode')
        if (savedPreference !== null) {
            return JSON.parse(savedPreference)
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e) => {
            if (localStorage.getItem('darkMode') === null) {
                setDarkMode(e.matches)
            }
        }
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const toggleDarkMode = () => {
        const newMode = !darkMode
        setDarkMode(newMode)
        localStorage.setItem('darkMode', JSON.stringify(newMode))
    }

    useEffect(() => {
      const loadEssentialData = async () => {
          try {
              // Basic API health check
              await fetch(`${import.meta.env.VITE_API_URL}/`)
              setLoadingProgress(25)
  
              // Only load businesses data if on admin dashboard or marketing page
              if (window.location.pathname.includes('/admin')) {
                  await fetch(`${import.meta.env.VITE_API_URL}/businesses`)
                  setLoadingProgress(50)
              } else {
                  setLoadingProgress(50)
              }
  
              // Only load animations if on landing or marketing pages
              if (window.location.pathname === '/' || window.location.pathname === '/marketing') {
                  await Promise.all([
                      import('./assets/bull-flexing-animation.json'),
                      import('./assets/online-marketing-animation.json')
                  ])
                  setLoadingProgress(75)
              } else {
                  setLoadingProgress(75)
              }
  
              setLoadingProgress(100)
              setTimeout(() => setIsLoading(false), 200)
          } catch (error) {
              console.error('Loading failed:', error)
              setIsLoading(false)
          }
      }
      loadEssentialData()
  }, [])
  

    return (
        <AuthProvider>
            <div className="app-container" style={{ position: 'relative' }}>
                {/*
                {isLoading && (
                    <LoadingPage
                        isLoading={isLoading}
                        progress={loadingProgress}
                        darkMode={darkMode}
                    />
                )}
                {!isLoading && (
            */}
                    <Router>
                        <div className={`App ${darkMode ? 'dark' : ''} relative z-[1] opacity-100 transition-all duration-700 ease-in-out`}>
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
                                } />
                                <Route path="*" element={<ErrorPage />} />
                            </Routes>
                        </div>
                    </Router>
                {/* )}  */}
            </div>
        </AuthProvider>
    )
}
