import React from 'react';
import { SparklesIcon, FireIcon, TruckIcon, ChatBubbleLeftRightIcon } from './icons';

const featureData = [
    { title: "নতুন কালেকশন", description: "সর্বশেষ ডিজাইন দেখুন", link: "#", icon: <SparklesIcon /> },
    { title: "বেস্ট ডিল", description: "সেরা দামে সেরা পণ্য", link: "#", icon: <FireIcon /> },
    { title: "দ্রুত ডেলিভারি", description: "সারা দেশে হোম ডেলিভারি", link: "#", icon: <TruckIcon /> },
    { title: "কাস্টমার সাপোর্ট", description: "২৪/৭ হেল্পলাইন", link: "#", icon: <ChatBubbleLeftRightIcon /> },
];

export const FeatureCards: React.FC = () => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {featureData.map((feature, index) => (
                    <a href={feature.link} key={index} className="flex items-center p-4 bg-white border border-slate-200 rounded-lg hover:bg-brand-green hover:text-white transition-colors group">
                        <div className="text-brand-green group-hover:text-white text-3xl mr-4">{feature.icon}</div>
                        <div>
                            <h3 className="font-semibold text-brand-dark group-hover:text-white">{feature.title}</h3>
                            <p className="text-sm text-slate-500 group-hover:text-slate-200">{feature.description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}