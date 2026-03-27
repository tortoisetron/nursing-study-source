import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <div className="card-premium group overflow-hidden">
            <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                    src={product.image_url || 'https://placehold.co/300x400?text=Test+Bank'} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <button className="w-full btn-primary py-2 text-sm">Add to Cart</button>
                </div>
            </div>
            <div className="p-5">
                <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">
                    {product.category?.name || 'Category'}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 leading-snug h-12">
                    {product.name}
                </h3>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-black text-primary">${product.price}</span>
                    <Link to={`/test-bank/${product.slug}`} className="text-primary-light font-bold text-sm hover:underline">View Details</Link>
                </div>
            </div>
        </div>
    );
}
