import { Navigate } from 'react-router-dom';
//import { useContext } from 'react';
//import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types'

export default function ProtectedRoute({ children }) {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
}


ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
