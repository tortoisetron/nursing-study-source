import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '@/Components/UI/Navbar';
import ProductCard from '@/Components/UI/ProductCard';
import { useState, useEffect } from 'react';

export default function TestBank({ auth, categories, products, initialCategory }) {
    const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category?.slug === selectedCategory));
        }
    }, [selectedCategory, products]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Head title="Test Bank - Nursing Exam Source" />
            
            <Navbar auth={auth} />
            
            <main className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="mb-12">
                        <h1 className="text-4xl font-black text-slate-900 mb-4">Nursing Test Bank</h1>
                        <p className="text-lg text-slate-600">Explore our comprehensive collection of nursing exam prep materials.</p>
                    </header>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar Filters */}
                        <aside className="w-full lg:w-64 shrink-0">
                            <div className="sticky top-32 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                                    Categories
                                </h3>
                                <div className="space-y-2">
                                    <button 
                                        onClick={() => setSelectedCategory('all')}
                                        className={`w-full text-left px-4 py-2.5 rounded-xl transition-all font-medium ${selectedCategory === 'all' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        All Categories
                                    </button>
                                    {categories.map(cat => (
                                        <button 
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.slug)}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl transition-all font-medium ${selectedCategory === cat.slug ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Product Grid */}
                        <div className="flex-1">
                            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                            
                            {filteredProducts.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                                    <div className="text-4xl mb-4">📚</div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">No test banks found</h3>
                                    <p className="text-slate-500">Try selecting a different category or browsing all resources.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
