import { ParticlesBackground } from "./ParticlesBackground"
import Lottie from "lottie-react";
import animationData from "../assets/bull-flexing-animation.json"
// import DarkModeAwareLottie from './DarkModeAwareLottie';
import Navbar from "./Navbar"
import Footer from "./Footer";
import { useState, useEffect } from 'react';

export default function LandingPage() {
    const [showLightEffect, setShowLightEffect] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
      const handleResize = () => {
          setShowLightEffect(window.innerWidth >= 1024);
      };
  
      handleResize();
      window.addEventListener('resize', handleResize);
  
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
  
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => setDarkMode(e.matches);
      
      // Fix: Add the event type 'change' as the first argument
      mediaQuery.addEventListener('change', handleChange);
  
      return () => {
          // Fix: Remove the event listener with both arguments
          mediaQuery.removeEventListener('change', handleChange);
          window.removeEventListener('resize', handleResize);
      };
  }, []);
  

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
      <div className={`relative flex flex-row items-center justify-center min-h-screen min-w-full ${darkMode ? 'dark' : ''}`}>
          <div className="flex flex-col dark:bg-gray-900">
              <ParticlesBackground showLightEffect={showLightEffect} darkMode={darkMode} />
              <div className="lawnbull-intro z-10">
                  <h1 className="text-[6rem] lg:text-[10vw] text-center font-wunderbar dark:text-white">
                      Lawnbull Limited
                  </h1>
              </div>
              
              <Lottie animationData={animationData} 
                      className="h-[40vh]"
                      style={{
                        filter: darkMode ? 'drop-shadow(0px 0px 2px white)' : 'none'
                      }}
                />
          </div>
          <div className="absolute right-0">
              <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
          <Footer darkMode={darkMode} />
      </div>
    )  
}
