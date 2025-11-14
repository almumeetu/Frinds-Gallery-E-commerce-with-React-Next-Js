import React from 'react';
import { TruckIcon, ArrowUturnRightIcon, DiamondIcon, ChatBubbleLeftRightIcon } from './icons';

const services = [
    { title: "দ্রুত ডেলিভারি", description: "৳১০০০+ অর্ডারে", icon: <TruckIcon /> },
    { title: "সহজ রিটার্ন", description: "কোনো ঝামেলা ছাড়াই", icon: <ArrowUturnRightIcon /> },
    { title: "মানসম্মত পণ্য", description: "সেরা মানের নিশ্চয়তা", icon: <DiamondIcon /> },
    { title: "২৪/৭ কাস্টমার কেয়ার", description: "সর্বদা আপনার পাশে", icon: <ChatBubbleLeftRightIcon /> },
];

export const ServiceInfo: React.FC = () => {
    return (
        <div className="bg-white border-y">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <div key={service.title} className="flex items-center">
                            <div className="text-4xl mr-4 text-brand-green">{service.icon}</div>
                            <div>
                                <h3 className="font-semibold text-gray-800">{service.title}</h3>
                                <p className="text-sm text-gray-500">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};