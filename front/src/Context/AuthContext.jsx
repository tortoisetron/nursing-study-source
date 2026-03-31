import { createContext, useContext, useState, useEffect, useRef } from 'react';
import api from '@/utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetching = useRef(false);

    const checkAuth = async () => {
        if (fetching.current) return;
        fetching.current = true;
        
        try {
            const res = await api.get('/user');
            if (res.data.role === 'organization') {
               // Redirect to CRM and don't set user state on front
               window.location.href = 'http://localhost:5174';
               return;
            }
            setUser(res.data);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
            fetching.current = false;
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const logout = async () => {
        try {
            await api.get('/sanctum/csrf-cookie', { baseURL: 'http://localhost:8000' });
            await api.post('/logout');
            setUser(null);
            window.location.href = '/login';
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, checkAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
