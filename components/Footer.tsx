import React from 'react';
import { ServiceInfo } from './ServiceInfo';
import type { Page } from '../App';

interface FooterProps {
    navigateTo: (page: Page) => void;
}

const Logo = () => (
    <div className="text-brand-green text-left">
      <span className="text-4xl font-bold tracking-tighter">G</span>
      <span className="text-2xl font-semibold">Friend's</span>
      <div className="text-xs tracking-widest -mt-1 text-gray-600">Gallery 0.7</div>
    </div>
);

export const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
    return (
        <footer className="bg-gray-50 text-gray-600 border-t">
            <ServiceInfo />
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About and Subscribe */}
                    <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
                        <Logo />
                        <p className="text-sm">
                            বাংলাদেশের মহিলাদের পোশাক ও আনুষাঙ্গিক পণ্যের জন্য একটি বিশ্বস্ত ই-কমার্স প্ল্যাটফর্ম।
                        </p>
                         <h3 className="text-lg font-semibold text-gray-800 pt-4">নিউজলেটার</h3>
                        <form className="flex">
                           <input type="email" placeholder="আপনার ইমেইল" className="w-full border-gray-300 rounded-l-md shadow-sm text-sm" />
                           <button className="bg-brand-green text-white px-4 rounded-r-md text-sm font-semibold hover:bg-brand-green-dark">সাবস্ক্রাইব</button>
                        </form>
                    </div>

                    {/* Shop Categories */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">শপ ক্যাটাগরি</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><button onClick={() => navigateTo('shop')} className="hover:text-brand-green">লং খিমার</button></li>
                            <li><button onClick={() => navigateTo('shop')} className="hover:text-brand-green">হিজাব কালেকশন</button></li>
                            <li><button onClick={() => navigateTo('shop')} className="hover:text-brand-green">থ্রি-পিস</button></li>
                            <li><button onClick={() => navigateTo('shop')} className="hover:text-brand-green">ইনার কালেকশন</button></li>
                            <li><button onClick={() => navigateTo('shop')} className="hover:text-brand-green">ইসলামিক আইটেম</button></li>
                        </ul>
                    </div>
                    
                    {/* Customer Account */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">গ্রাহক অ্যাকাউন্ট</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><button onClick={() => navigateTo('account')} className="hover:text-brand-green">আমার অ্যাকাউন্ট</button></li>
                            <li><button onClick={() => navigateTo('utility')} className="hover:text-brand-green text-left">অর্ডার ট্র্যাকিং</button></li>
                            <li><button onClick={() => navigateTo('returns')} className="hover:text-brand-green">রিটার্ন ও রিফান্ড</button></li>
                            <li><button onClick={() => navigateTo('terms')} className="hover:text-brand-green">শর্তাবলী</button></li>
                        </ul>
                    </div>

                     {/* Talk to Us */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">যোগাযোগ</h3>
                         <div className="mt-4 space-y-3 text-sm">
                            <p className="flex items-start space-x-2">
                                <span className="font-bold text-brand-green mt-0.5">সাপোর্ট:</span>
                                <span>+8801618803154</span>
                            </p>
                            <p className="flex items-start space-x-2">
                                <span className="font-bold text-brand-green mt-0.5">ইমেইল:</span>
                                <span>friendsgallery191@gmail.com</span>
                            </p>
                             <p className="flex items-start space-x-2">
                                <span className="font-bold text-brand-green mt-0.5">ঠিকানা:</span>
                                <span>Zerabo Ashulia Saver Dhaka 1341</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
             <div className="border-t bg-white">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm">
                    <p className="text-gray-500">&copy; ২০২৪ ফ্রেন্ডস গ্যালারি ০.৭। সর্বস্বত্ব সংরক্ষিত।</p>
                    <div className="flex space-x-2 mt-4 sm:mt-0 items-center">
                        <span className="text-gray-500">পেমেন্ট মেথড:</span>
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