import React, { useState, useEffect } from 'react';
import { getSalesSummary } from '../services/api';
import type { SalesSummary } from '../types';

const StatCard: React.FC<{ title: string; value: string; icon: string }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center space-x-4">
        <div className="text-4xl">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

export const SalesSummaryWidget: React.FC = () => {
    const [summary, setSummary] = useState<SalesSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                setLoading(true);
                const data = await getSalesSummary();
                setSummary(data);
            } catch (error) {
                console.error("Failed to fetch sales summary:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    if (loading) {
        return <div className="text-center p-8">লোড হচ্ছে...</div>;
    }

    if (!summary) {
        return <div className="text-center p-8 text-red-500">ডেটা লোড করা যায়নি।</div>;
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">বিক্রয় সারসংক্ষেপ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="মোট বিক্রয়" value={summary.totalSales} icon="💰" />
                <StatCard title="মোট অর্ডার" value={summary.totalOrders} icon="📈" />
                <StatCard title="মোট লাভ" value={summary.grossProfit} icon="💸" />
            </div>
        </div>
    );
};
