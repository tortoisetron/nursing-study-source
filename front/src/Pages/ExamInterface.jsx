import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import Navbar from '@/Components/UI/Navbar';

export default function ExamInterface() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showRationale, setShowRationale] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3600);
    const [isFinished, setIsFinished] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const res = await api.get(`/exams/${id}`);
                setExam(res.data.exam);
                setQuestions(res.data.questions);
                setTimeLeft(res.data.exam.timer * 60 || 3600);
            } catch (err) {
                console.error("Failed to fetch exam", err);
            } finally {
                setLoading(false);
            }
        };
        fetchExam();
    }, [id]);

    const question = questions[currentIndex];

    useEffect(() => {
        if (!loading && timeLeft <= 0) {
            submitExam();
            return;
        }
        if (!loading && !isFinished) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft, loading, isFinished]);

    const handleAnswer = (optionIndex) => {
        if (isFinished) return;
        setAnswers({ ...answers, [question.id]: optionIndex });
        setShowRationale(true);
    };

    const submitExam = async () => {
        setIsFinished(true);
        try {
            await api.post(`/exams/${id}/submit`, { answers });
            navigate('/results', { state: { exam, answers, questions } });
        } catch (err) {
            console.error("Submission failed", err);
            // Fallback for demo navigation
            navigate('/results', { state: { exam, answers, questions } });
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">Loading Exam...</div>;
    if (!exam || !questions.length) return <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">Exam not found.</div>;

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-100 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-xl font-black text-primary">Phungashang</Link>
                        <div className="h-6 w-px bg-slate-200"></div>
                        <h2 className="font-bold text-slate-700 truncate max-w-xs">{exam.title}</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 font-mono text-xl font-bold text-slate-900 bg-slate-100 px-4 py-1.5 rounded-xl">
                            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {formatTime(timeLeft)}
                        </div>
                        <button 
                            onClick={submitExam}
                            className="btn-primary py-2 px-6"
                        >
                            Finish Exam
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-20">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between text-sm text-slate-500 mb-2">
                            <span>Question {currentIndex + 1} of {questions.length}</span>
                            <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}% Complete</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-primary transition-all duration-300" 
                                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Question Card */}
                    {question && (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-slate-900 mb-8 leading-relaxed">
                                    {question.question_text}
                                </h3>
                                
                                <div className="space-y-4">
                                    {(typeof question.options === 'string' ? JSON.parse(question.options) : question.options).map((option, idx) => {
                                        const isSelected = answers[question.id] === idx;
                                        const isCorrect = idx === question.correct_option;
                                        
                                        return (
                                            <button 
                                                key={idx}
                                                onClick={() => handleAnswer(idx)}
                                                disabled={showRationale && answers[question.id] !== undefined}
                                                className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-start gap-4 ${
                                                    showRationale && isCorrect 
                                                        ? 'border-accent bg-accent/5 text-slate-900' 
                                                        : showRationale && isSelected && !isCorrect
                                                            ? 'border-red-500 bg-red-50 text-slate-900'
                                                            : isSelected
                                                                ? 'border-primary bg-primary/5 text-primary'
                                                                : 'border-slate-100 hover:border-slate-300 text-slate-600'
                                                }`}
                                            >
                                                <span className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center font-bold text-sm ${
                                                    showRationale && isCorrect
                                                        ? 'bg-accent text-white'
                                                        : showRationale && isSelected && !isCorrect
                                                            ? 'bg-red-500 text-white'
                                                            : isSelected
                                                                ? 'bg-primary text-white'
                                                                : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                    {String.fromCharCode(65 + idx)}
                                                </span>
                                                <span className="font-semibold text-lg">{option}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Rationale Section */}
                            {showRationale && answers[question.id] !== undefined && (
                                <div className={`p-8 border-t transition-all ${answers[question.id] === question.correct_option ? 'bg-accent/5 border-accent/20' : 'bg-red-50 border-red-100'}`}>
                                    <h4 className="font-black mb-2 flex items-center gap-2">
                                        {answers[question.id] === question.correct_option 
                                            ? <><svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Correct Answer</>
                                            : <><svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg> Incorrect Answer</>
                                        }
                                    </h4>
                                    <div className="text-slate-700 leading-relaxed font-medium">
                                        <span className="font-bold">Rationale:</span> {question.rationale}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center">
                        <button 
                            onClick={() => {
                                setCurrentIndex(prev => prev - 1);
                                setShowRationale(answers[questions[currentIndex - 1]?.id] !== undefined);
                            }}
                            disabled={currentIndex === 0}
                            className="px-8 py-3 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 disabled:opacity-50 transition-all hover:bg-slate-50 shadow-sm"
                        >
                            Previous
                        </button>
                        
                        {currentIndex < questions.length - 1 ? (
                            <button 
                                onClick={() => {
                                    setCurrentIndex(prev => prev + 1);
                                    setShowRationale(answers[questions[currentIndex + 1]?.id] !== undefined);
                                }}
                                className="btn-primary"
                            >
                                Next Question
                            </button>
                        ) : (
                            <button onClick={submitExam} className="btn-primary">
                                Finish Exam
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
