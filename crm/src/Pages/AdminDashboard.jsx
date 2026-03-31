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

    if (loading) return <div className="text-slate-500 dark:text-white flex items-center justify-center h-96 font-sans tracking-tight">Accessing Database...</div>;

    return (
        <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Registered Students', val: stats.total_users, color: 'text-blue-500' },
                    { label: 'Active Exams', val: stats.total_exams, color: 'text-purple-500' },
                    { label: 'Total Revenue', val: `$${stats.total_sales}`, color: 'text-emerald-500' },
                    { label: 'Live Sessions', val: stats.active_sessions, color: 'text-orange-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl transition-colors duration-300">
                        <div className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase mb-4 tracking-widest">{stat.label}</div>
                        <div className={`text-4xl font-black ${stat.color}`}>{stat.val}</div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl transition-colors duration-300">
                    <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Purchases</h3>
                        <Link to="/orders" className="text-primary text-sm font-bold hover:underline">View All</Link>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase tracking-widest font-black">
                                <tr>
                                    <th className="px-8 py-4 text-[10px]">Order ID</th>
                                    <th className="px-8 py-4 text-[10px]">Customer</th>
                                    <th className="px-8 py-4 text-[10px]">Amount</th>
                                    <th className="px-8 py-4 text-[10px]">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {[
                                    { id: '#8842', name: 'Alex Johnson', amount: '$59.95', status: 'Completed' },
                                    { id: '#8841', name: 'Maria Garcia', amount: '$99.99', status: 'Completed' },
                                    { id: '#8840', name: 'James Wilson', amount: '$59.95', status: 'Pending' }
                                ].map((order, i) => (
                                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-8 py-4 font-bold text-slate-500 dark:text-slate-400">{order.id}</td>
                                        <td className="px-8 py-4 text-slate-900 dark:text-white font-medium">{order.name}</td>
                                        <td className="px-8 py-4 font-black text-emerald-600 dark:text-emerald-500">{order.amount}</td>
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
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl transition-colors duration-300">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Clinical Controls</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center hover:bg-blue-50 dark:hover:bg-primary/20 hover:border-blue-200 dark:hover:border-primary/50 transition-all group">
                            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">➕</div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">New Exam</div>
                        </button>
                        <button className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center hover:bg-purple-50 dark:hover:bg-purple-500/20 hover:border-purple-200 dark:hover:border-purple-500/50 transition-all group">
                            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📊</div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">Global Stats</div>
                        </button>
                        <button className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center hover:bg-emerald-50 dark:hover:bg-emerald-500/20 hover:border-emerald-200 dark:hover:border-emerald-500/50 transition-all group">
                            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💰</div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">Sales Report</div>
                        </button>
                        <Link to="/products" className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center hover:bg-orange-50 dark:hover:bg-orange-500/20 hover:border-orange-200 dark:hover:border-orange-500/50 transition-all group block">
                            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📚</div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white">Manage Books</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
