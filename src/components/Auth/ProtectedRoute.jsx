import React, { useContext } from 'react'
import { StateContext } from '../../context/StateContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(StateContext);

  return isAuthenticated ? children : <Navigate to={'/login'}/>
}
export default ProtectedRoute;
