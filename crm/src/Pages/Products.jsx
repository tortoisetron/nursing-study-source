import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category_id: '',
        price: '',
        description: '',
        image_url: '',
        file_path: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [prodRes, catRes] = await Promise.all([
                api.get('/products'),
                api.get('/categories')
            ]);
            setProducts(prodRes.data);
            setCategories(catRes.data);
        } catch (err) {
            console.error('Failed to fetch data', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                category_id: product.category_id,
                price: product.price,
                description: product.description,
                image_url: product.image_url || '',
                file_path: product.file_path || ''
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                category_id: categories[0]?.id || '',
                price: '',
                description: '',
                image_url: '',
                file_path: ''
            });
        }
        setError(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await api.put(`/crm/products/${editingProduct.id}`, formData);
            } else {
                await api.post('/crm/products', formData);
            }
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to save product';
            const errors = err.response?.data?.errors;
            if (errors) {
                setError(Object.values(errors).flat().join(' '));
            } else {
                setError(msg);
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/crm/products/${id}`);
                fetchData();
            } catch (err) {
                alert('Failed to delete product');
            }
        }
    };

    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Products</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your test banks and study materials</p>
                    </div>
                    <button 
                        onClick={() => handleOpenModal()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-blue-600/20"
                    >
                        + Add New Product
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-6 flex items-center gap-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                                <div className="w-20 h-24 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                                    {product.image_url ? (
                                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500">No Image</div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{product.category?.name || 'Uncategorized'}</span>
                                            <h3 className="text-xl font-bold mt-1 text-slate-900 dark:text-white">{product.name}</h3>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-1 mt-1">{product.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">${product.price}</div>
                                            <div className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">ID: #{product.id}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 mt-4">
                                        <button 
                                            onClick={() => handleOpenModal(product)}
                                            className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors"
                                        >
                                            Edit Details
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(product.id)}
                                            className="text-sm font-bold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transition-all duration-300">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm font-bold">
                                    {error}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">Product Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition-colors text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-sm font-bold text-slate-500 dark:text-slate-400">Category</label>
                                        <a href="/categories" className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-bold">Manage Categories</a>
                                    </div>
                                    <select 
                                        required
                                        value={formData.category_id}
                                        onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition-colors text-slate-900 dark:text-white"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">Price (USD)</label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition-colors text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">Description</label>
                                <textarea 
                                    required
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition-colors resize-none text-slate-900 dark:text-white"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">Image URL</label>
                                <input 
                                    type="text" 
                                    value={formData.image_url}
                                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition-colors text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-white font-bold py-2 rounded-lg transition-colors text-center border border-slate-200 dark:border-slate-700"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors text-center"
                                >
                                    {editingProduct ? 'Update Product' : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
