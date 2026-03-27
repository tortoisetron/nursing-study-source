import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/UI/Navbar';

export default function Dashboard({ auth }) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Head title="Personal Dashboard" />
            
            <Navbar auth={auth} />
            
            <main className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 mb-2">Welcome back, {auth.user.name}!</h1>
                            <p className="text-slate-600">Track your progress and continue your journey to nursing success.</p>
                        </div>
                        <Link href="/test-bank" className="btn-primary">Browse New Exams</Link>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid md:grid-cols-4 gap-6 mb-12 text-center">
                        {[
                            { label: 'Exams Taken', val: '12', color: 'text-primary' },
                            { label: 'Avg Score', val: '84%', color: 'text-accent' },
                            { label: 'Questions Solved', val: '1,240', color: 'text-slate-900' },
                            { label: 'Study Hours', val: '45h', color: 'text-primary-light' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                                <div className="text-slate-500 text-xs font-black uppercase mb-2 tracking-widest">{stat.label}</div>
                                <div className={`text-4xl font-black ${stat.color}`}>{stat.val}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Recent Activity */}
                        <div className="lg:col-span-2 space-y-8">
                            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Recent Exam Attempts
                            </h3>
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                                <div className="p-6 divide-y divide-slate-100">
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className="py-6 flex items-center justify-between first:pt-0 last:pb-0">
                                            <div>
                                                <h4 className="font-bold text-slate-900">Pathophysiology Mock Exam {4-i}</h4>
                                                <p className="text-sm text-slate-500">March {26-i}, 2024 • 75 Questions</p>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <div className="text-lg font-black text-accent">85%</div>
                                                    <div className="text-xs font-bold text-accent/60 uppercase">Passed</div>
                                                </div>
                                                <Link href="#" className="p-3 bg-slate-50 rounded-xl hover:bg-primary/10 hover:text-primary transition-all">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Side Sidebar */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                Quick Start
                            </h3>
                            <div className="bg-gradient-to-br from-primary to-primary-light p-8 rounded-3xl text-white shadow-xl shadow-primary/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                <h4 className="text-xl font-bold mb-4 relative z-10">Daily Practice Challenge</h4>
                                <p className="text-white/80 mb-8 relative z-10">Boost your score with 10 random questions from your weak areas.</p>
                                <button className="w-full py-4 bg-white text-primary font-black rounded-2xl shadow-lg relative z-10 hover:bg-slate-50 transition-all">Start Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
