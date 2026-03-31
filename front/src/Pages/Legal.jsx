import Navbar from '@/Components/UI/Navbar';
import Footer from '@/Components/UI/Footer';

export default function Legal({ title }) {
    const getContent = () => {
        if (title.includes("Refund")) {
            return (
                <>
                    <p className="mb-6">Due to the digital nature of our materials, including test banks and study guides, refunds are generally not provided once a digital product has been downloaded or the access credentials have been provided.</p>
                    <p className="mb-6">We encourage all customers to review the product samples and details thoroughly before making a purchase. If you encounter any technical issues with your download, please contact our support team immediately.</p>
                    <p className="mb-6">Exceptions may be made in cases of duplicate purchases or if the product is significantly not as described, subject to our team's review of the account activity.</p>
                </>
            );
        }
        if (title.includes("Privacy")) {
            return (
                <>
                    <p className="mb-6">Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use the Phungashang platform.</p>
                    <p className="mb-6">We collect personal information such as your name, email address, and payment details only when voluntarily provided during the checkout or registration process.</p>
                    <p className="mb-6">We use industry-standard encryption and security measures to protect your data. We do not sell or share your personal information with third parties for marketing purposes.</p>
                </>
            );
        }
        if (title.includes("Terms")) {
            return (
                <>
                    <p className="mb-6">By accessing and using the Phungashang website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                    <p className="mb-6">All materials provided on this site are for educational purposes only. Unauthorized distribution, sharing, or resale of our digital products is strictly prohibited and may result in legal action.</p>
                    <p className="mb-6">We reserve the right to modify these terms at any time. Your continued use of the site following any changes signifies your acceptance of the updated terms.</p>
                </>
            );
        }
        return (
            <>
                <p className="mb-6">This document outlines the legal guidelines and disclaimers associated with using our platform.</p>
                <p className="mb-6">Phungashang provides study materials "as is" and does not guarantee specific exam results. Success depends on individual study habits and curriculum variations.</p>
            </>
        );
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar />
            <main className="pt-40 pb-32">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl font-black text-slate-950 dark:text-white mb-12 italic">{title}</h1>
                    <div className="prose prose-slate dark:prose-invert prose-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                        {getContent()}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
