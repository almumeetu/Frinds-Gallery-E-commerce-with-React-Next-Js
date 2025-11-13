import React, { useState } from 'react';
import type { Page } from '../App';
import type { Customer } from '../types';

interface AuthPageProps {
    navigateTo: (page: Page) => void;
    onLogin: (email: string, password: string) => boolean;
    onRegister: (newCustomerData: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'joinDate' | 'orderIds'>) => boolean;
}

export const AuthPage: React.FC<AuthPageProps> = ({ navigateTo, onLogin, onRegister }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    // Login states
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    // Register states
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPhone, setRegPhone] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = onLogin(loginEmail, loginPassword);
        if (!success) {
            setError('ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।');
        }
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = onRegister({ name: regName, email: regEmail, phone: regPhone, password: regPassword });
        if (!success) {
            setError('এই ইমেইল দিয়ে ইতিমধ্যে একটি একাউন্ট খোলা হয়েছে।');
        }
    };

    return (
        <div className="bg-gray-50 py-12 flex items-center justify-center min-h-[60vh]">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md border">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{isLoginView ? 'লগইন করুন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}</h2>

                {isLoginView ? (
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">ইমেইল</label>
                            <input
                                type="email"
                                id="login-email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                required
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            {/* FIX: Added missing className attribute */}
                            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
                            <input
                                type="password"
                                id="login-password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-brand-green text-white py-2.5 rounded-md font-semibold hover:bg-brand-green-dark"
                        >
                            লগইন
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                        <div>
                            {/* FIX: Added missing className attribute */}
                            <label htmlFor="reg-name" className="block text-sm font-medium text-gray-700">আপনার নাম</label>
                            <input type="text" id="reg-name" value={regName} onChange={(e) => setRegName(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                        </div>
                        <div>
                            {/* FIX: Added missing className attribute */}
                            <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700">ইমেইল</label>
                            <input type="email" id="reg-email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                        </div>
                        <div>
                            {/* FIX: Added missing className attribute */}
                            <label htmlFor="reg-phone" className="block text-sm font-medium text-gray-700">ফোন নাম্বার</label>
                            <input type="tel" id="reg-phone" value={regPhone} onChange={(e) => setRegPhone(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                        </div>
                        <div>
                            {/* FIX: Added missing className attribute */}
                            <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
                            <input type="password" id="reg-password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
                        </div>
                        <button type="submit" className="w-full bg-brand-green text-white py-2.5 rounded-md font-semibold hover:bg-brand-green-dark">
                            রেজিস্টার
                        </button>
                    </form>
                )}

                {error && <p className="mt-4 text-center text-red-500 text-sm">{error}</p>}

                <div className="mt-6 text-center">
                    <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }} className="text-sm text-brand-green hover:underline">
                        {isLoginView ? 'অ্যাকাউন্ট নেই? রেজিস্টার করুন' : 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন'}
                    </button>
                </div>
            </div>
        </div>
    );
}