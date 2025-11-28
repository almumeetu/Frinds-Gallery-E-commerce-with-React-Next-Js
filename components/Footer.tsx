import React from 'react';
import { ServiceInfo } from './ServiceInfo';
import type { Page } from '../App';

interface FooterProps {
    navigateTo: (page: Page) => void;
    navigateToShop: (categoryId: string) => void;
}

const Logo = () => (
    <div className="text-brand-green font-bold text-xl sm:text-2xl tracking-tight text-left">
      Friend's Gallery
    </div>
);

const SocialIcon: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand-green transition-colors block">
        <div className="w-5 h-5 sm:w-6 sm:h-6">{children}</div>
    </a>
);

export const Footer: React.FC<FooterProps> = ({ navigateTo, navigateToShop }) => {
    return (
        <footer className="bg-white text-slate-600 border-t border-slate-200">
            <ServiceInfo />
            <div className="w-full mx-auto max-w-8xl py-8 sm:py-16 px-3 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
                    {/* About and Subscribe */}
                    <div className="md:col-span-4 space-y-3 sm:space-y-4">
                        <Logo />
                        <p className="text-xs sm:text-sm max-w-sm leading-relaxed">
                            বাংলাদেশের মহিলাদের পোশাক ও আনুষাঙ্গিক পণ্যের জন্য একটি বিশ্বস্ত ই-কমার্স প্ল্যাটফর্ম। সেরা মানের পণ্য এবং দ্রুত ডেলিভারি নিশ্চিত করতে আমরা প্রতিশ্রুতিবদ্ধ।
                        </p>
                        <div className="flex space-x-3 sm:space-x-4 pt-2">
                           <SocialIcon href="#"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.81 1.91 3.58-.71 0-1.37-.22-1.95-.55v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.35 0-.69-.02-1.03-.06C3.4 19.4 5.66 20 8.12 20c7.34 0 11.35-6.08 11.35-11.35 0-.17 0-.34-.01-.51.78-.57 1.45-1.28 1.99-2.09z"></path></svg></SocialIcon>
                           <SocialIcon href="#"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96s4.46 9.96 9.96 9.96 9.96-4.46 9.96-9.96S17.5 2.04 12 2.04zm4.47 11.96h-2.17v6.62h-2.91v-6.62h-1.47v-2.48h1.47v-1.83c0-1.46.89-2.26 2.2-2.26.63 0 1.16.05 1.32.07v2.22h-1.32c-.71 0-.85.34-.85.83v1.75h2.2l-.28 2.48z"></path></svg></SocialIcon>
                           <SocialIcon href="#"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-2.72 0-3.05.01-4.12.06-1.06.05-1.79.22-2.42.46-.65.25-1.23.59-1.77 1.15-.55.55-.9 1.12-1.15 1.77-.24.63-.41 1.36-.46 2.42C2.01 8.95 2 9.28 2 12s.01 3.05.06 4.12c.05 1.06.22 1.79.46 2.42.25.65.59 1.23 1.15 1.77.55.55 1.12.9 1.77 1.15.63.24 1.36.41 2.42.46 1.07.05 1.4.06 4.12.06s3.05-.01 4.12-.06c1.06-.05 1.79-.22 2.42-.46.65-.25 1.23-.59 1.77-1.15.55-.55.9-1.12 1.15-1.77.24-.63.41-1.36.46-2.42.05-1.07.06-1.4.06-4.12s-.01-3.05-.06-4.12c-.05-1.06-.22-1.79-.46-2.42-.25-.65-.59-1.23-1.15-1.77-.55-.55-1.12-.9-1.77-1.15-.63-.24-1.36-.41-2.42-.46C15.05 2.01 14.72 2 12 2zm0 1.8c2.65 0 2.96.01 4 .06 1.02.05 1.58.21 1.9.35.42.17.72.35 1.02.66.3.3.49.6.66 1.02.14.32.3.88.35 1.9.05 1.04.06 1.35.06 4s-.01 2.96-.06 4c-.05 1.02-.21 1.58-.35 1.9-.17.42-.35.72-.66 1.02-.3.3-.6.49-1.02.66-.32.14-.88.3-1.9.35-1.04.05-1.35.06-4 .06s-2.96-.01-4-.06c-1.02-.05-1.58-.21-1.9-.35-.42-.17-.72-.35-1.02-.66-.3-.3-.49-.6-.66-1.02-.14-.32-.3-.88-.35-1.9-.05-1.04-.06-1.35-.06-4s.01-2.96.06-4c.05-1.02.21 1.58.35 1.9.17-.42.35-.72.66-1.02.3-.3.6-.49 1.02-.66.32-.14.88-.3 1.9-.35C9.04 3.81 9.35 3.8 12 3.8zm0 3.35c-2.9 0-5.25 2.35-5.25 5.25s2.35 5.25 5.25 5.25 5.25-2.35 5.25-5.25-2.35-5.25-5.25-5.25zm0 8.7c-1.92 0-3.45-1.53-3.45-3.45s1.53-3.45 3.45-3.45 3.45 1.53 3.45 3.45-1.53 3.45-3.45 3.45zm5.95-9.15c0 .61-.49 1.1-1.1 1.1s-1.1-.49-1.1-1.1.49-1.1 1.1-1.1 1.1.49 1.1 1.1z"></path></svg></SocialIcon>
                        </div>
                    </div>

                    {/* Shop Categories */}
                    <div className="md:col-span-2">
                        <h3 className="text-base sm:text-lg font-semibold text-brand-dark">শপ</h3>
                        <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                            <li><button onClick={() => navigateToShop('long-khimar')} className="hover:text-brand-green">লং খিমার</button></li>
                            <li><button onClick={() => navigateToShop('hijab')} className="hover:text-brand-green">হিজাব কালেকশন</button></li>
                            <li><button onClick={() => navigateToShop('three-piece')} className="hover:text-brand-green">থ্রি-পিস</button></li>
                            <li><button onClick={() => navigateToShop('innar-collection')} className="hover:text-brand-green">ইনার কালেকশন</button></li>
                            <li><button onClick={() => navigateToShop('islamic-item')} className="hover:text-brand-green">ইসলামিক আইটেম</button></li>
                        </ul>
                    </div>
                    
                    {/* Customer Service */}
                    <div className="md:col-span-2">
                        <h3 className="text-base sm:text-lg font-semibold text-brand-dark">গ্রাহক সেবা</h3>
                        <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                            <li><button onClick={() => navigateTo('account')} className="hover:text-brand-green">আমার অ্যাকাউন্ট</button></li>
                            <li><button onClick={() => navigateTo('utility')} className="hover:text-brand-green text-left">অর্ডার ট্র্যাকিং</button></li>
                            <li><button onClick={() => navigateTo('returns')} className="hover:text-brand-green">রিটার্ন ও রিফান্ড</button></li>
                            <li><button onClick={() => navigateTo('terms')} className="hover:text-brand-green">শর্তাবলী</button></li>
                             <li><button onClick={() => navigateTo('about')} className="hover:text-brand-green">আমাদের সম্পর্কে</button></li>
                        </ul>
                    </div>

                     {/* Contact */}
                    <div className="md:col-span-4">
                        <h3 className="text-base sm:text-lg font-semibold text-brand-dark">যোগাযোগ ও নিউজলেটার</h3>
                         <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-xs sm:text-sm">
                            <p><strong>সাপোর্ট:</strong> <a href="tel:01618803154" className="hover:text-brand-green">01618803154</a></p>
                            <p className="break-all"><strong>ইমেইল:</strong> <a href="mailto:friendsgallery191@gmail.com" className="hover:text-brand-green">friendsgallery191@gmail.com</a></p>
                        </div>
                        <h4 className="text-sm sm:text-base font-semibold text-brand-dark pt-3 sm:pt-4 mt-3 sm:mt-4 border-t">অফার এবং আপডেটের জন্য সাইন আপ করুন</h4>
                        <form className="flex mt-2 gap-2">
                           <input type="email" placeholder="আপনার ইমেইল দিন" className="flex-1 rounded-lg text-xs sm:text-sm px-3 py-2" />
                           <button className="bg-brand-green text-white px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold hover:bg-brand-green-dark transition-colors whitespace-nowrap">সাবস্ক্রাইব</button>
                        </form>
                    </div>
                </div>
            </div>
             <div className="border-t border-slate-200 bg-white">
                <div className="w-full mx-auto max-w-8xl py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm">
                    <p className="text-slate-500">&copy; ২০২৪ ফ্রেন্ডস গ্যালারি। সর্বস্বত্ব সংরক্ষিত।</p>
                    <div className="flex space-x-3 mt-4 sm:mt-0 items-center">
                        <span className="text-slate-500 hidden sm:inline text-xs">আমরা গ্রহণ করি:</span>
                        <img src="https://seeklogo.com/images/B/bkash-logo-835789094F-seeklogo.com.png" alt="bKash" className="h-7 object-contain" />
                        <img src="https://seeklogo.com/images/N/nagad-logo-7A70CCFB0D-seeklogo.com.png" alt="Nagad" className="h-7 object-contain" />
                        <img src="https://cdn-icons-png.flaticon.com/512/4108/4108042.png" alt="Cash on Delivery" className="h-7 object-contain" />
                    </div>
                </div>
            </div>
        </footer>
    );
};