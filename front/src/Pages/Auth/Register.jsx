import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '@/utils/api';
import { useAuth } from '@/Context/AuthContext';

export default function Register() {
    const [accountType, setAccountType] = useState('individual');
    const [organizations, setOrganizations] = useState([]);
    const [formData, setFormData] = useState({
        // General / Student / Individual
        organization_id: '',
        name: '', email: '', phone: '', password: '', confirm: '', 
        // Organization specific
        org_name: '', org_email: '', org_phone: '', org_address: '',
        admin_name: '', admin_email: '', admin_phone: '',
        agree: false
    });
    const { user, setUser, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect if already logged in
        if (!authLoading && user) {
            if (user.role === 'organization') {
                window.location.href = import.meta.env.VITE_CRM_URL;
            } else {
                navigate('/dashboard');
            }
        }

        if (accountType === 'student') {
            api.get('/organizations')
                .then(res => setOrganizations(res.data))
                .catch(err => console.error('Failed to load organizations', err));
        }
    }, [accountType, navigate, user, authLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.get('/sanctum/csrf-cookie', { baseURL: import.meta.env.VITE_API_URL });
            
            // Map confirm to password_confirmation for Laravel logic
            const payload = { ...formData, accountType, password_confirmation: formData.confirm };
            
            const res = await api.post('/register', payload);
            
            setUser(res.data.user);
            
            if (res.data?.user?.role === 'organization') {
                window.location.href = import.meta.env.VITE_CRM_URL;
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed. Please check your details and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    };

    const inputClass = "w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm";
    const labelClass = "block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1 transition-colors";

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center py-10 px-4 font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            
            {/* Header / Logo */}
            <div className="mb-8 text-center mt-4">
                <Link to="/" className="inline-flex items-center justify-center gap-3 mb-6 group">
                    <div className="text-blue-600 dark:text-blue-400 flex items-center justify-center transition-transform group-hover:scale-110">
                         <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                    </div>
                    <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white transition-colors">Phungashang</span>
                </Link>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight transition-colors">Create Account</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium transition-colors">Sign up to get started with your journey</p>
            </div>

            {/* Register Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-none w-full max-w-[520px] p-8 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Account Type */}
                    <div className="mb-6">
                        <label className={labelClass}>Select Account Type</label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: 'individual', label: 'Individual', emoji: '👤', sub: 'Personal' },
                                { id: 'student', label: 'Student', emoji: '🎓', sub: 'Join School' },
                                { id: 'organization', label: 'Organization', emoji: '🏢', sub: 'Institution' }
                            ].map((type) => (
                                <button 
                                    key={type.id}
                                    type="button" 
                                    onClick={() => setAccountType(type.id)} 
                                    className={`flex flex-col items-center justify-center p-3.5 rounded-xl border-2 transition-all group ${accountType === type.id ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50'}`}
                                >
                                    <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">{type.emoji}</span>
                                    <span className={`text-[11px] font-black uppercase tracking-wider ${accountType === type.id ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>{type.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Fields */}
                    {accountType === 'student' && (
                        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-xl p-5 mb-6 animate-in fade-in slide-in-from-top-2">
                            <h3 className="text-sm font-black text-blue-800 dark:text-blue-300 mb-4 uppercase tracking-wider">Your Institution</h3>
                            <div>
                                <label className={labelClass}>Select Organization<span className="text-red-500">*</span></label>
                                <select 
                                    value={formData.organization_id} 
                                    onChange={(e) => setFormData({...formData, organization_id: e.target.value})}
                                    required
                                    className={`${inputClass} cursor-pointer`}
                                >
                                    <option value="" className="dark:bg-slate-900">Select your organization</option>
                                    {organizations.map(org => (
                                        <option key={org.id} value={org.id} className="dark:bg-slate-900">{org.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {(accountType === 'individual' || accountType === 'student') && (
                        <div className="grid gap-5">
                            <div>
                                <label className={labelClass}>Full Name<span className="text-red-500">*</span></label>
                                <input type="text" required placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={inputClass} />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>Email Address<span className="text-red-500">*</span></label>
                                    <input type="email" required placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Phone Number{accountType === 'individual' && <span className="text-red-500">*</span>}</label>
                                    <input type="tel" required={accountType === 'individual'} placeholder="+1 (555) 000-0000" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={inputClass} />
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClass}>Password<span className="text-red-500">*</span></label>
                                    <input type="password" required placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Confirm Password<span className="text-red-500">*</span></label>
                                    <input type="password" required placeholder="••••••••" value={formData.confirm} onChange={(e) => setFormData({...formData, confirm: e.target.value})} className={inputClass} />
                                </div>
                            </div>
                        </div>
                    )}

                    {accountType === 'organization' && (
                        <div className="space-y-6">
                            <div className="bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl p-5">
                                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Institution Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClass}>Institution Name<span className="text-red-500">*</span></label>
                                        <input type="text" required placeholder="e.g., ABC University" value={formData.org_name} onChange={(e) => setFormData({...formData, org_name: e.target.value})} className={inputClass} />
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Contact Email<span className="text-red-500">*</span></label>
                                            <input type="email" required placeholder="contact@university.edu" value={formData.org_email} onChange={(e) => setFormData({...formData, org_email: e.target.value})} className={inputClass} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Contact Phone</label>
                                            <input type="tel" placeholder="+1..." value={formData.org_phone} onChange={(e) => setFormData({...formData, org_phone: e.target.value})} className={inputClass} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-xl p-5">
                                <h3 className="text-sm font-black text-blue-800 dark:text-blue-300 mb-4 uppercase tracking-wider">Admin Account</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClass}>Admin Full Name<span className="text-red-500">*</span></label>
                                        <input type="text" required placeholder="Admin Name" value={formData.admin_name} onChange={(e) => setFormData({...formData, admin_name: e.target.value})} className={inputClass} />
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Admin Email<span className="text-red-500">*</span></label>
                                            <input type="email" required placeholder="admin@university.edu" value={formData.admin_email} onChange={(e) => setFormData({...formData, admin_email: e.target.value})} className={inputClass} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Admin Phone</label>
                                            <input type="tel" placeholder="+1..." value={formData.admin_phone} onChange={(e) => setFormData({...formData, admin_phone: e.target.value})} className={inputClass} />
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Password<span className="text-red-500">*</span></label>
                                            <input type="password" required placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className={inputClass} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Confirm Password<span className="text-red-500">*</span></label>
                                            <input type="password" required placeholder="••••••••" value={formData.confirm} onChange={(e) => setFormData({...formData, confirm: e.target.value})} className={inputClass} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Terms */}
                    <div className="pt-2">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input type="checkbox" required checked={formData.agree} onChange={(e) => setFormData({...formData, agree: e.target.checked})} className="mt-1 w-5 h-5 text-blue-600 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded focus:ring-blue-500 transition-colors" />
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                                I agree to the <Link to="/terms" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Terms & Conditions</Link> and <Link to="/privacy-policy" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Privacy Policy</Link>
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 dark:bg-blue-500 text-white font-black text-sm rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95">
                        {loading ? 'Creating Account...' : 'Continue to Dashboard'}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
                        <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Or register with</span>
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
                        Sign up with Google
                    </button>
                    
                    <div className="text-center mt-8 pt-1 text-sm">
                         <span className="text-slate-500 dark:text-slate-400 font-medium transition-colors">Already have an account? </span>
                         <Link to="/login" className="font-bold text-blue-600 dark:text-blue-400 hover:underline transition-colors">Sign In</Link>
                    </div>
                </form>
            </div>

            <div className="mt-12 mb-8 flex flex-col items-center gap-6">
                <Link to="/" className="text-sm font-bold text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-all flex items-center gap-2 group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to home
                </Link>
                <p className="text-[10px] text-slate-400 dark:text-slate-600 uppercase font-bold tracking-widest">
                    Safe • Secure • Academic Integrity
                </p>
            </div>

        </div>
    );
}
