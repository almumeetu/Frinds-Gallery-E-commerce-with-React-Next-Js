
import type { Product, Order, Customer, SalesSummary, OrderItem } from '../types';
import { OrderStatus } from '../types';

// --- MOCK DATABASE ---
// In a real application, this data would come from a database.
// We are keeping it here to simulate a backend API.

let products: Product[] = [
    { id: 'prod_1', name: 'জিলবাব লং খিমার', price: 990, originalPrice: 1200, imageUrl: 'https://i.ibb.co/6r1qGz8/khimar.jpg', category: 'long-khimar', sku: 'FG-LK-001', stock: 15, rating: 4.5, reviewCount: 65 },
    { id: 'prod_2', name: 'প্রিমিয়াম জর্জেট হিজাব', price: 699, originalPrice: 999, imageUrl: 'https://i.ibb.co/Kz9V31g/hijab.jpg', category: 'hijab', sku: 'FG-HJ-005', stock: 25, rating: 4.8, reviewCount: 120 },
    { id: 'prod_3', name: 'কমফোর্ট ফিট ফুল কভারেজ ব্রা', price: 750, imageUrl: 'https://i.ibb.co/Yd4Bv3D/bra.jpg', category: 'innar-collection', sku: 'FG-IN-012', stock: 30, rating: 4.2, reviewCount: 40 },
    { id: 'prod_4', name: 'স্টাইলিশ কটন থ্রি-পিস', price: 2250, imageUrl: 'https://i.ibb.co/fDbP2d6/three-piece.jpg', category: 'three-piece', sku: 'FG-TP-020', stock: 10, rating: 4.9, reviewCount: 88 },
    { id: 'prod_5', name: 'প্রিমিয়াম সফট হ্যান্ড গ্লাভস (কালো)', price: 150, originalPrice: 200, imageUrl: 'https://i.ibb.co/XzB6cK7/gloves.jpg', category: 'islamic-item', sku: 'FG-IS-003', stock: 50, rating: 4.0, reviewCount: 32 },
    { id: 'prod_6', name: 'আরবিয়ান চেরি লং খিমার', price: 1150, originalPrice: 1400, imageUrl: 'https://i.ibb.co/P9yF5s1/khimar2.jpg', category: 'long-khimar', sku: 'FG-LK-002', stock: 12, rating: 4.6, reviewCount: 75 },
    { id: 'prod_7', name: 'ইন্দোনেশিয়ান প্রিমিয়াম হিজাব', price: 799, imageUrl: 'https://i.ibb.co/gZ7k2tJ/hijab2.jpg', category: 'hijab', sku: 'FG-HJ-008', stock: 20, rating: 4.7, reviewCount: 95 },
    { id: 'prod_8', name: 'সিমলেস কমফোর্ট ব্রা', price: 850, imageUrl: 'https://i.ibb.co/Qv6Y0yR/bra2.jpg', category: 'innar-collection', sku: 'FG-IN-015', stock: 0, rating: 4.3, reviewCount: 50 },
    { id: 'prod_9', name: 'ডিজিটাল প্রিন্ট কটন থ্রি-পিস', price: 2400, originalPrice: 2800, imageUrl: 'https://i.ibb.co/L5h5q6p/three-piece2.jpg', category: 'three-piece', sku: 'FG-TP-022', stock: 8, rating: 5.0, reviewCount: 110 },
    { id: 'prod_10', name: 'ইসলামিক মোজা (কালো)', price: 90, originalPrice: 150, imageUrl: 'https://i.ibb.co/mH6qgG3/socks.jpg', category: 'islamic-item', sku: 'FG-IS-004', stock: 40, rating: 3.9, reviewCount: 25 },
];

let customers: Customer[] = [
    // This user is designated as the admin for demo purposes.
    {
        id: 'cust_1',
        name: 'আমিনা বেগম',
        email: 'amina@example.com',
        phone: '01712345678',
        totalOrders: 2,
        totalSpent: 1689,
        joinDate: '2024-05-15T10:00:00Z',
        password: 'password123',
        orderIds: ['order_1', 'order_2']
    },
    {
        id: 'cust_2',
        name: 'সাদিয়া আফরিন',
        email: 'sadia@example.com',
        phone: '01812345678',
        totalOrders: 1,
        totalSpent: 2250,
        joinDate: '2024-06-20T14:30:00Z',
        password: 'password123',
        orderIds: ['order_3']
    },
];

let orders: Order[] = [
    {
        id: 'order_1',
        orderId: 'FG-2024-83612',
        customerName: 'আমিনা বেগম',
        customerId: 'cust_1',
        date: '2024-07-22T11:00:00Z',
        totalAmount: 990,
        // FIX: Using OrderStatus enum instead of string literal.
        status: OrderStatus.Delivered,
        items: [{ productId: 'prod_1', quantity: 1, price: 990 }],
        shippingAddress: 'ধানমন্ডি, ঢাকা'
    },
    {
        id: 'order_2',
        orderId: 'FG-2024-91234',
        customerName: 'আমিনা বেগম',
        customerId: 'cust_1',
        date: '2024-07-25T14:20:00Z',
        totalAmount: 699,
        // FIX: Using OrderStatus enum instead of string literal.
        status: OrderStatus.Shipped,
        items: [{ productId: 'prod_2', quantity: 1, price: 699 }],
        shippingAddress: 'ধানমন্ডি, ঢাকা'
    },
    {
        id: 'order_3',
        orderId: 'FG-2024-75643',
        customerName: 'সাদিয়া আফরিন',
        customerId: 'cust_2',
        date: '2024-07-24T09:45:00Z',
        totalAmount: 2250,
        // FIX: Using OrderStatus enum instead of string literal.
        status: OrderStatus.Processing,
        items: [{ productId: 'prod_4', quantity: 1, price: 2250 }],
        shippingAddress: 'কোতোয়ালী, চট্টগ্রাম'
    },
];


// --- API FUNCTIONS ---
const simulateDelay = (delay: number) => new Promise(res => setTimeout(res, delay));

// --- Data Fetching ---
export const getProducts = async (): Promise<Product[]> => {
    await simulateDelay(500);
    return [...products];
};

export const getOrders = async (): Promise<Order[]> => {
    await simulateDelay(500);
    return [...orders];
};

export const getCustomers = async (): Promise<Customer[]> => {
    await simulateDelay(500);
    return [...customers];
};

// --- Authentication ---
export const login = async (email: string, password: string): Promise<Customer | null> => {
    await simulateDelay(700);
    const customer = customers.find(c => c.email.toLowerCase() === email.toLowerCase() && c.password === password);
    return customer || null;
}

export const register = async (newCustomerData: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'joinDate' | 'orderIds'>): Promise<Customer> => {
    await simulateDelay(700);
    const newCustomer: Customer = {
      ...newCustomerData,
      id: `cust_${Date.now()}`,
      totalOrders: 0,
      totalSpent: 0,
      joinDate: new Date().toISOString(),
      orderIds: [],
    };
    customers = [...customers, newCustomer];
    return newCustomer;
}

// --- Order Management ---
export const createOrder = async (orderData: { customerName: string; totalAmount: number; shippingAddress: string; items: OrderItem[] }, currentUser: Customer | null): Promise<Order> => {
    await simulateDelay(1000);
    const newOrderId = `FG-2024-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
        id: `order_${Date.now()}`,
        orderId: newOrderId,
        customerName: orderData.customerName,
        date: new Date().toISOString(),
        totalAmount: orderData.totalAmount,
        status: OrderStatus.Processing,
        items: orderData.items,
        shippingAddress: orderData.shippingAddress,
        customerId: currentUser?.id,
    };
    orders = [newOrder, ...orders];
    
    if (currentUser) {
        customers = customers.map(c => 
            c.id === currentUser.id 
            ? { ...c, orderIds: [...c.orderIds, newOrder.id], totalOrders: c.totalOrders + 1, totalSpent: c.totalSpent + newOrder.totalAmount } 
            : c
        );
    }
    return newOrder;
};

export const getOrderStatus = async (trackingId: string): Promise<OrderStatus> => {
    await simulateDelay(1000);
    const order = orders.find(o => o.orderId === trackingId);
    if (order) {
        return order.status;
    }
    // Simulate random status if not found for demo purposes
    if (trackingId.startsWith("FG-")) {
        const statuses = [OrderStatus.Processing, OrderStatus.Shipped, OrderStatus.Delivered];
        const randomIndex = Math.floor(Math.random() * statuses.length);
        return statuses[randomIndex];
    }
    return OrderStatus.NotFound;
};

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<Order> => {
    await simulateDelay(400);
    let updatedOrder: Order | undefined;
    orders = orders.map(order => {
        if (order.id === orderId) {
            updatedOrder = { ...order, status };
            return updatedOrder;
        }
        return order;
    });
    if (!updatedOrder) throw new Error("Order not found");
    return updatedOrder;
}

// --- Product Management (Admin) ---
export const addProduct = async (newProductData: Omit<Product, 'id' | 'rating' | 'reviewCount'>): Promise<Product> => {
    await simulateDelay(600);
    const newProduct: Product = {
        ...newProductData,
        id: `prod_${Date.now()}`,
        rating: 0,
        reviewCount: 0,
    };
    products = [newProduct, ...products];
    return newProduct;
};

export const updateProduct = async (updatedProductData: Product): Promise<Product> => {
    await simulateDelay(600);
    products = products.map(p => (p.id === updatedProductData.id ? updatedProductData : p));
    return updatedProductData;
}

export const deleteProduct = async (productId: string): Promise<{ success: boolean }> => {
    await simulateDelay(600);
    products = products.filter(p => p.id !== productId);
    return { success: true };
}


// --- Dashboard Widgets ---
export const getSalesSummary = (): Promise<SalesSummary> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
            const totalOrdersCount = orders.length;
            const grossProfit = totalSales * 0.25; // Assuming a 25% fixed margin

            resolve({
                totalSales: `৳ ${totalSales.toLocaleString('bn-BD')}`,
                totalOrders: totalOrdersCount.toLocaleString('bn-BD'),
                grossProfit: `৳ ${grossProfit.toLocaleString('bn-BD')}`
            });
        }, 800);
    });
};