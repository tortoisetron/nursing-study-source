import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import api from '@/utils/api';
import { useCart } from '@/Context/CartContext';
import { useAuth } from '@/Context/AuthContext';
import { useTheme } from '@/Context/ThemeContext';
import ThemeToggle from '../ThemeToggle';


export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showBanner, setShowBanner] = useState(true);
    const { cart } = useCart();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/test-bank?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    /* Auth state handled by Context */

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const navLinks = [
        {
            to: '/test-bank', label: 'Test Bank',
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        },
        {
            to: '/online-test-bank', label: 'Online Test Bank',
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
        },
        {
            to: '/refund-policy', label: 'Refund Policy',
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
        },
        {
            to: '/blog', label: 'Blog',
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
        },
        {
            to: '/plans', label: 'Plans',
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg>
        },
        {
            to: '/contact', label: 'Contact',
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        },
    ];

    return (
        <div className="font-sans antialiased">
            <header className="sticky top-0 left-0 right-0 z-[1000]">
                {/* Headline Bar */}
                {/* <div className="bg-[#1e3a8a] dark:bg-[#0f172a] text-white text-center py-2.5 px-5 text-sm font-bold tracking-wide transition-colors duration-300">
                    Pass Smarter. Study Faster. Stress Less.
                </div> */}

                {/* Main Navbar */}
                <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-sm h-[76px] transition-colors duration-300">
                    <div className="flex items-center h-full mx-auto px-6 justify-between">
                        {/* Left: Logo */}
                        <Link to="/" className="flex items-center gap-2 no-underline flex-shrink-0 group">
                            <div className="w-8 h-8 text-blue-700 dark:text-blue-500 flex items-center justify-center transition-transform group-hover:scale-110">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <span className="font-black text-lg text-slate-900 dark:text-white whitespace-nowrap tracking-tight transition-colors duration-300">
                                Phungashang
                            </span>
                        </Link>

                        {/* Middle: Links + Search */}
                        <div className="hidden xl:flex items-center gap-1 flex-1 justify-center px-6">
                            {/* Search Bar */}
                            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full py-2 px-4 w-[180px] mr-3 transition-colors duration-300">
                                <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearch}
                                    className="bg-transparent border-none outline-none text-[13.5px] text-slate-900 dark:text-white flex-1 min-w-0 placeholder-slate-500 dark:placeholder-slate-400 transition-colors duration-300"
                                />
                            </div>

                            {/* Links */}
                            {navLinks.map((link) => (
                                <NavLink key={link.to} to={link.to} icon={link.icon} label={link.label} />
                            ))}
                        </div>

                        {/* Right: User / Auth */}
                        <div className="flex items-center gap-4 flex-shrink-0">
                            <ThemeToggle />
                            {user ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center cursor-pointer transition-colors duration-300"
                                    >
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{user.name.charAt(0).toUpperCase()}</span>
                                    </button>
                                    {dropdownOpen && (
                                        <div className="absolute right-0 top-[46px] bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-800 w-[200px] py-2 z-[9999] transition-all animate-in fade-in slide-in-from-top-2">
                                            <DropdownItem to="/dashboard" label="Dashboard" />
                                            <DropdownItem to="/cart" label="Cart" />
                                            <div className="border-t border-gray-100 dark:border-slate-800 my-1"></div>
                                            <button 
                                                onClick={logout}
                                                className="flex items-center w-full px-5 py-2.5 bg-none border-none cursor-pointer text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 text-left transition-colors font-semibold"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm font-semibold text-slate-600 dark:text-slate-200 no-underline flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
                                        Login
                                    </Link>
                                    <Link to="/register" className="bg-blue-700 dark:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-bold no-underline hover:bg-blue-800 dark:hover:bg-blue-600 transition-all shadow-md shadow-blue-600/10">
                                        Try Now
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            {/* Legal Disclaimer Banner (Yellow) - NON-STICKY */}
            {showBanner && (
                <div className="bg-[#fffbeb] dark:bg-[#2d2514] border-b border-gray-200 dark:border-slate-800 py-4 px-6 relative text-[#92400e] dark:text-[#fbbf24] z-0 transition-colors duration-300">
                    <div className="max-w-[1440px] mx-auto flex gap-4 items-start">
                        <div className="flex-shrink-0 mt-0.5">
                            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <div className="flex-1 text-[13px] leading-relaxed">
                           <div className="flex items-center gap-2 mb-2">
                                <span className="font-extrabold uppercase tracking-widest">Legal Disclaimer</span>
                                <span className="bg-[#fef3c7] dark:bg-[#b45309]/30 text-[#b45309] dark:text-[#fbbf24] px-2 py-0.5 rounded-full text-[11px] font-black">Important Notice</span>
                           </div>
                           <p className="mb-2">
                                The content provided on <strong>Phungashang</strong> is for educational and informational purposes only. All practice questions, study materials, and resources are designed to support learning and exam preparation.
                           </p>
                           <p className="mb-2">
                                We do not guarantee that the materials are complete, error-free, or identical to any official examination. Phungashang is <strong>not affiliated with or endorsed by</strong> any licensing board, testing authority, or educational institution.
                           </p>
                           <p>
                                Users are responsible for verifying information and using it appropriately. We are <strong>not liable</strong> for any outcomes resulting from the use of this website.
                           </p>
                        </div>
                        <button 
                            onClick={() => setShowBanner(false)}
                            className="bg-none border-none cursor-pointer p-1 text-[#d97706] hover:text-[#92400e] transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function NavLink({ to, icon, label }) {
    return (
        <Link
            to={to}
            className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold text-slate-600 dark:text-slate-200 no-underline rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group"
        >
            <span className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{icon}</span>
            {label}
        </Link>
    );
}

function DropdownItem({ to, label }) {
    return (
        <Link 
            to={to} 
            className="block px-5 py-2.5 text-sm text-slate-600 dark:text-slate-300 no-underline hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
        >
            {label}
        </Link>
    );
}
