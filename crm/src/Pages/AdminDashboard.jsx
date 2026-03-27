import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        total_users: 0,
        total_exams: 0,
        total_sales: 0,
        active_sessions: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/admin/stats');
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch admin stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-sans tracking-tight">Accessing Database...</div>;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans tracking-tight">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 z-50">
                <div className="p-8">
                    <div className="text-2xl font-black text-white flex items-center gap-2 mb-12">
                        <div className="w-8 h-8 bg-primary rounded-lg"></div>
                        <span>CRM Panel</span>
                    </div>
                    
                    <nav className="space-y-2">
                        <Link to="/" className="flex items-center gap-3 p-4 bg-primary/10 text-primary border-l-4 border-primary font-bold rounded-r-xl">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                            Dashboard
                        </Link>
                        <Link to="/exams" className="flex items-center gap-3 p-4 text-slate-400 hover:text-white hover:bg-slate-800 transition-all font-medium rounded-xl">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                            Exams
                        </Link>
                        <Link to="/users" className="flex items-center gap-3 p-4 text-slate-400 hover:text-white hover:bg-slate-800 transition-all font-medium rounded-xl">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 01-9-3.812M13.978 9.86a4.414 4.414 0 115.292 5.292"/></svg>
                            Students
                        </Link>
                        <Link to="/orders" className="flex items-center gap-3 p-4 text-slate-400 hover:text-white hover:bg-slate-800 transition-all font-medium rounded-xl">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            Orders
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Header */}
            <header className="fixed top-0 left-64 right-0 h-20 bg-slate-900 border-b border-slate-800 z-40 px-8 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">System Overview</h2>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-slate-400">Admin</span>
                    <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-700"></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="ml-64 pt-20 p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Registered Students', val: stats.total_users, color: 'text-blue-500' },
                        { label: 'Active Exams', val: stats.total_exams, color: 'text-purple-500' },
                        { label: 'Total Revenue', val: `$${stats.total_sales}`, color: 'text-emerald-500' },
                        { label: 'Live Sessions', val: stats.active_sessions, color: 'text-orange-500' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
                            <div className="text-slate-500 text-xs font-black uppercase mb-4 tracking-widest">{stat.label}</div>
                            <div className={`text-4xl font-black ${stat.color}`}>{stat.val}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
                        <div className="p-8 border-b border-slate-800 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">Recent Purchases</h3>
                            <Link to="/orders" className="text-primary text-sm font-bold hover:underline">View All</Link>
                        </div>
                        <div className="p-0">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-800/50 text-slate-500 uppercase tracking-widest font-black">
                                    <tr>
                                        <th className="px-8 py-4">Order ID</th>
                                        <th className="px-8 py-4">Customer</th>
                                        <th className="px-8 py-4">Amount</th>
                                        <th className="px-8 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {[
                                        { id: '#8842', name: 'Alex Johnson', amount: '$59.95', status: 'Completed' },
                                        { id: '#8841', name: 'Maria Garcia', amount: '$99.99', status: 'Completed' },
                                        { id: '#8840', name: 'James Wilson', amount: '$59.95', status: 'Pending' }
                                    ].map((order, i) => (
                                        <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="px-8 py-4 font-bold text-slate-400">{order.id}</td>
                                            <td className="px-8 py-4 text-white">{order.name}</td>
                                            <td className="px-8 py-4 font-black text-emerald-500">{order.amount}</td>
                                            <td className="px-8 py-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tight ${order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Controls */}
                    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-8">Clinical Controls</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="p-6 bg-slate-800 rounded-2xl border border-slate-700 text-center hover:bg-primary/20 hover:border-primary/50 transition-all group">
                                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">➕</div>
                                <div className="text-sm font-bold">New Exam</div>
                            </button>
                            <button className="p-6 bg-slate-800 rounded-2xl border border-slate-700 text-center hover:bg-purple-500/20 hover:border-purple-500/50 transition-all group">
                                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📊</div>
                                <div className="text-sm font-bold">Global Stats</div>
                            </button>
                            <button className="p-6 bg-slate-800 rounded-2xl border border-slate-700 text-center hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all group">
                                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💰</div>
                                <div className="text-sm font-bold">Sales Report</div>
                            </button>
                            <button className="p-6 bg-slate-800 rounded-2xl border border-slate-700 text-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all group">
                                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">⚙️</div>
                                <div className="text-sm font-bold">Settings</div>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
