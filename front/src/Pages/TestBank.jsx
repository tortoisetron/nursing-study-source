import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '@/Components/UI/Navbar';
import Footer from '@/Components/UI/Footer';
import ProductCard from '@/Components/UI/ProductCard';
import { useState, useEffect } from 'react';
import api from '@/utils/api';

export default function TestBank() {
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'all';

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, prodRes] = await Promise.all([
                    api.get('/categories'),
                    api.get('/products')
                ]);
                setCategories(catRes.data);
                setProducts(prodRes.data);
            } catch (err) {
                console.error("Failed to fetch data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const searchQuery = searchParams.get('search')?.toLowerCase() || '';
        
        let result = products;
        
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category?.slug === selectedCategory);
        }
        
        if (searchQuery) {
            result = result.filter(p => 
                p.name.toLowerCase().includes(searchQuery) || 
                p.description.toLowerCase().includes(searchQuery)
            );
        }
        
        setFilteredProducts(result);
    }, [selectedCategory, products, searchParams]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
            <Navbar />
            
            <main className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="mb-16">
                        <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">Study Test Banks</h1>
                        <p className="text-xl text-slate-500 dark:text-slate-300 font-bold italic transition-colors">Find your next study asset.</p>
                    </header>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar Filters */}
                        <aside className="w-full lg:w-64 shrink-0">
                            <div className="sticky top-32 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                                <h3 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                                    Categories
                                </h3>
                                <div className="space-y-2">
                                    <button 
                                        onClick={() => setSelectedCategory('all')}
                                        className={`w-full text-left px-4 py-2.5 rounded-xl transition-all font-medium ${selectedCategory === 'all' ? 'bg-primary text-white shadow-md' : 'text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'}`}
                                    >
                                        All Categories
                                    </button>
                                    {categories.map(cat => (
                                        <button 
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.slug)}
                                            className={`w-full text-left px-4 py-2.5 rounded-xl transition-all font-medium ${selectedCategory === cat.slug ? 'bg-primary text-white shadow-md' : 'text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'}`}
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
                                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                                    <div className="text-4xl mb-4">📚</div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">No test banks found</h3>
                                    <p className="text-slate-500 dark:text-slate-300 transition-colors">Try selecting a different category or browsing all resources.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
