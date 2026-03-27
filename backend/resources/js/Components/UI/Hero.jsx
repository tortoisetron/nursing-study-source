export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-primary uppercase bg-primary/10 rounded-full">
                            #1 Nursing Test Bank Source
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-8">
                            Ace Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Nursing Exams</span> with Confidence
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                            Unlock over 10,000+ interactive practice questions, detailed rationales, and comprehensive study guides designed by nursing experts.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="btn-primary text-lg px-8 py-4">
                                Get Started Today
                            </button>
                            <button className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
                                View Test Banks
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>
                        <img 
                            src="https://placehold.co/600x600?text=Nursing+Students+Success" 
                            alt="Nursing Students" 
                            className="rounded-3xl shadow-2xl border-8 border-white transform hover:rotate-2 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
