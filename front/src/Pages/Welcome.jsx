import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import Navbar from '@/Components/UI/Navbar';
import ProductCard from '@/Components/UI/ProductCard';

export default function Welcome() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prodRes = await api.get('/products');
                setProducts(prodRes.data.slice(0, 6));
            } catch (err) {
                // Use placeholder data if API fails
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const faqs = [
        {
            q: "What is a test bank?",
            a: "A test bank is a collection of exam questions and answers, typically from the publisher of a textbook. It's used by instructors to create exams and by students as a powerful study tool to understand the material and prepare for tests."
        },
        {
            q: "How do I access my purchase?",
            a: "After completing your payment, you'll receive an immediate download link on the success page and via email. You can also access all your purchases from your student dashboard."
        },
        {
            q: "Are these for the latest editions?",
            a: "We strive to provide the most current study materials. Most of our resources are for the latest editions used in nursing programs across the US."
        }
    ];

    const features = [
        { title: "Comprehensive Coverage", desc: "Extensive collection of test banks and study guides.", icon: "📚" },
        { title: "High Success Rate", desc: "Used by thousands of students to pass their nursing exams.", icon: "📈" },
        { title: "Updated Material", desc: "Stay current with the latest nursing curriculum.", icon: "🔄" },
        { title: "Budget Friendly", desc: "Competitive pricing for high-quality study materials.", icon: "💰" }
    ];

    return (
        <div className="min-h-screen bg-white font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
            <Navbar />

            {/* Spacer for fixed navbar */}
            <div style={{ height: '60px' }}></div>

            <main>
                {/* Hero Section */}
                <section className="bg-white py-20 px-4">
                    <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                        {/* Left text */}
                        <div className="flex-1 max-w-xl">
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
                                Real Test Banks. Real Questions.{' '}
                                <span className="text-blue-700">Real Results.</span>
                            </h1>
                            <p className="text-gray-600 text-base leading-relaxed mb-8">
                                Comprehensive nursing study resources, practice exams, and test banks to help you excel in your studies and career.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    to="/onboarding"
                                    className="px-6 py-3 bg-blue-700 text-white font-bold text-sm rounded-lg hover:bg-blue-800 transition-all shadow-md"
                                >
                                    Try Now
                                </Link>
                                <Link
                                    to="/test-bank"
                                    className="px-6 py-3 bg-white text-gray-800 font-bold text-sm rounded-lg border border-gray-300 hover:border-blue-600 hover:text-blue-700 transition-all"
                                >
                                    Search Test Bank
                                </Link>
                            </div>
                        </div>

                        {/* Right image placeholder */}
                        <div className="flex-1 max-w-lg">
                            <div className="w-full h-64 lg:h-80 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-200">
                                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2a5 5 0 100 10A5 5 0 0012 2zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Students Choose Us */}
                <section className="bg-gray-50 py-16 px-4">
                    <div className="max-w-screen-xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Why Students Choose Us</h2>
                        <div className="w-12 h-1 bg-blue-700 mx-auto mb-10 rounded-full"></div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((f, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="text-3xl mb-3">{f.icon}</div>
                                    <h3 className="font-bold text-gray-900 text-sm mb-2">{f.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Test Banks */}
                <section className="bg-white py-14 px-4">
                    <div className="max-w-screen-xl mx-auto">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Featured Test Banks</h2>
                                <p className="text-gray-500 text-sm mt-1">
                                    Our most trusted resources, updated for 2024 to ensure you have the latest information.
                                </p>
                            </div>
                            <Link to="/test-bank" className="text-blue-700 text-sm font-semibold hover:underline flex items-center gap-1">
                                View All Resources
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                            </Link>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse"></div>
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            // Placeholder cards if API offline
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                {['Pathophysiology Test Bank', 'Advanced NUR', 'Human Disease Study Guide', 'NCLEX Review'].map((title, i) => (
                                    <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <div className="h-40 bg-blue-50 flex items-center justify-center">
                                            <div className="text-5xl">📗</div>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-xs font-semibold text-gray-800 mb-1 leading-snug">{title}</p>
                                            <p className="text-blue-700 font-bold text-sm mb-3">$59.95</p>
                                            <button className="w-full py-2 bg-blue-700 text-white text-xs font-bold rounded-lg hover:bg-blue-800 transition-all">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* What Students Say */}
                <section className="bg-gray-50 py-14 px-4">
                    <div className="max-w-screen-xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10 uppercase tracking-wide">What Students Say</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { name: "Sarah J.", role: "RN Graduate", text: "Passed my NCLEX on the first try! The rationales here are better than any textbook.", rating: 5 },
                                { name: "Michael T.", role: "Final Year Student", text: "The instant download is a lifesaver. High quality PDFs exactly what I needed.", rating: 5 },
                                { name: "Emma R.", role: "BSRN Student", text: "Finding the exact test bank for my Fundamentals class changed everything. 5 stars!", rating: 5 }
                            ].map((t, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                    <div className="flex text-yellow-400 mb-3">
                                        {[...Array(t.rating)].map((_, s) => <span key={s}>★</span>)}
                                    </div>
                                    <p className="text-gray-700 text-sm italic mb-4 leading-relaxed">"{t.text}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">{t.name[0]}</div>
                                        <div>
                                            <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                                            <div className="text-gray-400 text-xs">{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="bg-white py-14 px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Nursing Test Bank FAQs</h2>
                        <p className="text-center text-gray-500 text-sm mb-10">Common questions about our nursing study resources.</p>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="border border-gray-200 rounded-xl p-6">
                                    <h3 className="font-bold text-gray-900 mb-2 text-base">{faq.q}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Request a Test Bank CTA */}
                <section className="bg-blue-50 py-14 px-4">
                    <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-10">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">Looking for a specific Test Bank?</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                If you can't find what you're looking for, let us know. We add new resources regularly based on student requests.
                            </p>
                            <Link to="/contact" className="inline-block px-6 py-3 bg-blue-700 text-white font-bold text-sm rounded-lg hover:bg-blue-800 transition-all">
                                Submit a Request
                            </Link>
                        </div>
                        <div className="flex-1 max-w-sm w-full">
                            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-3">
                                <input type="text" placeholder="Name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors" />
                                <input type="email" placeholder="Email" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors" />
                                <input type="text" placeholder="Test bank name or ISBN" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors" />
                                <button className="w-full py-2.5 bg-blue-700 text-white font-bold text-sm rounded-lg hover:bg-blue-800 transition-all">
                                    Submit Request
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-blue-900 text-white pt-14 pb-8 px-4">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-10 mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 border-2 border-white/40 rounded-lg flex items-center justify-center text-sm">📖</div>
                                <span className="font-bold text-sm">Nursing Study Source</span>
                            </div>
                            <p className="text-blue-200 text-xs leading-relaxed">
                                info@nursingexamsource.com<br />
                                505-570-3017
                            </p>
                        </div>

                        {[
                            { title: 'Explore', links: [{ label: 'Test Bank', to: '/test-bank' }, { label: 'Online Test Bank', to: '/online-test-bank' }, { label: 'Plans', to: '/plans' }, { label: 'Blog', to: '/blog' }] },
                            { title: 'Support', links: [{ label: 'Contact', to: '/contact' }, { label: 'Refund Policy', to: '/refund-policy' }, { label: 'About Us', to: '/about' }] },
                            { title: 'Policy', links: [{ label: 'Privacy Policy', to: '/privacy-policy' }, { label: 'Terms & Conditions', to: '/terms' }, { label: 'Disclaimer', to: '/disclaimer' }] }
                        ].map((col, i) => (
                            <div key={i}>
                                <h4 className="font-bold text-xs uppercase tracking-widest mb-4 text-blue-100">{col.title}</h4>
                                <div className="flex flex-col gap-2">
                                    {col.links.map((link) => (
                                        <Link key={link.to} to={link.to} className="text-blue-300 hover:text-white text-xs transition-colors">{link.label}</Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-blue-800 pt-6 text-blue-400 text-xs text-center">
                        © {new Date().getFullYear()} Nursing Study Source. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
