import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const AccountPage: React.FC = () => {
    return (
        <div className="bg-white py-12 min-h-[60vh]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs items={[{ label: 'হোম', href: '#' }, { label: 'আমার অ্যাকাউন্ট' }]} />
                <div className="mt-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">আমার অ্যাকাউন্ট</h1>
                    <p className="mt-4 text-gray-600">এখানে আপনার প্রোফাইল, অর্ডার হিস্ট্রি এবং অন্যান্য তথ্য দেখতে পারবেন। ফিচারটি শীঘ্রই আসছে!</p>
                </div>
            </div>
        </div>
    );
};
