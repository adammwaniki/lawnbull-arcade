import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    // Check if user data exists in localStorage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Updated login function to check if a user is authenticated so that they can access the protected routes
const login = (userData) => {
  setUser(userData);
  setIsAuthenticated(true);
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('accessToken', userData.accessToken);
  localStorage.setItem('refreshToken', userData.refreshToken);
};

  const logout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      console.error('Error during logout:', error);
    }
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/token/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.access_token);
      return data.access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
