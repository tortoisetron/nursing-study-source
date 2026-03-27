import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import api from '@/utils/api';
import { useCart } from '@/Context/CartContext';

// ── Color palette from original nursingexamsource.com ──
const COLORS = {
    navBg: '#0F172A',       // slate-900 dark navy
    navBorder: '#1e293b',   // slate-800
    linkDefault: 'rgba(255,255,255,0.75)',
    linkHover: '#ffffff',
    searchBg: 'rgba(255,255,255,0.08)',
    searchBorder: 'rgba(255,255,255,0.15)',
    searchText: 'rgba(255,255,255,0.6)',
    searchKbd: 'rgba(255,255,255,0.12)',
    accent: '#2154D6',
    accentLight: '#3b82f6',
};

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { cart } = useCart();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            navigate(`/test-bank?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    useEffect(() => {
        api.get('/user')
            .then(res => setUser(res.data))
            .catch(() => setUser(null));
    }, []);

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
            icon: <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        },
        {
            to: '/online-test-bank', label: 'Online Test Bank',
            icon: <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        },
        {
            to: '/refund-policy', label: 'Refund Policy',
            icon: <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg>
        },
        {
            to: '/blog', label: 'Blog',
            icon: <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
        },
        {
            to: '/plans', label: 'Plans',
            icon: <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
        },
        {
            to: '/contact', label: 'Contact',
            icon: <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        },
    ];

    return (
        <>
            <nav style={{
                position: 'fixed',
                top: 0, left: 0, right: 0,
                height: '60px',
                background: COLORS.navBg,
                borderBottom: `1px solid ${COLORS.navBorder}`,
                boxShadow: '0 1px 0 rgba(255,255,255,0.05)',
                zIndex: 999,
                boxSizing: 'border-box',
                width: '100%',
                fontFamily: 'Poppins, ui-sans-serif, system-ui, sans-serif',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    boxSizing: 'border-box',
                    justifyContent: 'space-between',
                }}>

                    {/* LEFT: Logo */}
                    <Link to="/" style={{
                        display: 'flex', alignItems: 'center', gap: '9px',
                        textDecoration: 'none', flexShrink: 0,
                    }}>
                        <div style={{
                            width: '28px', height: '28px',
                            border: '1.5px solid rgba(255,255,255,0.2)',
                            borderRadius: '7px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '14px', background: 'rgba(255,255,255,0.07)',
                        }}>📖</div>
                        <span style={{
                            fontWeight: 700, fontSize: '13.5px',
                            color: '#ffffff',
                            whiteSpace: 'nowrap',
                            letterSpacing: '-0.01em',
                        }}>
                            Nursing Study Source
                        </span>
                    </Link>

                    {/* MIDDLE: Search + Nav links + ES */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '2px',
                        flex: 1, justifyContent: 'center', padding: '0 12px',
                    }}>
                        {/* Search pill */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: COLORS.searchBg,
                            border: `1px solid ${COLORS.searchBorder}`,
                            borderRadius: '9999px',
                            padding: '5px 11px',
                            width: '152px', flexShrink: 0,
                            marginRight: '6px',
                        }}>
                            <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,0.45)" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                style={{
                                    background: 'transparent', border: 'none', outline: 'none',
                                    fontSize: '12px', color: COLORS.linkDefault,
                                    flex: 1, minWidth: 0,
                                    fontFamily: 'inherit',
                                }}
                            />
                            <span style={{
                                fontSize: '9.5px', color: 'rgba(255,255,255,0.35)',
                                background: COLORS.searchKbd,
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '4px',
                                padding: '1px 5px', fontWeight: 600, flexShrink: 0,
                            }}>⌘K</span>
                        </div>

                        {/* Nav Links */}
                        {navLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} icon={link.icon} label={link.label} />
                        ))}

                        {/* ES language toggle */}
                        <span style={{
                            fontSize: '12px', fontWeight: 600,
                            color: COLORS.linkDefault,
                            padding: '5px 8px', cursor: 'pointer', flexShrink: 0,
                            letterSpacing: '0.02em',
                        }}>ES</span>
                    </div>

                    {/* RIGHT: User Avatar */}
                    <div style={{ position: 'relative', flexShrink: 0 }} ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            style={{
                                width: '32px', height: '32px',
                                borderRadius: '50%',
                                border: '1.5px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.08)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: 'rgba(255,255,255,0.8)', padding: 0,
                                transition: 'background 0.15s, border-color 0.15s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.14)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                            }}
                        >
                            {user?.name
                                ? <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                                : <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                            }
                        </button>

                        {dropdownOpen && (
                            <div style={{
                                position: 'absolute', right: 0, top: '42px',
                                background: '#fff', borderRadius: '14px',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
                                border: '1px solid #f3f4f6',
                                width: '196px', padding: '8px 0', zIndex: 9999,
                            }}>
                                {user ? (
                                    <>
                                        {[
                                            { to: '/cart', label: '🛒 Cart' },
                                            { to: '/profile', label: '👤 Profile' },
                                            { to: '/dashboard', label: '📚 My Resources' },
                                            { to: '/challenge', label: '🏆 Challenge Bank' },
                                        ].map((item) => (
                                            <DropdownItem key={item.to} to={item.to} label={item.label} onClick={() => setDropdownOpen(false)} />
                                        ))}
                                        <div style={{ borderTop: '1px solid #f3f4f6', margin: '4px 0' }}></div>
                                        <button onClick={() => setDropdownOpen(false)} style={{
                                            display: 'flex', alignItems: 'center',
                                            width: '100%', padding: '9px 18px',
                                            background: 'none', border: 'none', cursor: 'pointer',
                                            fontSize: '13px', color: '#ef4444', fontFamily: 'inherit',
                                            textAlign: 'left',
                                        }}>Logout</button>
                                    </>
                                ) : (
                                    <>
                                        <DropdownItem to="/login" label="Login" onClick={() => setDropdownOpen(false)} />
                                        <DropdownItem to="/onboarding" label="Try Now — Free" onClick={() => setDropdownOpen(false)} highlight />
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

function NavLink({ to, icon, label }) {
    const [hover, setHover] = useState(false);
    return (
        <Link
            to={to}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '5px 9px', fontSize: '12.5px', fontWeight: 500,
                color: hover ? '#ffffff' : 'rgba(255,255,255,0.72)',
                textDecoration: 'none', borderRadius: '7px',
                background: hover ? 'rgba(255,255,255,0.10)' : 'transparent',
                whiteSpace: 'nowrap', flexShrink: 0,
                transition: 'color 0.15s, background 0.15s',
                letterSpacing: '-0.005em',
            }}
        >
            <span style={{
                color: hover ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)',
                display: 'flex', alignItems: 'center',
                transition: 'color 0.15s',
            }}>{icon}</span>
            {label}
        </Link>
    );
}

function DropdownItem({ to, label, onClick, highlight }) {
    const [hover, setHover] = useState(false);
    return (
        <Link
            to={to}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                display: 'block', padding: '9px 18px',
                fontSize: '13px', fontWeight: highlight ? 600 : 400,
                color: highlight ? '#2154D6' : '#374151',
                textDecoration: 'none',
                background: hover ? '#f9fafb' : 'transparent',
                transition: 'background 0.15s',
            }}
        >
            {label}
        </Link>
    );
}
