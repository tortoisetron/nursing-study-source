import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    const isPlaceholder = !product.id || typeof product.id === 'string';
    const tag = product.tag || (isPlaceholder ? 'Bestseller' : 'Featured');

    return (
        <div className="group overflow-hidden relative border border-gray-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 shadow-sm hover:shadow-xl hover:shadow-blue-900/10 rounded-2xl bg-white dark:bg-slate-900 flex flex-col h-full transition-all duration-300">
            {/* Tag/Badge at the top */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md shadow-md shadow-blue-600/30">
                {tag}
            </div>

            {/* Image / Book wrapper */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-800 dark:to-slate-950 p-6 flex items-center justify-center">
                {/* Book styling effect */}
                <div className="w-[85%] h-[90%] relative group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500 shadow-[10px_20px_30px_-10px_rgba(30,58,138,0.3)]">
                    {/* The Book Spine/Cover */}
                    <div className="absolute inset-0 z-10 rounded-r-lg rounded-l-sm border-l-[8px] border-[#0f172a]/90 dark:border-slate-800 overflow-hidden transform perspective-1000 rotateY-[-5deg]">
                        <img 
                            src={product.image_url || `https://placehold.co/400x550/1e3a8a/FFFFFF?text=${encodeURIComponent(product.name || product.title || 'Test Bank')}`}
                            alt={product.name || product.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Book gradient overlay to give it a 3D cylindrical spine effect */}
                        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 via-white/10 to-transparent"></div>
                    </div>
                </div>
                
                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 z-30">
                    <button className="w-full py-3.5 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-blue-700">
                        Quick Add to Cart
                    </button>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-1 border-t border-gray-100 dark:border-slate-800">
                <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mb-2.5 uppercase tracking-widest">
                    {product.category?.name || product.category || 'Books'}
                </div>
                <h3 className="font-bold text-[#111827] dark:text-white text-lg mb-3 line-clamp-2 leading-snug flex-1">
                     {product.name || product.title}
                </h3>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-black text-[#111827] dark:text-white drop-shadow-sm">${product.price || '59.95'}</span>
                    <Link to={`/test-bank/${product.slug || product.id || ''}`} className="text-blue-600 dark:text-blue-300 font-bold text-sm tracking-wide hover:text-blue-800 dark:hover:text-blue-200 transition-colors flex items-center gap-1 group/link">
                        View Details
                        <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
