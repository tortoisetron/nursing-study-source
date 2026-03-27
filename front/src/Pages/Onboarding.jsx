import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
    const [step, setStep] = useState(1);
    const [selection, setSelection] = useState({
        category: null,
        path: null
    });
    const navigate = useNavigate();

    const categories = [
        { id: 'nclex-rn', name: 'NCLEX-RN', icon: '🩺' },
        { id: 'nclex-pn', name: 'NCLEX-PN', icon: '💉' },
        { id: 'ati-teas', name: 'ATI TEAS', icon: '📚' },
        { id: 'hes-a2', name: 'HESI A2', icon: '🧪' }
    ];

    const paths = [
        { id: 'practice', name: 'Practice Tests', desc: 'Interactive exams with real-time feedback.', icon: '⚡' },
        { id: 'resources', name: 'Study Resources', desc: 'Downloadable PDF test banks and notes.', icon: '📄' }
    ];

    const nextStep = () => {
        if (step === 1 && selection.category) setStep(2);
        else if (step === 2 && selection.path) {
            if (selection.path === 'practice') navigate('/dashboard');
            else navigate('/test-bank');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 font-sans">
            <div className="max-w-2xl w-full">
                {/* Progress Bar */}
                <div className="flex gap-2 mb-12">
                    <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-primary shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-slate-800'}`}></div>
                    <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-primary shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-slate-800'}`}></div>
                </div>

                {step === 1 ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h1 className="text-4xl font-black mb-4 text-center bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            Let's tailor your preparation.
                        </h1>
                        <p className="text-slate-400 text-center mb-12 text-lg">Which nursing category are you focusing on?</p>
                        
                        <div className="grid grid-cols-2 gap-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelection({ ...selection, category: cat.id })}
                                    className={`p-8 rounded-3xl border-2 transition-all duration-300 text-left group ${
                                        selection.category === cat.id 
                                        ? 'border-primary bg-primary/10' 
                                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                                    }`}
                                >
                                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
                                    <div className="text-xl font-bold">{cat.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h1 className="text-4xl font-black mb-4 text-center bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            How do you prefer to study?
                        </h1>
                        <p className="text-slate-400 text-center mb-12 text-lg">Choose your preferred learning method.</p>
                        
                        <div className="space-y-4">
                            {paths.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => setSelection({ ...selection, path: p.id })}
                                    className={`w-full p-8 rounded-3xl border-2 transition-all duration-300 text-left flex items-center gap-6 group ${
                                        selection.path === p.id 
                                        ? 'border-primary bg-primary/10' 
                                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                                    }`}
                                >
                                    <div className="text-4xl group-hover:scale-110 transition-transform">{p.icon}</div>
                                    <div>
                                        <div className="text-xl font-bold">{p.name}</div>
                                        <div className="text-slate-400 text-sm">{p.desc}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-12 flex justify-between items-center">
                    {step === 2 && (
                        <button onClick={() => setStep(1)} className="text-slate-500 font-bold hover:text-white transition-colors">
                            ← Back
                        </button>
                    )}
                    <div className="flex-1"></div>
                    <button
                        disabled={(step === 1 && !selection.category) || (step === 2 && !selection.path)}
                        onClick={nextStep}
                        className={`px-12 py-4 rounded-2xl font-black text-lg transition-all ${
                            ((step === 1 && selection.category) || (step === 2 && selection.path))
                            ? 'bg-primary hover:bg-primary-light shadow-lg shadow-primary/30 active:scale-95'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                    >
                        {step === 1 ? 'Next Step' : 'Get Started'}
                    </button>
                </div>
            </div>
        </div>
    );
}
