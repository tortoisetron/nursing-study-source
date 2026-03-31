import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '@/utils/api';
import Navbar from '@/Components/UI/Navbar';
import ProductCard from '@/Components/UI/ProductCard';
import Footer from '@/Components/UI/Footer';

export default function Welcome() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prodRes = await api.get('/products');
                setProducts(prodRes.data);
            } catch (err) {
                setProducts([]);
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Split products for two rails if available, else just use placeholders
    const topRowProducts = products.slice(0, 4);
    const bottomRowProducts = products.slice(3, 7);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-50/40 to-white dark:from-slate-900/40 dark:to-slate-950 pt-16 pb-24 px-4 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/30 dark:bg-blue-900/10 rounded-bl-[100px] -z-10"></div>
                    <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
                        {/* Left text */}
                        <div className="flex-1 max-w-xl xl:max-w-2xl px-4 lg:px-8">
                            <h1 className="text-5xl lg:text-[4rem] font-extrabold text-[#111827] dark:text-white leading-[1.1] mb-8 tracking-tight">
                                Real Test Banks. Real Questions. <br className="hidden lg:block" />
                                <span className="text-blue-700 dark:text-blue-400 italic font-black">Real Results.</span>
                            </h1>
                            <p className="text-gray-700 dark:text-slate-200 text-[1.1rem] leading-relaxed mb-6 font-medium transition-colors">
                                Crafted specifically for students aiming for top grades, our high-quality test banks offer a reliable and accurate way to check your understanding and prepare for exams.
                            </p>
                            <p className="text-gray-600 dark:text-slate-400 text-[1.05rem] leading-relaxed mb-10 transition-colors">
                                Whether you're tackling sciences, humanities, or core courses, our guide is your ultimate companion to pass smarter, stay ahead, and reach your goals faster.
                            </p>
                        </div>

                        {/* Right image */}
                        <div className="flex-1 w-full max-w-2xl px-4">
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1663047392930-7c1c31d7b785?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Student Studying"
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Students Choose Us */}
                <section className="bg-blue-50 dark:bg-slate-900 py-16 px-4 border-y border-blue-100 dark:border-slate-800">
                    <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
                        <div className="flex items-center gap-4 mb-10">
                            <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] dark:text-white">Why Students Choose Us</h2>
                            <div className="h-1 flex-1 max-w-[100px] bg-blue-600 rounded-full hidden sm:block"></div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm text-blue-600 dark:text-blue-400 border border-transparent dark:border-slate-700 transition-colors">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                </div>
                                <div className="max-w-xs">
                                    <h3 className="text-[1.1rem] font-bold text-[#111827] dark:text-white mb-2 transition-colors">Proven High Success Rate</h3>
                                    <p className="text-gray-600 dark:text-slate-400 text-[0.95rem] leading-relaxed transition-colors">Used by thousands of students to pass their exams with ease.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm text-blue-600 dark:text-blue-400 border border-transparent dark:border-slate-700 transition-colors">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                </div>
                                <div className="max-w-xs">
                                    <h3 className="text-[1.1rem] font-bold text-[#111827] dark:text-white mb-2 transition-colors">Reliable Materials</h3>
                                    <p className="text-gray-600 dark:text-slate-400 text-[0.95rem] leading-relaxed transition-colors">Stay current with the latest study templates and curriculum resources.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm text-blue-600 dark:text-blue-400 border border-transparent dark:border-slate-700 transition-colors">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                                </div>
                                <div className="max-w-xs">
                                    <h3 className="text-[1.1rem] font-bold text-[#111827] dark:text-white mb-2 transition-colors">Cost-Effective Pricing</h3>
                                    <p className="text-gray-600 dark:text-slate-400 text-[0.95rem] leading-relaxed transition-colors">Competitive pricing for high-quality, comprehensive study materials.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Test Banks - Row 1 */}
                {topRowProducts.length > 0 && (
                    <section className="bg-white dark:bg-slate-950 py-20 px-4">
                        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-2">Featured Test Banks</h2>
                                <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                    {[1, 2, 3, 4].map(i => <div key={i} className="bg-gray-100 rounded-xl h-[400px] animate-pulse"></div>)}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                    {(topRowProducts).map((product, i) => (
                                        <ProductCard key={product.id || i} product={product} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Designed for High-Pressure Programs */}
                <section className="relative w-full bg-white dark:bg-slate-950 overflow-hidden py-16 md:py-24 min-h-[600px] flex items-center border-t border-gray-100 dark:border-slate-800 transition-colors duration-300">
                    {/* Background Image (Right side with fade mask) */}
                    <div className="absolute inset-y-0 right-0 w-full md:w-[65%] lg:w-[60%] z-0">
                        {/* Soft white gradient fading from the left to seamlessly blend the image */}
                        <div className="absolute inset-y-0 left-0 w-full md:w-[60%] bg-gradient-to-r from-white dark:from-slate-950 via-white/90 dark:via-slate-950/90 to-transparent z-10 pointer-events-none transition-colors duration-300"></div>

                        {/* Mobile overlay to ensure text is readable if image stacks */}
                        <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 md:hidden z-10"></div>

                        <img
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000&q=80"
                            alt="Students Studying Together"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    {/* Content Container */}
                    <div className="relative z-20  mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="w-full md:w-[60%] lg:w-[50%] pr-0 lg:pr-8 py-8">

                            {/* Top Section */}
                            <h2 className="text-[#0B2A51] dark:text-blue-200 text-2xl sm:text-3xl lg:text-[32px] font-bold mb-8">
                                Designed for High-Pressure Programs
                            </h2>

                             <ul className="space-y-4 mb-16">
                                {[
                                    'General Studies & Humanities',
                                    'Health Sciences & Allied Health',
                                    'Biology & Anatomy/Physiology',
                                    'Pharmacology & Certification Prep'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-800 dark:text-slate-200 font-semibold text-[15px] sm:text-[16px] transition-colors">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                                            <svg
                                                className="w-4 h-4 text-blue-600 dark:text-blue-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={3}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Bottom Section */}
                            <h2 className="text-[#0B2A51] dark:text-blue-200 text-2xl sm:text-3xl lg:text-[32px] font-bold mb-5">
                                Study With Confidence (and Integrity)
                            </h2>

                             <div className="flex flex-col space-y-3">
                                <p className="italic text-slate-600 dark:text-slate-400 text-[15px] sm:text-[16px] transition-colors">
                                    Ethical resources to reinforce learning & exam readiness.
                                </p>
                                <p className="text-slate-900 dark:text-slate-100 text-[15px] sm:text-[16px] transition-colors">
                                    Thousands of students use test banks as a <span className="text-blue-700 dark:text-blue-400 font-extrabold decoration-blue-500/30 underline-offset-4 underline">smart supplement.</span>
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Featured Test Banks - Row 2 */}
                {bottomRowProducts.length > 0 && (
                    <section className="bg-white dark:bg-slate-950 py-20 px-4">
                        <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-2xl font-bold text-[#111827] dark:text-white mb-2">Featured Test Banks</h2>
                                <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                    {[1, 2, 3, 4].map(i => <div key={i} className="bg-gray-100 rounded-xl h-[400px] animate-pulse"></div>)}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                    {(bottomRowProducts).map((product, i) => (
                                        <ProductCard key={product.id || i} product={product} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* What Students Say */}

                <section className="relative w-full bg-white dark:bg-slate-950 overflow-hidden py-16 md:py-24 min-h-[600px] flex items-center transition-colors duration-300">
                    {/* Background Image (Right side with fade mask) */}
                    <div className="absolute inset-y-0 right-0 w-full md:w-[65%] lg:w-[60%] z-0">
                        {/* Soft white gradient fading from the left to seamlessly blend the image */}
                        <div className="absolute inset-y-0 left-0 w-full md:w-1/2 bg-gradient-to-r from-white dark:from-slate-950 via-white/80 dark:via-slate-950/80 to-transparent z-10 pointer-events-none transition-colors duration-300"></div>

                        {/* Mobile overlay to ensure text is readable if image stacks */}
                        <div className="absolute inset-0 bg-white/60 dark:bg-slate-950/60 md:hidden z-10"></div>

                        <img
                            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000&q=80"
                            alt="Students Studying"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    {/* Content Container */}
                    <div className="relative z-20  mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="w-full md:w-[60%] lg:w-[50%] pr-0 lg:pr-8">

                            <h2 className="text-[#0B2A51] dark:text-blue-200 text-3xl font-bold mb-10">
                                What Students Say
                            </h2>

                            {/* Testimonial Card 1 */}
                            <div
                                className="relative mb-8"
                            >
                                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8 relative z-10 shadow-lg dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                                    <div className="flex items-start">
                                        <div className="text-[#1A4B84] dark:text-blue-400 text-5xl font-serif font-bold leading-[0.6] mr-4 pt-2">
                                            “
                                        </div>
                                        <div>
                                            <p className="text-gray-800 dark:text-slate-200 font-medium text-[15px] sm:text-[16px] leading-relaxed mb-4">
                                                The questions were almost identical in difficulty to my exam. The rationales made everything click. ”
                                            </p>
                                            <p className="text-gray-500 dark:text-slate-400 text-[13px] sm:text-sm font-medium">
                                                — University Student, California
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Right Arrow Pointer (Hidden on small screens) */}
                                <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-900 rotate-45 z-0 border-r border-t border-slate-100 dark:border-slate-800"></div>
                            </div>

                            {/* Testimonial Card 2 */}
                            <div
                                className="relative"
                            >
                                <div className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8 relative z-10 shadow-lg dark:shadow-none border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                                    <div className="flex items-start">
                                        <div className="text-[#1A4B84] dark:text-blue-400 text-5xl font-serif font-bold leading-[0.6] mr-4 pt-2">
                                            “
                                        </div>
                                        <div>
                                            <p className="text-gray-800 dark:text-slate-200 font-medium text-[15px] sm:text-[16px] leading-relaxed mb-4">
                                                I stopped wasting time and finally knew what to focus on. My grades jumped fast. ”
                                            </p>
                                            <p className="text-gray-500 dark:text-slate-400 text-[13px] sm:text-sm font-medium">
                                                — Health Sciences Major
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Right Arrow Pointer (Hidden on small screens) */}
                                <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-900 rotate-45 z-0 border-r border-t border-slate-100 dark:border-slate-800"></div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Final Call to Action CTA */}
                <section className="bg-blue-600 py-12 px-4 text-center">
                    <Link to="/test-bank" className="inline-block px-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-xl shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:bg-orange-600 transition-all transform hover:scale-105">
                        Start Studying Smarter Now
                    </Link>
                </section>

                {/* FAQs */}
                <section className="bg-slate-50 dark:bg-slate-900 py-20 px-4">
                    <div className="max-w-[800px] mx-auto text-center">
                        <div className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-xs rounded-full mb-4">FAQs</div>
                        <h2 className="text-3xl font-extrabold text-[#111827] dark:text-white mb-6">Test Bank FAQs</h2>
                        <p className="text-gray-600 dark:text-slate-300 leading-relaxed text-[1.05rem] mb-12 transition-colors">
                            Have questions? We are ready to help! Here are a few commonly asked questions.
                            Our team is dedicated to providing you the best experience to ensure your educational success.
                            <span className="block mt-4 text-blue-600 dark:text-blue-400 font-semibold">
                                If you still need help after reading this FAQ, please don't hesitate to reach out to our support team!
                            </span>
                        </p>

                        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm text-center">
                            <button className="w-full py-5 px-6 font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                                See All Questions and Answers
                            </button>
                        </div>
                    </div>
                </section>

                {/* Request a Test Bank */}
                <section className="bg-blue-50 dark:bg-slate-900 py-20 px-4 mt-8">
                    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 max-w-xl">
                            <h2 className="text-3xl font-bold text-[#111827] dark:text-white mb-4 transition-colors">Looking for a specific test bank!</h2>
                            <p className="text-gray-700 dark:text-slate-200 text-[1.1rem] leading-relaxed mb-6 transition-colors">
                                If you can't find what you're looking for, let us know. We'll help you find the exact resource you need for your course.
                            </p>
                            <Link to="/contact" className="inline-block px-8 py-3 bg-[#0f172a] dark:bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-slate-800 dark:hover:bg-blue-500 transition-all shadow-md">
                                Request missing Test Bank
                            </Link>
                        </div>
                        <div className="flex-1 w-full flex justify-end">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl w-full max-w-lg space-y-4 border border-slate-100 dark:border-slate-700">
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="First Name" className="w-full border-2 border-gray-100 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors bg-gray-50 dark:bg-slate-900 dark:text-white" />
                                    <input type="text" placeholder="Last Name" className="w-full border-2 border-gray-100 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors bg-gray-50 dark:bg-slate-900 dark:text-white" />
                                </div>
                                <input type="email" placeholder="Student Email Address" className="w-full border-2 border-gray-100 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors bg-gray-50 dark:bg-slate-900 dark:text-white" />
                                <textarea placeholder="Test block name or ASIN, course info, etc" rows="4" className="w-full border-2 border-gray-100 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors bg-gray-50 dark:bg-slate-900 dark:text-white resize-none"></textarea>
                                <button className="w-full py-4 bg-blue-600 text-white font-bold text-[1.05rem] rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/30">
                                    Submit Request
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom Legal Disclaimer */}
                <section className="bg-[#fffbeb] dark:bg-[#2d2514] border-t border-[#fef3c7] dark:border-slate-800 py-6 px-6 text-[#92400e] dark:text-[#fbbf24] transition-colors duration-300">
                    <div className="max-w-[1440px] mx-auto flex gap-4 items-start">
                        <div className="flex-shrink-0 mt-0.5">
                            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <div className="flex-1 text-[12px] leading-relaxed">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-extrabold uppercase tracking-widest">Legal Disclaimer</span>
                                <span className="bg-[#fef3c7] dark:bg-[#b45309]/30 text-[#b45309] dark:text-[#fbbf24] px-2 py-0.5 rounded-full text-[10px] font-black">Important Notice</span>
                            </div>
                            <p className="mb-1 leading-relaxed">
                                The content provided on <strong>Phungashang</strong> is for educational and informational purposes only. All practice questions, study materials, and resources are designed to support learning and exam preparation.
                                We do not guarantee that the materials are complete, error-free, or identical to any official examination. Phungashang is <strong>not affiliated with or endorsed by</strong> any licensing board, testing authority, or educational institution.
                            </p>
                            <p>
                                Users are responsible for verifying information and using it appropriately. We are <strong>not liable</strong> for any outcomes resulting from the use of this website.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
