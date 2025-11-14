import React from 'react';
import { SparklesIcon, FireIcon, TruckIcon, ChatBubbleLeftRightIcon } from './icons';

const featureData = [
    { title: "নতুন কালেকশন", description: "সর্বশেষ ডিজাইন দেখুন", icon: <SparklesIcon /> },
    { title: "বেস্ট ডিল", description: "সেরা দামে সেরা পণ্য", icon: <FireIcon /> },
    { title: "দ্রুত ডেলিভারি", description: "সারা দেশে হোম ডেলিভারি", icon: <TruckIcon /> },
    { title: "কাস্টমার সাপোর্ট", description: "২৪/৭ হেল্পলাইন", icon: <ChatBubbleLeftRightIcon /> },
];

export const FeatureCards: React.FC = () => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {featureData.map((feature, index) => (
                    <div key={index} className="flex items-center p-3 sm:p-5 bg-white border border-slate-200/80 rounded-lg sm:rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                        <div className="text-brand-green text-2xl sm:text-3xl mr-3 sm:mr-4 bg-green-100 p-2 sm:p-3 rounded-lg flex-shrink-0">{feature.icon}</div>
                        <div className="min-w-0">
                            <h3 className="font-semibold text-brand-dark text-sm sm:text-base">{feature.title}</h3>
                            <p className="text-xs sm:text-sm text-slate-500 truncate">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}