import Navbar from '@/Components/UI/Navbar';
import Footer from '@/Components/UI/Footer';

export default function About() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar />
            
            <main className="pt-40 pb-32">
                <div className="max-w-4xl mx-auto px-4">
                    <header className="text-center mb-24">
                        <h1 className="text-5xl lg:text-6xl font-black text-slate-950 dark:text-white mb-8 leading-tight italic">Achievement through <span className="text-primary dark:text-blue-400 not-italic">Knowledge</span>.</h1>
                        <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                            To provide high-quality, accessible, and comprehensive academic study resources to help you excel.
                        </p>
                    </header>

                    <div className="grid md:grid-cols-2 gap-16 mb-32">
                        <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <h2 className="text-3xl font-black mb-6 text-primary dark:text-blue-400 uppercase tracking-tighter">Our Mission</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                To empower students globally with the materials they need to pass their exams with confidence and become the next generation of industry leaders.
                            </p>
                        </div>
                        <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <h2 className="text-3xl font-black mb-6 text-primary dark:text-blue-400 uppercase tracking-tighter">Our Vision</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                To be the leading global platform for academic education, set apart by our commitment to accuracy, relevance, and student success.
                            </p>
                        </div>
                    </div>

                    <section className="space-y-20">
                        <div className="text-center">
                            <h2 className="text-4xl font-black text-slate-950 mb-4">Why Choose Us</h2>
                            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-12"></div>
                            
                            <div className="grid sm:grid-cols-2 gap-8 text-left">
                                {[
                                    { t: "Expert Content", d: "Materials curated by expert educators and professionals." },
                                    { t: "Flexible Learning", d: "Access your resources anytime, anywhere, on any device." },
                                    { t: "Proven Results", d: "Trusted by thousands of students to achieve high exam scores." },
                                    { t: "Supportive Community", d: "Join a community dedicated to excellence in academic study." }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl hover:shadow-xl transition-all">
                                        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{item.t}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{item.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
