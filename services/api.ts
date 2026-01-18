import { productServiceAdapter, categoryServiceAdapter } from './backendAdapter';
import { wordpressOrderService, wordpressAuthService, wordpressCheckoutService } from './wordpressGraphQL';
import { supabase } from './supabase';
import type { Product, Category, Order, Customer, SalesSummary, OrderItem } from '../types';
import { OrderStatus } from '../types';

// --- WORDPRESS GRAPHQL BACKEND ---
// All data now comes from WordPress via GraphQL

// Local product images mapping
const productImageMap: { [sku: string]: string } = {
  'FG-LK-001': '/images/products/lehengga-1.webp',
  'FG-HJ-005': '/images/products/lehengga-2.webp',
  'FG-IN-012': '/images/products/lehengga-3.webp',
  'FG-TP-020': '/images/products/lehengga-4.webp',
  'FG-IS-003': '/images/products/lehengga-5.webp',
  'FG-LK-002': '/images/products/lehengga-6.webp',
  'FG-HJ-008': '/images/products/modern-dress.webp',
  'FG-IN-015': '/images/products/modern-dress-2.webp',
  'FG-TP-022': '/images/products/threepic-1.webp',
  'FG-IS-004': '/images/products/threepics-3.webp',
  'FG-EX-001': '/images/products/thereepices-2.webp',
  'FG-EX-002': '/images/products/thereepices-4.webp',
  'FG-EX-003': '/images/products/thereepices-5.webp',
  'FG-EX-004': '/images/products/thereepics-4.webp',
};

// Helper to map database columns to frontend types
const mapProduct = (data: any): Product => ({
  id: data.id,
  name: data.name,
  price: Number(data.price),
  originalPrice: data.original_price ? Number(data.original_price) : undefined,
  imageUrl: productImageMap[data.sku] || data.image_url, // Use local image if mapped, else fallback
  category: data.category,
  sku: data.sku,
  stock: data.stock,
  rating: Number(data.rating),
  reviewCount: data.review_count
});

const mapOrder = (data: any): Order => ({
  id: data.id,
  orderId: data.order_id,
  customerName: data.customer_name,
  customerId: data.customer_id,
  date: data.date,
  totalAmount: Number(data.total_amount),
  status: data.status as OrderStatus,
  items: data.items,
  shippingAddress: data.shipping_address
});

const mapCustomer = (data: any): Customer => ({
  id: data.id,
  name: data.name,
  email: data.email,
  phone: data.phone,
  totalOrders: data.total_orders,
  totalSpent: Number(data.total_spent),
  joinDate: data.join_date,
  password: data.password,
  orderIds: data.order_ids || []
});

// --- Data Fetching from WordPress ---
export const getProducts = async (): Promise<Product[]> => {
  try {
    const products = await productServiceAdapter.getAllProducts();
    console.log(`[API] Fetched ${products.length} products`);
    return products;
  } catch (error) {
    console.error('Error fetching products from WordPress:', error);
    return [];
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    return await categoryServiceAdapter.getAllCategories();
  } catch (error) {
    console.error('Error fetching categories from WordPress:', error);
    return [];
  }
};


export const getOrders = async (customerId?: string): Promise<Order[]> => {
  if (!customerId) return [];
  try {
    return await wordpressOrderService.getCustomerOrders(customerId);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export const getCustomers = async (): Promise<Customer[]> => {
  // Customers will be managed via WordPress users (future enhancement)
  console.log('Customers: Using local storage (WordPress customers not yet implemented)');
  return [];
};

// --- Authentication (Local Storage) ---
export const login = async (email: string, password: string): Promise<Customer | null> => {
  try {
    // Attempt login via WordPress
    const response = await wordpressAuthService.login(email, password);
    if (response?.user && response?.authToken) {
      // Map WP user to App Customer
      const customer: Customer = {
        id: String(response.user.databaseId), // Use databaseId as reliable numeric string
        name: response.user.name || `${response.user.firstName} ${response.user.lastName}`,
        email: response.user.email,
        phone: '', // WP doesn't always return phone in basic user query
        totalOrders: 0,
        totalSpent: 0,
        joinDate: new Date().toISOString(),
        password: '', // Don't store password
        orderIds: [],
        token: response.authToken // Store token for future requests
      } as Customer;

      return customer;
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
  return null;
};

export const register = async (newCustomerData: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'joinDate' | 'orderIds'>): Promise<Customer> => {
  try {
    const response = await wordpressAuthService.register(newCustomerData);
    if (response?.user) {
      return {
        ...newCustomerData,
        id: String(response.user.databaseId),
        totalOrders: 0,
        totalSpent: 0,
        joinDate: new Date().toISOString(),
        orderIds: []
      } as Customer;
    }
    throw new Error('Registration failed');
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// --- Order Management (Local Storage) ---
export const createOrder = async (
  orderData: { customerName: string; phone?: string; totalAmount: number; shippingAddress: string; items: OrderItem[]; billing?: any; shipping?: any; note?: string; paymentMethod?: string },
  currentUser: Customer | null
): Promise<Order> => {
  try {
    // Use WordPress Checkout
    const result = await wordpressCheckoutService.checkout({
      items: orderData.items,
      billing: orderData.billing || {
        firstName: orderData.customerName.split(' ')[0],
        lastName: orderData.customerName.split(' ')[1] || 'User',
        address1: orderData.shippingAddress,
        city: 'Dhaka',
        postcode: '1000',
        country: 'BD',
        email: currentUser?.email || 'guest@example.com',
        phone: orderData.phone || '01700000000',
      },
      shipping: orderData.shipping,
      paymentMethod: orderData.paymentMethod || 'cod',
      note: orderData.note
    });

    if (result?.order) {
      // Return mapped order
      return {
        id: String(result.order.databaseId),
        orderId: `ORD-${result.order.orderNumber}`,
        customerName: orderData.customerName,
        customerId: currentUser?.id,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        shippingAddress: orderData.shippingAddress,
        status: OrderStatus.Processing, // Default until we get real status
        date: new Date().toISOString()
      };
    }

    // Fallback if checkout didn't return order object directly but succeeded
    if (result?.result === 'success') {
      return {
        id: 'temp_pending',
        orderId: 'PENDING',
        customerName: orderData.customerName,
        customerId: currentUser?.id,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        shippingAddress: orderData.shippingAddress,
        status: OrderStatus.Processing,
        date: new Date().toISOString()
      };
    }

    throw new Error('Checkout failed: ' + JSON.stringify(result));
  } catch (error) {
    console.error('Create Order Error:', error);
    throw error;
  }
};

export const getOrderStatus = async (trackingId: string): Promise<OrderStatus> => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const order = orders.find((o: Order) => o.orderId === trackingId);
  return order?.status || OrderStatus.NotFound;
};

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<Order> => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    throw new Error('Order update failed: ' + error.message);
  }

  return mapOrder(data);
};

// --- Product Management (WordPress Admin Panel) ---
export const addProduct = async (newProductData: Omit<Product, 'id' | 'rating' | 'reviewCount'>): Promise<Product> => {
  console.warn('⚠️ Products should be added in WordPress admin panel');
  throw new Error('Please add products in WordPress admin → Products → Add New');
};

export const updateProduct = async (updatedProductData: Product): Promise<Product> => {
  console.warn('⚠️ Products should be updated in WordPress admin panel');
  throw new Error('Please update products in WordPress admin → Products → Edit');
};

export const deleteProduct = async (productId: string): Promise<{ success: boolean }> => {
  console.warn('⚠️ Products should be deleted in WordPress admin panel');
  throw new Error('Please delete products in WordPress admin → Products → Trash');
};

// --- Dashboard Widgets (Local Storage) ---
export const getSalesSummary = async (): Promise<SalesSummary> => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');

  const totalSales = orders.reduce((sum: number, order: Order) => sum + order.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const grossProfit = totalSales * 0.25; // Assuming a 25% fixed margin

  return {
    totalSales: `৳ ${totalSales.toLocaleString('bn-BD')}`,
    totalOrders: totalOrdersCount.toLocaleString('bn-BD'),
    grossProfit: `৳ ${grossProfit.toLocaleString('bn-BD')}`
  };
};
