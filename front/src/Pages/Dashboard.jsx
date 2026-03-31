import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import Navbar from '@/Components/UI/Navbar';

import { useAuth } from '@/Context/AuthContext';

export default function Dashboard() {
    const { user, loading: authLoading } = useAuth();
    const [stats, setStats] = useState({
        exams_taken: '0',
        avg_score: '0%',
        questions_solved: '0',
        study_hours: '0h'
    });
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        if (!authLoading && user) {
            const fetchDashboardData = async () => {
                try {
                    const statsRes = await api.get('/user/stats');
                    setStats(statsRes.data);
                } catch (err) {
                    console.error("Failed to fetch dashboard content", err);
                } finally {
                    setLoadingStats(false);
                }
            };
            fetchDashboardData();
        }
    }, [user, authLoading]);

    if (authLoading || loadingStats) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) return null; // ProtectedRoute will handle redirect

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
            <Navbar />
            
            <main className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white transition-colors mb-2">Welcome back, {user.name}!</h1>
                            <p className="text-slate-600 dark:text-slate-300 transition-colors">Track your progress and continue your journey to academic success.</p>
                        </div>
                        <Link to="/test-bank" className="btn-primary">Browse New Exams</Link>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid md:grid-cols-4 gap-6 mb-12 text-center">
                        {[
                            { label: 'Exams Taken', val: stats.exams_taken, color: 'text-primary dark:text-blue-400' },
                            { label: 'Avg Score', val: stats.avg_score, color: 'text-accent dark:text-emerald-400' },
                            { label: 'Questions Solved', val: stats.questions_solved, color: 'text-slate-900 dark:text-white' },
                            { label: 'Study Hours', val: stats.study_hours, color: 'text-primary-light dark:text-blue-300' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:shadow-md">
                                <div className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase mb-2 tracking-widest transition-colors">{stat.label}</div>
                                <div className={`text-4xl font-black ${stat.color} transition-colors`}>{stat.val}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Recent Activity */}
                        <div className="lg:col-span-2 space-y-8">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 transition-colors">
                                <svg className="w-6 h-6 text-primary dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Recent Exam Attempts
                            </h3>
                            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
                                <div className="p-6 divide-y divide-slate-100 dark:divide-slate-800">
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className="py-6 flex items-center justify-between first:pt-0 last:pb-0">
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white transition-colors">Pathophysiology Mock Exam {4-i}</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-300 transition-colors">March {26-i}, 2024 • 75 Questions</p>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <div className="text-lg font-black text-accent dark:text-emerald-400">85%</div>
                                                    <div className="text-xs font-bold text-accent/60 dark:text-emerald-400/60 uppercase">Passed</div>
                                                </div>
                                                <Link to="#" className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-primary/10 dark:hover:bg-blue-900/30 hover:text-primary dark:hover:text-blue-400 transition-all">
                                                    <svg className="w-5 h-5 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                         {/* Side Sidebar */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 transition-colors">
                                <svg className="w-6 h-6 text-primary dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
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
