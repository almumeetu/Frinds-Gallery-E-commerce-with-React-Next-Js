import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import type { Page } from '../App';
import type { Customer, Order } from '../types';

interface AccountPageProps {
    navigateTo: (page: Page) => void;
    currentUser: Customer;
    orders: Order[];
    onLogout: () => void;
}

const getStatusColor = (status: Order['status']) => {
    switch (status) {
        case 'প্রক্রিয়াধীন': return 'bg-yellow-100 text-yellow-800';
        case 'শিপিং-এ': return 'bg-blue-100 text-blue-800';
        case 'পৌঁছে গেছে': return 'bg-green-100 text-green-800';
        case 'বাতিল': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const menuItems = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: '🏠' },
    { id: 'orders', label: 'অর্ডারসমূহ', icon: '📦' },
    { id: 'profile', label: 'প্রোফাইল', icon: '👤' },
];

export const AccountPage: React.FC<AccountPageProps> = ({ navigateTo, currentUser, orders, onLogout }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const userOrders = orders.filter(order => order.customerId === currentUser.id).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const renderContent = () => {
        switch(activeTab) {
            case 'orders':
                return (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">আমার অর্ডারসমূহ</h2>
                        {userOrders.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">অর্ডার আইডি</th>
                                            <th scope="col" className="px-6 py-3">তারিখ</th>
                                            <th scope="col" className="px-6 py-3">মোট মূল্য</th>
                                            <th scope="col" className="px-6 py-3">স্ট্যাটাস</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userOrders.map(order => (
                                            <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900">{order.orderId}</th>
                                                <td className="px-6 py-4">{new Date(order.date).toLocaleDateString('bn-BD')}</td>
                                                <td className="px-6 py-4">৳{order.totalAmount.toLocaleString('bn-BD')}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>আপনি এখনো কোনো অর্ডার করেননি।</p>
                        )}
                    </div>
                );
            case 'profile':
                return (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">প্রোফাইল তথ্য</h2>
                        <div className="space-y-3">
                            <p><strong>নাম:</strong> {currentUser.name}</p>
                            <p><strong>ইমেইল:</strong> {currentUser.email}</p>
                            <p><strong>ফোন:</strong> {currentUser.phone}</p>
                            <p><strong>অ্যাকাউন্ট খোলার তারিখ:</strong> {new Date(currentUser.joinDate).toLocaleDateString('bn-BD')}</p>
                        </div>
                    </div>
                );
            case 'dashboard':
            default:
                return (
                    <div>
                        <p className="text-lg">হ্যালো, <strong>{currentUser.name}</strong>!</p>
                        <p className="mt-2 text-gray-600">এখান থেকে আপনি আপনার সাম্প্রতিক অর্ডার দেখতে এবং আপনার অ্যাকাউন্ট তথ্য পরিচালনা করতে পারেন।</p>
                         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg border">
                                <p className="text-sm text-gray-500">মোট অর্ডার</p>
                                <p className="text-2xl font-bold text-gray-900">{currentUser.totalOrders}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg border">
                                <p className="text-sm text-gray-500">মোট খরচ</p>
                                <p className="text-2xl font-bold text-gray-900">৳{currentUser.totalSpent.toLocaleString('bn-BD')}</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };
    
    return (
        <div className="bg-gray-50 py-12 min-h-[60vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumbs items={[{ label: 'হোম', onClick: () => navigateTo('home') }, { label: 'আমার অ্যাকাউন্ট' }]} />
                <div className="mt-8 lg:grid lg:grid-cols-4 lg:gap-8">
                    <aside className="lg:col-span-1 mb-8 lg:mb-0">
                        <div className="bg-white p-4 rounded-lg shadow-sm border">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">অ্যাকাউন্ট মেনু</h3>
                            <ul className="space-y-1">
                                {menuItems.map(item => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center text-left px-3 py-2.5 rounded-md text-sm transition-colors ${
                                                activeTab === item.id
                                                ? 'bg-brand-green text-white font-semibold shadow'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                        >
                                           <span className="mr-3">{item.icon}</span>
                                           {item.label}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={onLogout}
                                        className="w-full flex items-center text-left px-3 py-2.5 rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    >
                                       <span className="mr-3">🚪</span>
                                       লগআউট
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <main className="lg:col-span-3">
                        <div className="bg-white p-6 rounded-lg shadow-sm border min-h-[300px]">
                            {renderContent()}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};
