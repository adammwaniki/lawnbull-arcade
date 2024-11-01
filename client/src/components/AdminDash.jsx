import { useState, useEffect, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientCardsMini from './cards/ClientCardsMini';
import AdminCardsFull from './cards/AdminCardsFull';
import Footer from './Footer';
import { AuthContext } from '../context/AuthContext';
import { ParticlesLogin } from "./ParticlesLogin";

export default function AdminDash() {
    const [businesses, setBusinesses] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    //const [filter, setFilter] = useState('all');
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
          const token = localStorage.getItem('accessToken');
          const response = await fetch(`${import.meta.env.VITE_API_URL}/business/${updatedBusiness.id}`, {
            method: 'PATCH',  // Changed from PUT to PATCH
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: updatedBusiness
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          setBusinesses(businesses.map(business => 
            business.id === updatedBusiness.id ? data.business : business
          ));
        } catch (error) {
          console.error('Update error:', error);
          throw error;
        }
      };
      
    

    const handleViewMore = (business) => {
        const formattedBusiness = {
            id: business.id, // Keep the id for admin functions
            main_image_url: business.main_image_url,
            name: business.name,
            subtitle: business.subtitle,
            paragraph1: business.paragraph1,
            paragraph2: business.paragraph2,
            paragraph3: business.paragraph3,
            additional_image_url1: business.additional_image_url1,
            additional_image_url2: business.additional_image_url2,
            additional_image_url3: business.additional_image_url3
        };
        setSelectedBusiness(formattedBusiness);
    };

    const handleDeleteBusiness = async (businessId) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/business/${businessId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete business');
            }
            
            setBusinesses(businesses.filter(business => business.id !== businessId));
        } catch (error) {
            console.error('Error deleting business:', error);
            throw error;
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
        //.filter(business => filter === 'all' || business.category === filter);

    return (
        <div className={`relative min-h-screen  flex flex-col bg-black ${darkMode ? 'dark' : ''}`}>
        {MemoizedParticlesLogin}
            <main className="bg-[#17163e] dark:bg-[#17163e] bg-opacity-60 dark:bg-opacity-60 p-8 shadow-lg z-10 w-4/5 h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] 2xl:h-[calc(100vh-2.25rem)] mx-auto overflow-y-auto flex flex-col mb-16">
                <h1 className="text-4xl  mb-8 text-white font-arima font-extrabold tracking-wide dark:text-gray-200">Admin Dashboard</h1>
                
                <button 
                    onClick={handleLogout}
                    className="absolute top-4 right-4 bg-red-500 text-white px-6 py-2 rounded-full font-arima font-extrabold text-xl hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>

                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search business name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 rounded bg-gray-700 text-white"
                    />
                    
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {filteredBusinesses.map(business => (
                        <ClientCardsMini
                        key={business.id}
                        main_image_url={business.main_image_url}  // Changed from 'image' to 'main_image_url'
                        name={business.name || 'New Business'}     // Changed from 'title' to 'name'
                        subtitle={business.subtitle || 'Business Description'}  // Changed from 'description' to 'subtitle'
                        paragraph1={business.paragraph1}
                        onViewMore={() => handleViewMore(business)}
                    />
                    
                    ))}
                </div>

                {selectedBusiness && (
                    <AdminCardsFull
                        image={selectedBusiness.main_image_url || 'https://via.placeholder.com/300'}
                        title={selectedBusiness.name || 'Untitled Business'}
                        subtitle={selectedBusiness.subtitle || "Default Catchphrase"}
                        paragraphs={[
                            selectedBusiness.paragraph1 || '',
                            selectedBusiness.paragraph2 || '',
                            selectedBusiness.paragraph3 || ''
                        ]}
                        additionalImages={[
                            selectedBusiness.additional_image_url1,
                            selectedBusiness.additional_image_url2, 
                            selectedBusiness.additional_image_url3
                        ].filter(Boolean)}
                        onClose={() => setSelectedBusiness(null)}
                        onUpdate={handleUpdateBusiness}
                        onDelete={() => {
                            if (window.confirm('Are you sure you want to delete this business?')) {
                                handleDeleteBusiness(selectedBusiness.id);
                                setSelectedBusiness(null);
                            }
                        }}
                        business={selectedBusiness}
                    />
                )}




                <button
                    onClick={() => {
                        navigate('/admin/new-business')
                    }}
                    className="content-center mt-8 bg-gradient-to-r from-indigo-500/80 from-10% via-sky-500/80 via-30% to-emerald-500/80 to-90% text-white py-2 px-4 rounded-md font-arima font-extrabold uppercase tracking-wide hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                    Create New Business
                </button>
            </main>
            <Footer darkMode={darkMode}/>
        </div>
    );
}
