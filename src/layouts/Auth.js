import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthLayoutRoute = ({ children }) => {
    const isAuth = false; // Mocked authentication state for now

    if (isAuth) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="auth_layout_wrapper">
            <div className="authentication">{children}</div>
        </div>
    );
};

export default AuthLayoutRoute;
