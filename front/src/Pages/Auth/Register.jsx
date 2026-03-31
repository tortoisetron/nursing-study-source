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
            alert('Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    };

    const inputClass = "w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:border-blue-500 outline-none transition-colors bg-white placeholder:text-gray-400 shadow-sm";
    const labelClass = "block text-[13px] font-semibold text-[#374151] mb-1 flex items-center gap-1";

    return (
        <div className="min-h-screen bg-[#E5F0FA] flex flex-col items-center py-10 px-4 font-sans text-slate-800" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            
            {/* Header / Logo */}
            <div className="mb-6 text-center mt-4">
                <Link to="/" className="inline-flex items-center justify-center gap-3 mb-4">
                    <div className="text-blue-600 flex items-center justify-center">
                         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                    </div>
                    <span className="font-extrabold text-[1.4rem] tracking-tight text-[#111827]">Nursing Study Source</span>
                </Link>
                <h1 className="text-[1.7rem] font-bold text-[#1e3a8a] mb-2 tracking-tight">Create Account</h1>
                <p className="text-gray-500 text-[0.95rem]">Sign up to get started with your journey</p>
            </div>

            {/* Register Card */}
            <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-full max-w-[500px] p-8 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Account Type */}
                    <div className="mb-4">
                        <label className={labelClass}>Account Type</label>
                        <div className="grid grid-cols-3 gap-3">
                            <button 
                                type="button" 
                                onClick={() => setAccountType('individual')} 
                                className={`flex flex-col items-center justify-center p-3 rounded-lg border focus:outline-none transition-all ${accountType === 'individual' ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <span className="text-2xl mb-1.5 opacity-90">👤</span>
                                <span className={`text-[12px] font-bold ${accountType === 'individual' ? 'text-[#111827]' : 'text-gray-600'}`}>Individual</span>
                                <span className="text-[10px] text-gray-400 mt-0.5 whitespace-nowrap">Personal account</span>
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setAccountType('student')} 
                                className={`flex flex-col items-center justify-center p-3 rounded-lg border focus:outline-none transition-all ${accountType === 'student' ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <span className="text-2xl mb-1.5 opacity-90">🎓</span>
                                <span className={`text-[12px] font-bold ${accountType === 'student' ? 'text-[#111827]' : 'text-gray-600'}`}>Student</span>
                                <span className="text-[10px] text-gray-400 mt-0.5 whitespace-nowrap">Join organization</span>
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setAccountType('organization')} 
                                className={`flex flex-col items-center justify-center p-3 rounded-lg border focus:outline-none transition-all ${accountType === 'organization' ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <span className="text-2xl mb-1.5 opacity-90">🏢</span>
                                <span className={`text-[12px] font-bold ${accountType === 'organization' ? 'text-[#111827]' : 'text-gray-600'}`}>Organization</span>
                                <span className="text-[10px] text-gray-400 mt-0.5 whitespace-nowrap">School or University</span>
                            </button>
                        </div>
                    </div>

                    {/* Dynamic Fields */}
                    {accountType === 'student' && (
                        <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-4 mb-4">
                            <h3 className="text-[14px] font-bold text-[#0f5132] mb-3 leading-tight">Select Your Organization</h3>
                            <div>
                                <label className={labelClass}>Organization<span className="text-red-500">*</span></label>
                                <select 
                                    value={formData.organization_id} 
                                    onChange={(e) => setFormData({...formData, organization_id: e.target.value})}
                                    required
                                    className={`${inputClass} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207l5%205%205-5%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[position:right_10px_center] bg-no-repeat pr-10`}
                                >
                                    <option value="">Select your organization</option>
                                    {organizations.map(org => (
                                        <option key={org.id} value={org.id}>{org.name}</option>
                                    ))}
                                </select>
                                <p className="text-[11px] text-[#4b5563] font-medium mt-1.5 ml-0.5">Choose the organization you're affiliated with</p>
                            </div>
                        </div>
                    )}

                    {(accountType === 'individual' || accountType === 'student') && (
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Full Name<span className="text-red-500">*</span></label>
                                <input type="text" required placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Email Address<span className="text-red-500">*</span></label>
                                <input type="email" required placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Phone Number{accountType === 'individual' && <span className="text-red-500">*</span>}</label>
                                <input type="tel" required={accountType === 'individual'} placeholder="+1234567890" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Password<span className="text-red-500">*</span></label>
                                <input type="password" required placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Confirm Password<span className="text-red-500">*</span></label>
                                <input type="password" required placeholder="Confirm Password" value={formData.confirm} onChange={(e) => setFormData({...formData, confirm: e.target.value})} className={inputClass} />
                            </div>
                        </div>
                    )}

                    {accountType === 'organization' && (
                        <div className="space-y-4">
                            <div className="bg-[#f4faff] border border-[#bae6fd] rounded-lg p-5">
                                <h3 className="text-[13.5px] font-bold text-[#0369a1] mb-3">Organization Information</h3>
                                <div className="space-y-3.5">
                                    <div>
                                        <label className={labelClass}>Organization Name<span className="text-red-500">*</span></label>
                                        <input type="text" required placeholder="e.g., ABC University" value={formData.org_name} onChange={(e) => setFormData({...formData, org_name: e.target.value})} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Organization Email<span className="text-red-500">*</span></label>
                                        <input type="email" required placeholder="contact@university.edu" value={formData.org_email} onChange={(e) => setFormData({...formData, org_email: e.target.value})} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Organization Phone</label>
                                        <input type="tel" placeholder="+1234567890" value={formData.org_phone} onChange={(e) => setFormData({...formData, org_phone: e.target.value})} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Organization Address</label>
                                        <textarea placeholder="Full address" rows="2" value={formData.org_address} onChange={(e) => setFormData({...formData, org_address: e.target.value})} className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:border-blue-500 outline-none transition-colors bg-white resize-none shadow-sm placeholder:text-gray-400"></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-5">
                                <div className="mb-3.5">
                                    <h3 className="text-[13.5px] font-bold text-[#0f5132] block">Admin Account Information</h3>
                                    <p className="text-[10.5px] font-medium text-[#166534]/70 mt-1.5 leading-tight">This will be your login credentials to manage the organization</p>
                                </div>
                                <div className="space-y-3.5">
                                    <div>
                                        <label className={labelClass}>Admin Name<span className="text-red-500">*</span></label>
                                        <input type="text" required placeholder="Full Name" value={formData.admin_name} onChange={(e) => setFormData({...formData, admin_name: e.target.value})} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Admin Email<span className="text-red-500">*</span></label>
                                        <input type="email" required placeholder="Email Address" value={formData.admin_email} onChange={(e) => setFormData({...formData, admin_email: e.target.value})} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Admin Phone</label>
                                        <input type="tel" placeholder="+1234567890" value={formData.admin_phone} onChange={(e) => setFormData({...formData, admin_phone: e.target.value})} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Password<span className="text-red-500">*</span></label>
                                        <input type="password" required placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Confirm Password<span className="text-red-500">*</span></label>
                                        <input type="password" required placeholder="Confirm Password" value={formData.confirm} onChange={(e) => setFormData({...formData, confirm: e.target.value})} className={inputClass} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Terms */}
                    <div className="pt-2">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                            <input type="checkbox" required checked={formData.agree} onChange={(e) => setFormData({...formData, agree: e.target.checked})} className="mt-[2px] w-[14px] h-[14px] text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500" />
                            <span className="text-[11.5px] font-medium text-gray-500 leading-tight">
                                I agree to the <Link to="/terms" className="text-blue-600 hover:text-blue-800 transition-colors">Terms and Conditions</Link> and <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-800 transition-colors">Privacy Policy</Link>
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={loading} className="w-full py-2.5 mt-2 bg-[#1e40af] text-white font-bold text-[13px] rounded-lg hover:bg-[#1e3a8a] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5 opacity-80">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Or continue with</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    {/* Google Button */}
                    <button 
                        type="button" 
                        onClick={handleGoogleAuth}
                        className="w-full py-2 bg-white border border-gray-200 text-[#374151] font-bold text-[13px] rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-3"
                    >
                         <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>
                    
                    <div className="text-center mt-6 pt-1 text-[13px]">
                         <span className="text-gray-500 font-medium">Already have an account? </span>
                         <Link to="/login" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">Sign In</Link>
                    </div>
                </form>
            </div>

            <div className="mt-8 mb-6">
                <Link to="/" className="text-[12px] font-medium text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1.5">
                    <span className="text-gray-400">←</span> Back to home
                </Link>
            </div>

        </div>
    );
}
