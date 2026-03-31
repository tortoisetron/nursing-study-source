import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (err) {
            console.error('Failed to fetch categories', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name,
                slug: category.slug,
                description: category.description || ''
            });
        } else {
            setEditingCategory(null);
            setFormData({
                name: '',
                slug: '',
                description: ''
            });
        }
        setError(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await api.put(`/crm/categories/${editingCategory.id}`, formData);
            } else {
                await api.post('/crm/categories', formData);
            }
            setIsModalOpen(false);
            fetchCategories();
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to save category';
            const errors = err.response?.data?.errors;
            if (errors) {
                setError(Object.values(errors).flat().join(' '));
            } else {
                setError(msg);
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure? This may affect products in this category.')) {
            try {
                await api.delete(`/crm/categories/${id}`);
                fetchCategories();
            } catch (err) {
                alert('Failed to delete category');
            }
        }
    };

    // Auto-generate slug from name
    const handleNameChange = (e) => {
        const name = e.target.value;
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        setFormData({ ...formData, name, slug });
    };

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Product Categories</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">Organize your test banks into logical groups</p>
                    </div>
                    <button 
                        onClick={() => handleOpenModal()}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-emerald-600/20"
                    >
                        + Create Category
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {categories.map((cat) => (
                            <div key={cat.id} className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors shadow-sm">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{cat.name}</h3>
                                    <p className="text-slate-500 text-sm mt-0.5">Slug: <span className="text-slate-400 dark:text-slate-500 font-mono">{cat.slug}</span></p>
                                    {cat.description && <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">{cat.description}</p>}
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => handleOpenModal(cat)}
                                        className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-white transition-colors text-sm font-bold underline decoration-slate-300 dark:decoration-slate-600 underline-offset-4"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(cat.id)}
                                        className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors text-sm font-bold"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                        {categories.length === 0 && (
                            <div className="text-center py-20 bg-slate-900/50 border border-dashed border-slate-700 rounded-2xl">
                                <div className="text-4xl mb-4">📂</div>
                                <h3 className="text-xl font-bold text-slate-400">No categories yet</h3>
                                <p className="text-slate-500 mt-2">Create your first category to start adding products</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transition-all duration-300">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{editingCategory ? 'Edit Category' : 'Create New Category'}</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm font-bold">
                                    {error}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-1.5">Category Name</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="e.g. Advanced Nursing"
                                    value={formData.name}
                                    onChange={handleNameChange}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors text-slate-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-1.5">URL Slug</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="advanced-nursing"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors font-mono text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-1.5">Description (Optional)</label>
                                <textarea 
                                    rows="3"
                                    placeholder="Describe this category..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors resize-none text-slate-900 dark:text-white"
                                ></textarea>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-white font-bold py-2.5 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition-colors"
                                >
                                    {editingCategory ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
