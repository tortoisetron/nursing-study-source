import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '@/utils/api';

export default function Login({ setAuth, authUserState }) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
            const response = await api.post('/login', credentials);
            
            // Wait to ensure authentication took hold
            const userRes = await api.get('/user');
            
            // Organisation verification could happen here: if (!userRes.data.organization_id) throw etc
            if (!userRes.data.organization_id && userRes.data.role !== 'admin') {
               // Ignore for now, just login
            }
            
            setAuth(userRes.data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="bg-[#1E293B] p-8 rounded-2xl shadow-2xl shadow-blue-900/20 max-w-md w-full border border-gray-800">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-xl mx-auto flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"/></svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Secure CRM Access</h1>
                    <p className="text-sm text-gray-400">Sign in to your organisation's environment</p>
                </div>
                
                {authUserState && !authUserState.organization_id && (authUserState.role !== 'organization' && authUserState.role !== 'admin') && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">
                        Warning: Logged in as normal user ({authUserState.email}). This portal requires an organization admin account.
                    </div>
                )}

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">{error}</div>}
                
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                        <input 
                            name="email" 
                            type="email" 
                            required 
                            value={credentials.email} 
                            onChange={handleChange}
                            className="w-full bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            placeholder="admin@organisation.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                        <input 
                            name="password" 
                            type="password" 
                            required 
                            value={credentials.password} 
                            onChange={handleChange}
                            className="w-full bg-[#0F172A] border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
