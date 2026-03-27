import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/Components/UI/Navbar';

export default function Results() {
    const location = useLocation();
    const { exam, answers, questions } = location.state || {};

    if (!exam || !questions) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">No results found.</div>;
    }

    // Calculate score
    const correctAnswers = questions.filter(q => answers[q.id] === q.correct_option).length;
    const score = Math.round((correctAnswers / questions.length) * 100);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Navbar />
            
            <main className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full mb-6 border-8 ${score >= 75 ? 'border-accent/20 bg-accent text-white' : 'border-red-100 bg-red-500 text-white'}`}>
                            <span className="text-4xl font-black">{score}%</span>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 mb-4">
                            {score >= 75 ? 'Congratulations! You Passed' : 'Keep Practicing!'}
                        </h1>
                        <p className="text-lg text-slate-600">You completed the {exam.title} with a score of {score}%</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
                            <div className="text-slate-500 text-sm font-bold uppercase mb-2">Total Questions</div>
                            <div className="text-3xl font-black text-slate-900">{questions.length}</div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
                            <div className="text-slate-500 text-sm font-bold uppercase mb-2">Correct Answers</div>
                            <div className="text-3xl font-black text-accent">{correctAnswers}</div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
                            <div className="text-slate-500 text-sm font-bold uppercase mb-2">Time Taken</div>
                            <div className="text-3xl font-black text-primary">Completed</div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to={`/exams/${exam.id}`} className="btn-primary py-4 px-10 text-lg shadow-2xl">
                            Retake Exam
                        </Link>
                        <Link to="/dashboard" className="px-10 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-center">
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
