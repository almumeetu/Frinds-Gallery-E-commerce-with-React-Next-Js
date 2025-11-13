import React from 'react';

const menuItems = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: '📊' },
    { id: 'orders', label: 'অর্ডারসমূহ', icon: '📦' },
    { id: 'products', label: 'পণ্যসমূহ', icon: '🛍️' },
    { id: 'customers', label: 'গ্রাহক তালিকা', icon: '👥' },
    { id: 'settings', label: 'সেটিংস', icon: '⚙️' },
];

interface AdminDashboardMenuProps {
    activeView: string;
    setActiveView: (view: string) => void;
}

export const AdminDashboardMenu: React.FC<AdminDashboardMenuProps> = ({ activeView, setActiveView }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">মেনু</h3>
            <ul className="space-y-1">
                {menuItems.map(item => (
                     <li key={item.id}>
                        <button
                            onClick={() => setActiveView(item.id)}
                            className={`w-full flex items-center text-left px-3 py-2.5 rounded-md text-sm transition-colors ${
                            activeView === item.id
                                ? 'bg-brand-green text-white font-semibold shadow'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        >
                           <span className="mr-3">{item.icon}</span>
                           {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
