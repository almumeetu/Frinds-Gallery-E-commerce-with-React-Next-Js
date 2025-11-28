import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SalesSummaryWidget } from '../components/SalesSummaryWidget';
import { AdminDashboardMenu } from '../components/AdminDashboardMenu';
import { OrderManagement } from '../components/OrderManagement';
import { CustomerList } from '../components/CustomerList';
import { SettingsManagement } from '../components/SettingsManagement';
import AdminRoute from '../components/AdminRoute';
import AdminDashboard from '../components/AdminDashboard'; // My new component for products
import type { Page } from '../App';
import type { Product, Order, Customer } from '../types';
import * as api from '../services/api';

interface AdminDashboardPageProps {
    navigateTo: (page: Page) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ navigateTo }) => {
    const [activeView, setActiveView] = useState('products');
    
    // This component will now manage its own data
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAdminData = async () => {
            setLoading(true);
            try {
                // Fetch all data needed for the dashboard panels
                const [productsData, ordersData, customersData] = await Promise.all([
                    api.getProducts(),
                    api.getOrders(),
                    api.getCustomers(),
                ]);
                setProducts(productsData);
                setOrders(ordersData);
                setCustomers(customersData);
            } catch (error) {
                console.error("Failed to load admin data", error);
            } finally {
                setLoading(false);
            }
        };
        loadAdminData();
    }, []);

    const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
        const updatedOrder = await api.updateOrderStatus(orderId, status);
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? updatedOrder : order
            )
        );
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-green"></div>
                </div>
            );
        }

        switch (activeView) {
            case 'products':
                return <AdminDashboard />; // This component is now fully self-contained
            case 'orders':
                return <OrderManagement 
                            orders={orders}
                            products={products} // Pass fetched products
                            onUpdateStatus={handleUpdateOrderStatus}
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
        <AdminRoute>
            <div className="bg-gray-50 min-h-screen">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Breadcrumbs items={[{ label: 'Home', onClick: () => navigateTo('home') }, { label: 'Admin Dashboard' }]} />
                    <h1 className="text-3xl font-bold text-gray-900 my-6">Admin Dashboard</h1>

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
        </AdminRoute>
    );
};