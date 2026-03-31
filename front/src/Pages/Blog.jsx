import Navbar from '@/Components/UI/Navbar';
import Footer from '@/Components/UI/Footer';
import { Link } from 'react-router-dom';

export default function Blog() {
    const posts = [
        { id: 1, title: "How to Build an Effective Study Plan for Any Subject", date: "March 24, 2026", cat: "Study Guide", excerpt: "Preparing for exams doesn't have to be overwhelming. Follow our structured plan to master your coursework..." },
        { id: 2, title: "Maximizing the Value of Academic Test Banks", date: "March 20, 2026", cat: "Tips & Tricks", excerpt: "Simply having a test bank is not enough. You need the right strategy to understand complex concepts..." },
        { id: 3, title: "Preparing for Professional Certifications: What to Expect", date: "March 15, 2026", cat: "Career", excerpt: "Whether you're in healthcare, law, or finance, understanding exam requirements is key to success..." }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar />
            <main className="pt-40 pb-32">
                <div className="max-w-7xl mx-auto px-4 text-center mb-24">
                    <h1 className="text-5xl lg:text-7xl font-black text-slate-950 dark:text-white mb-8 italic">Study <span className="text-primary dark:text-blue-400 not-italic">Blog</span></h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-bold max-w-2xl mx-auto">Latest insights, study tips, and educational trends.</p>
                </div>

                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
                            <div className="h-64 bg-slate-200 dark:bg-slate-800"></div> {/* Placeholder for image */}
                            <div className="p-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-4 py-1.5 bg-primary/10 dark:bg-blue-500/10 text-primary dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full">{post.cat}</span>
                                    <span className="text-slate-400 dark:text-slate-500 text-xs font-bold">{post.date}</span>
                                </div>
                                <h2 className="text-2xl font-black text-slate-950 dark:text-white mb-6 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors leading-tight">
                                    {post.title}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                                    {post.excerpt}
                                </p>
                                <Link to={`/blog/${post.id}`} className="text-primary dark:text-blue-400 font-black text-sm uppercase tracking-widest hover:underline flex items-center gap-2">
                                    Read Full Post
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
