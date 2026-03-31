import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/Context/AuthContext';

/**
 * A wrapper component for routes that require authentication.
 * Displays a loading state while verification is in progress.
 * Redirects to /login if no valid user session is found.
 */
export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#E5F0FA]">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <span className="text-slate-600 font-bold animate-pulse">Verifying Session...</span>
                </div>
            </div>
        );
    }

    if (!user) {
        // Redirect to login but save the current location they were trying to access
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user.role === 'organization') {
        window.location.href = import.meta.env.VITE_CRM_URL;
        return null;
    }

    return children;
}
