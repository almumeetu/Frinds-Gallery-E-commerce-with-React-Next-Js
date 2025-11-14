import React, { useState } from 'react';
import { getOrderStatus } from '../services/api';
import { OrderStatus } from '../types';

export const OrderTrackingWidget: React.FC = () => {
    const [trackingId, setTrackingId] = useState('');
    const [status, setStatus] = useState<OrderStatus | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingId) return;
        setIsLoading(true);
        setStatus(null);
        const result = await getOrderStatus(trackingId);
        setStatus(result);
        setIsLoading(false);
    };

    const getStatusColor = (currentStatus: OrderStatus) => {
        switch (currentStatus) {
            case OrderStatus.Processing: return 'bg-yellow-500';
            case OrderStatus.Shipped: return 'bg-blue-500';
            case OrderStatus.Delivered: return 'bg-green-500';
            case OrderStatus.NotFound: return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm border text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">আপনার অর্ডার ট্র্যাক করুন</h2>
            <p className="text-gray-600 mb-6">আপনার অর্ডার আইডি দিয়ে বর্তমান অবস্থা জানুন।</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="অর্ডার আইডি লিখুন (e.g., FG-2024-12345)"
                    className="w-full sm:w-80"
                    aria-label="Order Tracking ID"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto bg-brand-green text-white py-2.5 px-6 rounded-lg font-semibold hover:bg-brand-green-dark disabled:bg-gray-400 transition-colors"
                >
                    {isLoading ? 'অনুসন্ধান...' : 'ট্র্যাক করুন'}
                </button>
            </form>

            {status && (
                <div className="mt-8">
                    <h3 className="font-semibold">অর্ডারের অবস্থা:</h3>
                    <div className={`mt-2 inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold text-white ${getStatusColor(status)}`}>
                        {status}
                    </div>
                </div>
            )}
        </div>
    );
};