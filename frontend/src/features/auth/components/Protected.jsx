import { useAuth } from "../hooks/useAuth";
import React from "react";
import { Navigate } from "react-router";


const Protected = ({ children }) => {
    // This component is a wrapper for routes that require authentication. It checks if the user is authenticated and either renders the child components or redirects to the login page.

    const { loading, user } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default Protected;