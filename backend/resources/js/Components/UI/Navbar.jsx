import { Link } from '@inertiajs/react';

export default function Navbar({ auth }) {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                            NursingExamSource
                        </Link>
                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/test-bank" className="text-slate-600 hover:text-primary transition-colors font-medium">Test Bank</Link>
                            <Link href="/exams" className="text-slate-600 hover:text-primary transition-colors font-medium">Online Exams</Link>
                            <Link href="/plans" className="text-slate-600 hover:text-primary transition-colors font-medium">Plans</Link>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="btn-primary py-2 px-5 text-sm">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-slate-600 hover:text-primary font-medium transition-colors">
                                    Login
                                </Link>
                                <Link href={route('register')} className="btn-primary py-2 px-5 text-sm">
                                    Try Now
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
