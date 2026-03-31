import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '@/utils/api';
import { useAuth } from '@/Context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const { user, setUser, loading } = useAuth();
    const [loadingLocal, setLoadingLocal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check for error in URL
        const params = new URLSearchParams(location.search);
        const error = params.get('error');
        if (error === 'google_auth_failed') {
            setErrorMessage('Google authentication failed. Please try again.');
        }

        if (!loading && user) {
            if (user.role === 'organization') {
                window.location.href = import.meta.env.VITE_CRM_URL;
            } else {
                navigate('/dashboard');
            }
        }
    }, [user, loading, navigate, location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingLocal(true);
        try {
            await api.get('/sanctum/csrf-cookie', { baseURL: import.meta.env.VITE_API_URL });
            const res = await api.post('/login', { email, password, remember });
            
            setUser(res.data.user);
            
            if (res.data?.user?.role === 'organization') {
                window.location.href = import.meta.env.VITE_CRM_URL;
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login failed', error);
            setErrorMessage('Invalid email or password. Please try again.');
        } finally {
            setLoadingLocal(false);
        }
    };

    const handleGoogleAuth = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center py-10 px-4 font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            
            {/* Header / Logo */}
            <div className="mb-8 text-center">
                <Link to="/" className="inline-flex items-center justify-center gap-3 mb-6 group">
                    <div className="text-blue-600 dark:text-blue-400 flex items-center justify-center transition-transform group-hover:scale-110">
                         <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                    </div>
                    <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white transition-colors">Phungashang</span>
                </Link>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight transition-colors">Welcome Back</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium transition-colors">Sign in to your account to continue</p>
            </div>

            {/* Login Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-none w-full max-w-[420px] p-8 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                {errorMessage && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 text-sm rounded-xl flex items-center gap-3 animate-shake transition-colors">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="font-semibold">{errorMessage}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            required
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
                            Password
                        </label>
                        <input 
                            type="password" 
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="w-5 h-5 text-blue-600 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded focus:ring-blue-500 transition-colors"
                            />
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">Remember me</span>
                        </label>
                        <Link to="/forgot-password" disabled className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loadingLocal}
                        className="w-full py-4 bg-blue-600 dark:bg-blue-500 text-white font-black text-sm rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform active:scale-95"
                    >
                        {loadingLocal ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing In...
                            </>
                        ) : 'Sign In'}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                        <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Or continue with</span>
                        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                    </div>

                    {/* Google Button */}
                    <button 
                        type="button"
                        onClick={handleGoogleAuth}
                        className="w-full py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold text-sm rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm flex items-center justify-center gap-3 transform active:scale-95"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>
                    
                    <div className="text-center mt-8 pt-2 text-sm">
                         <span className="text-slate-500 dark:text-slate-400 font-medium transition-colors">Don't have an account? </span>
                         <Link to="/register" className="font-bold text-blue-600 dark:text-blue-400 hover:underline transition-all">Sign up here</Link>
                    </div>
                </form>
            </div>

            <div className="mt-12 flex flex-col items-center gap-6">
                <Link to="/" className="text-sm font-bold text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-all flex items-center gap-2 group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to home
                </Link>
                
                <p className="text-[10px] text-slate-400 dark:text-slate-600 uppercase font-bold tracking-widest">
                    Safe • Secure • Guaranteed
                </p>
            </div>

        </div>
    );
}
