import { useCart } from '@/Context/CartContext';
import Navbar from '@/Components/UI/Navbar';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cart, removeFromCart, cartTotal } = useCart();

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-4 py-20">
                <h1 className="text-4xl font-black text-slate-900 mb-12">Your Learning Cart</h1>
                
                {cart.length === 0 ? (
                    <div className="bg-white p-20 rounded-3xl border border-slate-200 text-center shadow-sm">
                        <div className="text-6xl mb-6">🛒</div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
                        <p className="text-slate-500 mb-8 max-w-md mx-auto">
                            Looks like you haven't added any test banks yet. Start browsing to find the best resources for your nursing exams.
                        </p>
                        <Link to="/test-bank" className="btn-primary inline-block">
                            Browse Test Banks
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-primary/30 transition-all shadow-sm">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-28 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                            {item.image_url ? (
                                                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-4xl">📚</div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg mb-1">{item.name}</h3>
                                            <div className="text-primary font-bold">${item.price}</div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-3 text-slate-300 hover:text-rose-500 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl sticky top-24">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h3>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Subtotal</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600 border-b border-slate-100 pb-4">
                                        <span>Taxes</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="flex justify-between text-2xl font-black text-slate-900">
                                        <span>Total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="w-full btn-primary mb-4 py-4 text-xl">
                                    Secure Checkout
                                </button>
                                <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                    Encrypted & Secure Payment
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
