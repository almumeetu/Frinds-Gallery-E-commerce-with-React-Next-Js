import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SalesSummaryWidget } from '../components/SalesSummaryWidget';
import { AdminDashboardMenu } from '../components/AdminDashboardMenu';
import { ProductManagement } from '../components/ProductManagement';
import { OrderManagement } from '../components/OrderManagement';
import { CustomerList } from '../components/CustomerList';
import { SettingsManagement } from '../components/SettingsManagement';
import type { Page } from '../App';
import type { Product, Order, Customer } from '../types';

interface AdminDashboardPageProps {
    navigateTo: (page: Page) => void;
    products: Product[];
    orders: Order[];
    customers: Customer[];
    onAddProduct: (newProduct: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => void;
    onUpdateProduct: (updatedProduct: Product) => void;
    onDeleteProduct: (productId: string) => void;
    onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ 
    navigateTo, 
    products,
    orders,
    customers,
    onAddProduct, 
    onUpdateProduct, 
    onDeleteProduct,
    onUpdateOrderStatus
}) => {
    const [activeView, setActiveView] = useState('dashboard');

    const renderContent = () => {
        switch (activeView) {
            case 'products':
                return <ProductManagement 
                            products={products}
                            onAddProduct={onAddProduct}
                            onUpdateProduct={onUpdateProduct}
                            onDeleteProduct={onDeleteProduct}
                        />;
            case 'orders':
                return <OrderManagement 
                            orders={orders}
                            products={products}
                            onUpdateStatus={onUpdateOrderStatus}
                        />;
            case 'customers':
                return <CustomerList customers={customers} />;
            case 'settings':
                 return <SettingsManagement />;
            case 'dashboard':
            default:
                return <SalesSummaryWidget />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumbs items={[{ label: 'হোম', onClick: () => navigateTo('home') }, { label: 'অ্যাডমিন ড্যাশবোর্ড' }]} />
                <h1 className="text-3xl font-bold text-gray-900 my-6">অ্যাডমিন ড্যাশবোর্ড</h1>

                <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                    <aside className="lg:col-span-1 mb-8 lg:mb-0">
                       <AdminDashboardMenu activeView={activeView} setActiveView={setActiveView} />
                    </aside>

                    <main className="lg:col-span-3">
                        <div className="space-y-8">
                            {renderContent()}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};