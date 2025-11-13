
import { OrderStatus } from '../types';
import type { SalesSummary } from '../types';

// Mock function to simulate creating an order
export const createOrder = (orderDetails: { district: string }): Promise<{ message: string; orderId: string; deliveryCharge: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const deliveryCharge = orderDetails.district === 'ঢাকা' ? 80 : 150;
      const orderId = `FG-2024-${Math.floor(10000 + Math.random() * 90000)}`;
      
      console.log('Order created:', { ...orderDetails, orderId, deliveryCharge });

      resolve({
        message: 'আপনার অর্ডার সফলভাবে গৃহীত হয়েছে!',
        orderId,
        deliveryCharge,
      });
    }, 1000);
  });
};

// Mock function to simulate fetching order status
export const getOrderStatus = (trackingId: string): Promise<OrderStatus> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (trackingId.startsWith("FG-")) {
                const statuses = [OrderStatus.Processing, OrderStatus.Shipped, OrderStatus.Delivered];
                const randomIndex = Math.floor(Math.random() * statuses.length);
                resolve(statuses[randomIndex]);
            } else {
                resolve(OrderStatus.NotFound);
            }
        }, 1000);
    });
};

// Mock function for GET /api/admin/sales-summary
export const getSalesSummary = (): Promise<SalesSummary> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const totalSales = 350000;
            const totalOrders = 210;
            const grossProfit = totalSales * 0.25; // Assuming a 25% fixed margin

            resolve({
                totalSales: `৳ ${totalSales.toLocaleString('bn-BD')}`,
                totalOrders: totalOrders.toLocaleString('bn-BD'),
                grossProfit: `৳ ${grossProfit.toLocaleString('bn-BD')}`
            });
        }, 800);
    });
};
