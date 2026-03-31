import Navbar from '@/Components/UI/Navbar';

export default function Pricing() {
    const plans = [
        {
            name: "Monthly Plan",
            price: "59.95",
            period: "30 DAYS • MONTHLY",
            features: ["Full Question Bank Access", "Detailed Rationales", "Performance Analytics", "Instant Access"],
            buttonText: "Subscribe Now",
            isPopular: false
        },
        {
            name: "Bi-Monthly Plan",
            price: "99.99",
            period: "60 DAYS • ONE-TIME",
            features: ["All Monthly Features", "Extended Access", "Priority Support", "Challenge Bank"],
            buttonText: "Subscribe Now",
            isPopular: true
        },
        {
            name: "Annual Plan",
            price: "300.00",
            period: "365 DAYS • ONE-TIME",
            features: ["Ultimate Prep Suite", "All Question Banks", "Full 1-Year Access", "Highest Value"],
            buttonText: "Subscribe Now",
            isPopular: false
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar />
            <main className="pt-40 pb-32">
                <div className="max-w-7xl mx-auto px-4">
                    <header className="text-center mb-24">
                        <h1 className="text-5xl lg:text-7xl font-black text-slate-950 dark:text-white mb-8 italic">Choose Your <span className="text-primary dark:text-blue-400 not-italic">Success Plan</span></h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 font-bold max-w-2xl mx-auto">Flexible options to fit your study schedule and budget.</p>
                    </header>

                    <div className="grid lg:grid-cols-3 gap-10">
                        {plans.map((plan, i) => (
                            <div key={i} className={`relative p-12 rounded-[3.5rem] bg-white dark:bg-slate-900 border-2 ${plan.isPopular ? 'border-primary dark:border-blue-500 shadow-2xl scale-105 z-10' : 'border-slate-100 dark:border-slate-800 shadow-xl'} transition-all hover:translate-y-[-8px]`}>
                                {plan.isPopular && (
                                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-primary text-white px-8 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-xl">
                                        MOST POPULAR
                                    </div>
                                )}
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Active Access</span>
                                </div>
                                <h3 className="text-3xl font-black mb-2 text-slate-900 dark:text-white">{plan.name}</h3>
                                <div className="text-slate-400 dark:text-slate-500 font-black text-xs uppercase tracking-widest mb-10">{plan.period}</div>
                                
                                <div className="flex items-baseline gap-1 mb-12">
                                    <span className="text-6xl font-black text-slate-950 dark:text-white">${plan.price}</span>
                                    <span className="text-slate-400 dark:text-slate-500 font-bold">USD</span>
                                </div>

                                <ul className="space-y-6 mb-12">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-4 text-slate-600 dark:text-slate-300 font-medium">
                                            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 ${plan.isPopular ? 'bg-primary dark:bg-blue-600 text-white hover:bg-primary-dark shadow-primary/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                                    {plan.buttonText}
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
