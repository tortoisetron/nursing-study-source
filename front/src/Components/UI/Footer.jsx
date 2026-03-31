import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-t border-gray-200 dark:border-slate-800 pt-16 pb-8 px-4 transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8 flex flex-col items-center lg:items-start lg:flex-row justify-between gap-12 font-medium">
                <div className="text-center lg:text-left">
                    <h3 className="font-extrabold text-[#111827] dark:text-white text-xl mb-3 tracking-wide">Phungashang</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-500 mb-6 max-w-xs">
                        Dedicated to providing the best study materials, practice questions and test resources available on the web for students and professionals.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24 text-sm">
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-[#111827] dark:text-white uppercase tracking-wider mb-2">Explore</h4>
                        <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link>
                        <Link to="/test-bank" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Test Bank</Link>
                        <Link to="/online-test-bank" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Online Test Bank</Link>
                        <Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-[#111827] dark:text-white uppercase tracking-wider mb-2">Support</h4>
                        <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Request A Test Bank</Link>
                        <Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link>
                    </div>
                    <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
                        <h4 className="font-bold text-[#111827] dark:text-white uppercase tracking-wider mb-2">Policies</h4>
                        <Link to="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
                        <Link to="/refund-policy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Refund Policy</Link>
                        <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms & Conditions</Link>
                        <Link to="/disclaimer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Disclaimer</Link>
                        <Link to="/sitemap" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 lg:px-8 mt-16 pt-8 border-t border-gray-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 dark:text-slate-500">
                <p>© {new Date().getFullYear()} Phungashang. All rights reserved.<br />No affiliation with publisher brands.</p>
                <div className="flex items-center gap-4 mt-4 md:mt-0 text-gray-500 dark:text-slate-400">
                    <a href="mailto:info@phungashang.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">info@phungashang.com</a>
                </div>
            </div>
        </footer>
    );
}
