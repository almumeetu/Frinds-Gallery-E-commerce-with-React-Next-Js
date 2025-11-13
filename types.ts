export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  sku: string;
  stock: number;
  rating: number;
  reviewCount: number;
}

export interface Category {
    id: string;
    name: string;
    imageUrl?: string;
}

export interface Review {
    id: number;
    quote: string;
    author: string;
    location: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export enum OrderStatus {
  Processing = 'প্রক্রিয়াধীন',
  Shipped = 'শিপিং-এ',
  Delivered = 'পৌঁছে গেছে',
  NotFound = 'অর্ডার খুঁজে পাওয়া যায়নি',
}

export interface SalesSummary {
    totalSales: string;
    totalOrders: string;
    grossProfit: string;
}

export interface OrderDetails {
    orderId: string;
    customerName: string;
    totalAmount: number;
}