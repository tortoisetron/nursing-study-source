import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/UI/Navbar';

export default function ProductDetails({ auth, product, exams }) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Head title={`${product.name} - Nursing Exam Source`} />
            
            <Navbar auth={auth} />
            
            <main className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        {/* Product Image & Info */}
                        <div className="w-full lg:w-1/3">
                            <div className="card-premium overflow-hidden sticky top-32">
                                <img 
                                    src={product.image_url || 'https://placehold.co/400x600?text=Test+Bank'} 
                                    alt={product.name}
                                    className="w-full aspect-[3/4] object-cover"
                                />
                                <div className="p-8">
                                    <div className="text-3xl font-black text-primary mb-6">${product.price}</div>
                                    <button className="w-full btn-primary py-4 text-lg mb-4">Add to Cart</button>
                                    <p className="text-sm text-center text-slate-500">Instant Digital Access</p>
                                </div>
                            </div>
                        </div>

                        {/* Product Content & Exams */}
                        <div className="flex-1">
                            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                                <Link href="/test-bank" className="hover:text-primary transition-colors">Test Bank</Link>
                                <span>/</span>
                                <span className="text-slate-900 font-medium">{product.category?.name}</span>
                            </nav>
                            
                            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight">{product.name}</h1>
                            
                            <div className="prose prose-slate max-w-none mb-16">
                                <h3 className="text-xl font-bold mb-4">Description</h3>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Comprehensive practice material designed to help you master {product.category?.name}. 
                                    Includes thousands of questions with detailed rationales and explanations for every answer choice.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                    Available Mock Exams
                                </h2>
                                <div className="space-y-4">
                                    {exams.map(exam => (
                                        <div key={exam.id} className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all group">
                                            <div>
                                                <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{exam.title}</h4>
                                                <p className="text-sm text-slate-500">{exam.question_count || 100} Questions • Interactive Mode</p>
                                            </div>
                                            <Link 
                                                href={`/exams/${exam.id}`}
                                                className="px-6 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                                            >
                                                Start Exam
                                            </Link>
                                        </div>
                                    ))}
                                    {exams.length === 0 && (
                                        <p className="text-center text-slate-500 py-6 italic">No active exams available for this product yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
