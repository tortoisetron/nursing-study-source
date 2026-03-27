import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/UI/Navbar';
import Hero from '@/Components/UI/Hero';
import ProductCard from '@/Components/UI/ProductCard';

export default function Welcome({ auth, products, categories }) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Head title="Nursing Exam Source - #1 Nursing Test Bank" />
            
            <Navbar auth={auth} />
            
            <main>
                <Hero />
                
                {/* Categories Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Browse by Category</h2>
                            <p className="text-slate-600">Choose your area of study to see relevant test banks and mock exams.</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {categories?.map((category) => (
                                <Link 
                                    key={category.id} 
                                    href={`/test-bank?category=${category.slug}`}
                                    className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl font-semibold text-slate-700 hover:border-primary hover:text-primary transition-all shadow-sm"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div className="max-w-xl">
                                <h2 className="text-4xl font-bold text-slate-900 mb-4">Popular Test Banks</h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Our most trusted resources, updated for 2024 to ensure you have the latest information.
                                </p>
                            </div>
                            <Link href="/test-bank" className="text-primary font-bold hover:underline mb-2 flex items-center gap-2">
                                View All Resources
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </Link>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products?.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* CTA Section */}
                <section className="py-24 bg-primary text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-1/2"></div>
                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <h2 className="text-4xl lg:text-5xl font-black mb-8">Ready to Pass Your Exams?</h2>
                        <p className="text-xl text-white/80 mb-12 leading-relaxed">
                            Join thousands of nursing students who use our platform daily to prepare for their NCLEX and final exams.
                        </p>
                        <Link href={route('register')} className="inline-block px-10 py-5 bg-white text-primary font-bold text-xl rounded-2xl shadow-2xl hover:bg-slate-50 transition-colors transform hover:-translate-y-1">
                            Start Your Free Trial
                        </Link>
                    </div>
                </section>
            </main>
            
            <footer className="bg-slate-900 text-slate-400 py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="text-white text-2xl font-black mb-8">NursingExamSource</div>
                    <div className="flex justify-center gap-8 mb-12">
                        <Link href="#" className="hover:text-white transition-colors">About</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                    <p className="text-sm">&copy; {new Date().getFullYear()} NursingExamSource. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
