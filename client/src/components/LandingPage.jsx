import { ParticlesBackground } from "./ParticlesBackground"
import Lottie from "lottie-react";
import animationData from "../assets/bull-flexing-animation.json"
import Navbar from "./Navbar"
import Footer from "./Footer";
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function LandingPage({ darkMode, toggleDarkMode }) {
    const [showLightEffect, setShowLightEffect] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setShowLightEffect(window.innerWidth >= 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

LandingPage.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    toggleDarkMode: PropTypes.func.isRequired,
};
