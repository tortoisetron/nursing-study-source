import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Orders() {
    const [orders] = useState([
        { id: '#8842', name: 'Alex Johnson', email: 'alex@example.com', amount: '$59.95', status: 'Completed', date: '2024-03-27' },
        { id: '#8841', name: 'Maria Garcia', email: 'maria@example.com', amount: '$99.99', status: 'Completed', date: '2024-03-26' },
        { id: '#8840', name: 'James Wilson', email: 'james@example.com', amount: '$59.95', status: 'Pending', date: '2024-03-26' },
        { id: '#8839', name: 'Sarah Miller', email: 'sarah@example.com', amount: '$300.00', status: 'Completed', date: '2024-03-25' }
    ]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans tracking-tight">
            <aside className="fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 z-50">
                <div className="p-8">
                    <Link to="/" className="text-2xl font-black text-white flex items-center gap-2 mb-12">
                        <div className="w-8 h-8 bg-primary rounded-lg"></div>
                        <span>CRM Panel</span>
                    </Link>
                    <nav className="space-y-2">
                        <Link to="/" className="flex items-center gap-3 p-4 text-slate-400 hover:text-white hover:bg-slate-800 transition-all font-medium rounded-xl">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                            Dashboard
                        </Link>
                        <Link to="/orders" className="flex items-center gap-3 p-4 bg-primary/10 text-primary border-l-4 border-primary font-bold rounded-r-xl">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            Orders
                        </Link>
                    </nav>
                </div>
            </aside>

            <main className="ml-64 p-8">
                <header className="mb-12 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2">Order Management</h1>
                        <p className="text-slate-500 font-bold">Track and manage student transactions.</p>
                    </div>
                    <button className="btn-primary py-3 px-6 text-sm">Export CSV</button>
                </header>

                <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                        <thead className="bg-slate-800/50 text-slate-500 uppercase tracking-widest font-black text-xs">
                            <tr>
                                <th className="px-8 py-6">Order</th>
                                <th className="px-8 py-6">Customer</th>
                                <th className="px-8 py-6">Date</th>
                                <th className="px-8 py-6">Amount</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {orders.map((order, i) => (
                                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-8 py-6 font-bold text-primary">{order.id}</td>
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-white">{order.name}</div>
                                        <div className="text-xs text-slate-500">{order.email}</div>
                                    </td>
                                    <td className="px-8 py-6 text-slate-400">{order.date}</td>
                                    <td className="px-8 py-6 font-black text-emerald-500">{order.amount}</td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="text-slate-500 hover:text-white transition-colors">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
