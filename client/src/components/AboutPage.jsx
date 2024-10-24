import { useMemo, useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ContactCard from "./ContactCard";
import { ParticlesLogin } from "./ParticlesLogin";

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);

  const MemoizedParticlesLogin = useMemo(() => <ParticlesLogin darkMode={darkMode} />, [darkMode]);

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

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-between ${darkMode ? 'dark' : ''}`}>
      {MemoizedParticlesLogin}
      <div className="mt-8 w-full md:w-1/3 md:fixed md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 flex justify-center md:justify-end z-20">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <main className="w-full max-w-6xl bg-opacity-80 p-4 md:p-8 rounded-lg shadow-lg z-10 flex flex-col justify-between flex-grow">
        <div className="flex flex-col md:flex-row  md:justify-between md:h-[90vh]">

          {/* Left Side Content */}
          <div className="flex-1 max-w-md pb-6 pt-6 mt-6 bg-gray-50 bg-opacity-85 shadow-md rounded-lg p-4 md:p-6 mb-12 md:mb-0 md:mr-4  overflow-auto md:order-1 ">
            <h3 className="text-[2rem] lg:text-[2vw] lg:leading-tight text-[#17163e] dark:text-white mb-4 font-playfair-display font-extrabold ">Growing Your Brand, <br/> One Lawn at a Time </h3>
            <div className="text-[#17163e] dark:text-white font-medium space-y-5 text-md md:text-[1.05rem]">
              <p>
                At Lawnbull Limited, we specialize in marketing that helps your business thrive.
                Our unique approach combines innovative digital strategies with impactful real-world adverts,
                ensuring your brand stands out and connects with the right audience.
              </p>
              <p>
                Our passionate team leverages the latest tools to create buzz around your brand.
                From eye-catching social media campaigns to dynamic offline adverts, we tailor our marketing efforts
                to maximize your visibility and engagement, all while focusing on measurable results.
              </p>
              <p>
                We believe in building strong relationships with our clients. By understanding your vision and goals,
                Lawnbull crafts personalized marketing strategies that resonate. Let&apos;s plant the seeds of success together and watch your brand flourish!
              </p>
            </div>
          </div>
          {/* Contact Card */}
          <div className="flex-1 p-4 pb-6 pt-6 rounded-lg mb-12 md:order-2">
            <ContactCard />
          </div>
        </div>
        <Footer darkMode={darkMode} />
      </main>
    </div>
  );
}
