import Navbar from '@/Components/UI/Navbar';
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
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />
            
            <main className="pt-40 pb-32">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-start">
                        {/* Info Section */}
                        <div>
                            <h1 className="text-5xl lg:text-6xl font-black text-slate-950 mb-8 italic">Contact <span className="text-primary not-italic">Us</span></h1>
                            <p className="text-xl text-slate-600 font-medium leading-relaxed mb-12">
                                We're here to help you with any questions about our resources or your purchase.
                            </p>

                            <div className="space-y-10">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 bg-white rounded-3xl shadow-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📧</div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Email Support</div>
                                        <div className="text-xl font-bold text-slate-900">info@nursingexamsource.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 bg-white rounded-3xl shadow-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📞</div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Phone Line</div>
                                        <div className="text-xl font-bold text-slate-900">505-570-3017</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 bg-white rounded-3xl shadow-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📍</div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Our Location</div>
                                        <div className="text-xl font-bold text-slate-900">Available Nationwide • USA</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid sm:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:bg-white focus:border-primary transition-all outline-none font-bold"
                                            placeholder="Your name"
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
                                        <input 
                                            type="email" 
                                            required
                                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:bg-white focus:border-primary transition-all outline-none font-bold"
                                            placeholder="your@email.com"
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Subject</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:bg-white focus:border-primary transition-all outline-none font-bold"
                                        placeholder="How can we help?"
                                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Message</label>
                                    <textarea 
                                        rows="6"
                                        required
                                        className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:bg-white focus:border-primary transition-all outline-none font-bold"
                                        placeholder="Type your message here..."
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
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
        </div>
    );
}
