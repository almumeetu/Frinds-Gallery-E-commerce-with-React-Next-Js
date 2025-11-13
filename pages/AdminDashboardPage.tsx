import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SalesSummaryWidget } from '../components/SalesSummaryWidget';
import { AdminDashboardMenu } from '../components/AdminDashboardMenu';
import type { Page } from '../App';

interface AdminDashboardPageProps {
    navigateTo: (page: Page) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ navigateTo }) => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumbs items={[{ label: 'হোম', href: '#' }, { label: 'অ্যাডমিন ড্যাশবোর্ড' }]} />
                <h1 className="text-3xl font-bold text-gray-900 my-6">অ্যাডমিন ড্যাশবোর্ড</h1>

                <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                    <aside className="lg:col-span-1 mb-8 lg:mb-0">
                       <AdminDashboardMenu />
                    </aside>

                    <main className="lg:col-span-3">
                        <div className="space-y-8">
                            <SalesSummaryWidget />
                            {/* Other widgets like recent orders, top products can be added here */}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};
