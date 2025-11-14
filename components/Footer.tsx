import React from 'react';
import { ServiceInfo } from './ServiceInfo';
import type { Page } from '../App';

interface FooterProps {
    navigateTo: (page: Page) => void;
    navigateToShop: (categoryId: string) => void;
}

const Logo = () => (
    <div className="text-brand-green font-semibold text-2xl tracking-tight text-left">
      Friend's Gallery
    </div>
);

export const Footer: React.FC<FooterProps> = ({ navigateTo, navigateToShop }) => {
    return (
        <footer className="bg-white text-slate-600 border-t border-slate-200">
            <ServiceInfo />
            <div className="w-full mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {/* About and Subscribe */}
                    <div className="col-span-2 lg:col-span-2 space-y-4">
                        <Logo />
                        <p className="text-sm max-w-sm">
                            বাংলাদেশের মহিলাদের পোশাক ও আনুষাঙ্গিক পণ্যের জন্য একটি বিশ্বস্ত ই-কমার্স প্ল্যাটফর্ম। সেরা মানের পণ্য এবং দ্রুত ডেলিভারি নিশ্চিত করতে আমরা প্রতিশ্রুতিবদ্ধ।
                        </p>
                         <h3 className="text-lg font-semibold text-brand-dark pt-4">অফার এবং আপডেটের জন্য সাইন আপ করুন</h3>
                        <form className="flex">
                           <input type="email" placeholder="আপনার ইমেইল দিন" className="w-full rounded-r-none text-sm" />
                           <button className="bg-brand-green text-white px-4 rounded-l-none rounded-r-md text-sm font-semibold hover:bg-brand-green-dark transition-colors">সাবস্ক্রাইব</button>
                        </form>
                    </div>

                    {/* Shop Categories */}
                    <div>
                        <h3 className="text-lg font-semibold text-brand-dark">শপ</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><button onClick={() => navigateToShop('all')} className="hover:text-brand-green">সকল পণ্য</button></li>
                            <li><button onClick={() => navigateToShop('long-khimar')} className="hover:text-brand-green">লং খিমার</button></li>
                            <li><button onClick={() => navigateToShop('hijab')} className="hover:text-brand-green">হিজাব কালেকশন</button></li>
                            <li><button onClick={() => navigateToShop('three-piece')} className="hover:text-brand-green">থ্রি-পিস</button></li>
                            <li><button onClick={() => navigateToShop('innar-collection')} className="hover:text-brand-green">ইনার কালেকশন</button></li>
                        </ul>
                    </div>
                    
                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold text-brand-dark">গ্রাহক সেবা</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><button onClick={() => navigateTo('account')} className="hover:text-brand-green">আমার অ্যাকাউন্ট</button></li>
                            <li><button onClick={() => navigateTo('utility')} className="hover:text-brand-green text-left">অর্ডার ট্র্যাকিং</button></li>
                            <li><button onClick={() => navigateTo('contact')} className="hover:text-brand-green">যোগাযোগ</button></li>
                            <li><button onClick={() => navigateTo('returns')} className="hover:text-brand-green">রিটার্ন ও রিফান্ড</button></li>
                            <li><button onClick={() => navigateTo('terms')} className="hover:text-brand-green">শর্তাবলী</button></li>
                            <li><button onClick={() => navigateTo('admin')} className="hover:text-brand-green">অ্যাডমিন</button></li>
                        </ul>
                    </div>

                     {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-brand-dark">যোগাযোগ</h3>
                         <div className="mt-4 space-y-3 text-sm">
                            <p><strong>সাপোর্ট:</strong> <a href="tel:01618803154" className="hover:text-brand-green">01618803154</a></p>
                            <p><strong>ইমেইল:</strong> <a href="mailto:friendsgallery191@gmail.com" className="hover:text-brand-green">friendsgallery191@gmail.com</a></p>
                             <p><strong>ঠিকানা:</strong> Zerabo Ashulia Saver Dhaka 1341</p>
                        </div>
                    </div>
                </div>
            </div>
             <div className="border-t border-slate-200 bg-white">
                <div className="w-full mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm">
                    <p className="text-slate-500">&copy; ২০২৪ ফ্রেন্ডস গ্যালারি। সর্বস্বত্ব সংরক্ষিত।</p>
                    <div className="flex space-x-2 mt-4 sm:mt-0 items-center">
                        <span className="text-slate-500 hidden sm:inline">আমরা গ্রহণ করি:</span>
                        <img src="https://i.ibb.co/fH4C8dF/bkash.png" alt="bKash" className="h-6" />
                        <img src="https://i.ibb.co/pnv1p2h/nagad.png" alt="Nagad" className="h-6" />
                        <img src="https://i.ibb.co/qMsFWpP/rocket.png" alt="Rocket" className="h-6" />
                        <img src="https://i.ibb.co/pWk2R4z/cod.png" alt="Cash on Delivery" className="h-6" />
                    </div>
                </div>
            </div>
        </footer>
    );
};