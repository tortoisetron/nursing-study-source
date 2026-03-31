import Navbar from '@/Components/UI/Navbar';
import Footer from '@/Components/UI/Footer';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent! (Demo mode)");
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar />

            <main className="pt-40 pb-32">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-start">
                        {/* Info Section */}
                        <div>
                            <h1 className="text-6xl font-black text-slate-950 dark:text-white mb-6 italic tracking-tight">Contact <span className="text-primary dark:text-blue-400 not-italic">Us</span></h1>
                            <p className="text-xl text-slate-600 dark:text-slate-300 font-bold leading-relaxed mb-12">
                                We're here to help you with any questions about our resources or your purchase.
                            </p>

                            <div className="space-y-10">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 bg-white rounded-3xl shadow-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📧</div>
                                    <div>
                                        <div className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Email Support</div>
                                        <div className="text-xl font-bold text-slate-900 dark:text-white">info@phungashang.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 bg-white rounded-3xl shadow-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📞</div>
                                    <div>
                                        <div className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Phone Line</div>
                                        <div className="text-xl font-bold text-slate-900 dark:text-white">505-570-3017</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 bg-white rounded-3xl shadow-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📍</div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Our Location</div>
                                        <div className="text-xl font-bold text-slate-900 dark:text-white">Available Nationwide • IN</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 shadow-xl border-2 border-slate-100 dark:border-slate-800">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-50 dark:border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-primary dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-bold"
                                            placeholder="Your name"
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-50 dark:border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-primary dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-bold"
                                            placeholder="your@email.com"
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Subject</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-50 dark:border-slate-800 rounded-2xl px-6 py-4 outline-none focus:border-primary dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-bold"
                                        placeholder="How can we help?"
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Message</label>
                                    <textarea
                                        rows="6"
                                        className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-50 dark:border-slate-800 rounded-3xl px-6 py-5 outline-none focus:border-primary dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-bold resize-none"
                                        placeholder="Type your message here..."
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full btn-primary py-5 text-xl font-black">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
