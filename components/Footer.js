import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white border-t mt-10">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-gray-700">

                {/* About */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">About Us</h2>
                    <p className="text-sm">
                        We are a non-profit organization committed to empowering students by providing scholarships to support their academic journey and future success.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        <li><Link href="/about" className="hover:underline">About</Link></li>
                        <li><Link href="/scholarship" className="hover:underline">Apply for Scholarship</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">Contact</h2>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2"><Mail size={16} /> info@ngo-scholarship.org</li>
                        <li className="flex items-center gap-2"><Phone size={16} /> +91 98765 43210</li>
                        <li className="flex items-center gap-2"><MapPin size={16} /> Jaipur, Rajasthan, India</li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
                    <div className="flex gap-4 text-gray-600">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600"><Facebook /></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400"><Twitter /></a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-600"><Instagram /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="text-center text-sm text-gray-500 py-4 border-t">
                © {new Date().getFullYear()} NGO Scholarship Foundation. All rights reserved.
            </div>
        </footer>
    );
}
