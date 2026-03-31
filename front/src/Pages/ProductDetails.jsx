import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import Navbar from '@/Components/UI/Navbar';
import { useCart } from '@/Context/CartContext';

export default function ProductDetails() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart, cart } = useCart();

    const isInCart = cart.some(item => item.id === product?.id);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${slug}`);
                setProduct(res.data);
                // Also fetch exams (could be a separate endpoint or part of product load)
                const examRes = await api.get('/exams');
                setExams(examRes.data.filter(e => e.product_id === res.data.id || !e.product_id));
            } catch (err) {
                console.error("Failed to fetch product", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">Loading...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">Product not found.</div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
            <Navbar />
            
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
                                <div className="p-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 rounded-b-3xl">
                                    <div className="text-3xl font-black text-primary dark:text-blue-400 mb-6">${product.price}</div>
                                    <button 
                                        onClick={() => addToCart(product)}
                                        disabled={isInCart}
                                        className={`w-full py-4 text-lg mb-4 rounded-2xl font-bold transition-all ${
                                            isInCart 
                                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                                            : 'btn-primary'
                                        }`}
                                    >
                                        {isInCart ? 'Already in Cart' : 'Add to Cart'}
                                    </button>
                                    <p className="text-sm text-center text-slate-500 dark:text-slate-400">Instant Digital Access</p>
                                </div>
                            </div>
                        </div>

                        {/* Product Content & Exams */}
                        <div className="flex-1">
                            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">
                                <Link to="/test-bank" className="hover:text-primary dark:hover:text-blue-400 transition-colors">Test Bank</Link>
                                <span>/</span>
                                <span className="text-slate-900 dark:text-slate-300 font-bold">{product.category?.name}</span>
                            </nav>
                            
                            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight">{product.name}</h1>
                            
                            <div className="prose prose-slate dark:prose-invert max-w-none mb-16">
                                <h3 className="text-xl font-bold mb-4 dark:text-white">Description</h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                    Comprehensive practice material designed to help you master {product.category?.name}. 
                                    Includes thousands of questions with detailed rationales and explanations for every answer choice.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                    <svg className="w-6 h-6 text-primary dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                    Available Mock Exams
                                </h2>
                                <div className="space-y-4">
                                    {exams.map(exam => (
                                        <div key={exam.id} className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 dark:hover:border-blue-500/30 hover:bg-primary/5 dark:hover:bg-blue-500/5 transition-all group">
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{exam.title}</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">{exam.question_count || 100} Questions • Interactive Mode</p>
                                            </div>
                                            <Link 
                                                to={`/exams/${exam.id}`}
                                                className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-primary dark:hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                            >
                                                Start Exam
                                            </Link>
                                        </div>
                                    ))}
                                    {exams.length === 0 && (
                                        <p className="text-center text-slate-500 dark:text-slate-400 py-6 italic">No active exams available for this product yet.</p>
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
