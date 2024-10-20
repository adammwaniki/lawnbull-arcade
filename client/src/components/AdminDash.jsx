import { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientCardsMini from './cards/ClientCardsMini';
import ClientCardsFull from './cards/ClientCardsFull';
import Footer from './Footer';
import { AuthContext } from '../context/AuthContext';
import { ParticlesLogin } from "./ParticlesLogin";

export default function AdminDash() {
    const [businesses, setBusinesses] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [darkMode, setDarkMode] = useState(false);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBusinesses();

        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDarkMode);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => setDarkMode(e.matches);
        
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const MemoizedParticlesLogin = useMemo(() => <ParticlesLogin darkMode={darkMode} />, [darkMode]);

    const fetchBusinesses = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/businesses`);
            if (!response.ok) {
                throw new Error('Failed to fetch businesses');
            }
            const data = await response.json();
            setBusinesses(data);
        } catch (error) {
            console.error('Error fetching businesses:', error);
        }
    };

    const handleUpdateBusiness = async (updatedBusiness) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/business/${updatedBusiness.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedBusiness),
            });
            if (!response.ok) {
                throw new Error('Failed to update business');
            }
            const updated = await response.json();
            setBusinesses(businesses.map(business => business.id === updated.id ? updated : business));
        } catch (error) {
            console.error('Error updating business:', error);
        }
    };

    const handleDeleteBusiness = async (businessId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/business/${businessId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete business');
            }
            setBusinesses(businesses.filter(business => business.id !== businessId));
        } catch (error) {
            console.error('Error deleting business:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('publicId');
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const filteredBusinesses = businesses
        .filter(business => business.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(business => filter === 'all' || business.category === filter);

    return (
        <div className={`relative min-h-screen flex flex-col bg-black ${darkMode ? 'dark' : ''}`}>
        {MemoizedParticlesLogin}
            <main className="bg-[#17163e] dark:bg-[#17163e] bg-opacity-60 dark:bg-opacity-60 p-8 shadow-lg z-10 w-4/5 h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] 2xl:h-[calc(100vh-2.25rem)] mx-auto overflow-y-auto flex flex-col">
                <h1 className="text-4xl  mb-8 text-white font-spicy-rice dark:text-gray-200">Admin Dashboard</h1>
                
                <button 
                    onClick={handleLogout}
                    className="absolute top-4 right-4 bg-red-500 text-white px-6 py-2 rounded-full font-spicy-rice hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>

                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search businesses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 rounded bg-gray-700 text-white"
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="ml-4 p-2 rounded bg-gray-700 text-white"
                    >
                        <option value="all">All Categories</option>
                        {/* Add more options based on your categories */}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBusinesses.map(business => (
                        <ClientCardsMini
                            key={business.id}
                            {...business}
                            onViewMore={() => setSelectedBusiness(business)}
                        />
                    ))}
                </div>

                {selectedBusiness && (
                    <ClientCardsFull
                        {...selectedBusiness}
                        onClose={() => setSelectedBusiness(null)}
                        onUpdate={handleUpdateBusiness}
                        onDelete={() => handleDeleteBusiness(selectedBusiness.id)}
                    />
                )}

                <button
                    onClick={() => {
                        navigate('/admin/new-business')
                    }}
                    className="mt-8 bg-gradient-to-r from-indigo-500/80 from-10% via-sky-500/80 via-30% to-emerald-500/80 to-90% text-white py-2 px-4 rounded-md font-semibold uppercase tracking-wide hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                    Create New Business
                </button>
            </main>
            <Footer darkMode={darkMode}/>
        </div>
    );
}
