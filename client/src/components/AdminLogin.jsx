import { useState, useMemo, useEffect } from 'react';
import { ParticlesLogin } from "./ParticlesLogin"
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Footer from './Footer';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the JWT token in localStorage
        localStorage.setItem('adminToken', data.access_token);
        
        // Decode the token to get user information
        const decodedToken = jwtDecode(data.access_token);
        
        // You can store additional user info in localStorage if needed
        localStorage.setItem('adminUsername', decodedToken.username);
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error(error);
    }
  };  

  const MemoizedParticlesLogin = useMemo(() => <ParticlesLogin darkMode={darkMode} />, [darkMode]);
  // By memoizing the ParticlesLogin component, we ensure that it only renders once when the AdminLogin component mounts, and it won't re-render when the input fields change.

  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center bg-black ${darkMode ? 'dark' : ''}`}>
      {MemoizedParticlesLogin}
      <div className="w-full md:w-1/3 md:absolute md:right-0 flex justify-center md:justify-end">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      <main className="bg-[#17163e] dark:bg-[#17163e] bg-opacity-80 p-8 rounded-lg shadow-lg z-10 relative mt-16 md:mt-0">
        <h2 className="text-2xl font-bold text-white dark:text-gray-200 text-center mb-6">Login</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="userName" className="block text-white dark:text-gray-300 mb-2">Username</label>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Type your username"
              required
              className="w-full px-3 py-2 bg-transparent border-b border-white text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="userPassword" className="block text-white dark:text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="userPassword"
              id="userPassword"
              placeholder="Type your password"
              required
              className="w-full px-3 py-2 bg-transparent border-b border-white text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500/80 from-10% via-sky-500/80 via-30% to-emerald-500/80 to-90% text-white py-2 px-4 rounded-md font-semibold uppercase tracking-wide hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <Footer darkMode={darkMode}/>
      </main>
    </div>
  );
}
