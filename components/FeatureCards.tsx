import React from 'react';

const featureData = [
    { title: "নতুন কালেকশন", description: "সর্বশেষ ডিজাইন দেখুন", link: "#", icon: "✨" },
    { title: "বেস্ট ডিল", description: "সেরা দামে সেরা পণ্য", link: "#", icon: "🔥" },
    { title: "দ্রুত ডেলিভারি", description: "সারা দেশে হোম ডেলিভারি", link: "#", icon: "🚚" },
    { title: "কাস্টমার সাপোর্ট", description: "২৪/৭ হেল্পলাইন", link: "#", icon: "🎧" },
];

export const FeatureCards: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featureData.map((feature, index) => (
                    <a href={feature.link} key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-brand-green hover:text-white transition-colors group">
                        <div className="text-3xl mr-4">{feature.icon}</div>
                        <div>
                            <h3 className="font-semibold text-gray-800 group-hover:text-white">{feature.title}</h3>
                            <p className="text-sm text-gray-500 group-hover:text-gray-200">{feature.description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}