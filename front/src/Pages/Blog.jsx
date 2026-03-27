import Navbar from '@/Components/UI/Navbar';
import { Link } from 'react-router-dom';

export default function Blog() {
    const posts = [
        { id: 1, title: "30-Day NCLEX Study Plan: Your Path to Success", date: "March 24, 2026", cat: "Study Guide", excerpt: "Preparing for the NCLEX doesn't have to be overwhelming. Follow our structured 30-day plan..." },
        { id: 2, title: "How to Use NCLEX Test Banks Effectively", date: "March 20, 2026", cat: "Tips & Tricks", excerpt: "Simply having a test bank is not enough. You need a strategy to master the rationales..." },
        { id: 3, title: "NCLEX-RN vs NCLEX-PN: Key Differences Explained", date: "March 15, 2026", cat: "Career", excerpt: "Understanding the difference in exam scope and practice requirements is crucial for candidates..." }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />
            <main className="pt-40 pb-32">
                <div className="max-w-7xl mx-auto px-4 text-center mb-24">
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-950 mb-8 italic">Nursing <span className="text-primary not-italic">Blog</span></h1>
                    <p className="text-xl text-slate-600 font-bold max-w-2xl mx-auto">Latest insights, study tips, and nursing trends.</p>
                </div>

                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
                            <div className="h-64 bg-slate-200"></div> {/* Placeholder for image */}
                            <div className="p-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">{post.cat}</span>
                                    <span className="text-slate-400 text-xs font-bold">{post.date}</span>
                                </div>
                                <h2 className="text-2xl font-black text-slate-950 mb-6 group-hover:text-primary transition-colors leading-tight">
                                    {post.title}
                                </h2>
                                <p className="text-slate-500 font-medium leading-relaxed mb-10">
                                    {post.excerpt}
                                </p>
                                <Link to={`/blog/${post.id}`} className="text-primary font-black text-sm uppercase tracking-widest hover:underline flex items-center gap-2">
                                    Read Full Post
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
