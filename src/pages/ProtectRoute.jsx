import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProtectRoute({ children }) {
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);

    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true });
        }
    }, [user, navigate]);

    // Prevent rendering children if the user is not authenticated
    if (!user) return null;

    return <>{children}</>;
}

export default ProtectRoute;
