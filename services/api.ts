import { productServiceAdapter, categoryServiceAdapter } from './backendAdapter';
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
    return await productServiceAdapter.getAllProducts();
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


export const getOrders = async (): Promise<Order[]> => {
  // Orders will be stored locally or in WordPress (future enhancement)
  console.log('Orders: Using local storage (WordPress orders not yet implemented)');
  return [];
};

export const getCustomers = async (): Promise<Customer[]> => {
  // Customers will be managed via WordPress users (future enhancement)
  console.log('Customers: Using local storage (WordPress customers not yet implemented)');
  return [];
};

// --- Authentication (Local Storage) ---
export const login = async (email: string, password: string): Promise<Customer | null> => {
  // Using localStorage for now (WordPress users integration coming)
  const customers = JSON.parse(localStorage.getItem('customers') || '[]');
  const customer = customers.find((c: Customer) => 
    c.email.toLowerCase() === email.toLowerCase() && c.password === password
  );
  return customer || null;
};

export const register = async (newCustomerData: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'joinDate' | 'orderIds'>): Promise<Customer> => {
  const customers = JSON.parse(localStorage.getItem('customers') || '[]');
  const newCustomer: Customer = {
    ...newCustomerData,
    id: `cust_${Date.now()}`,
    totalOrders: 0,
    totalSpent: 0,
    joinDate: new Date().toISOString(),
    orderIds: []
  };
  customers.push(newCustomer);
  localStorage.setItem('customers', JSON.stringify(customers));
  return newCustomer;
};

// --- Order Management (Local Storage) ---
export const createOrder = async (
  orderData: { customerName: string; totalAmount: number; shippingAddress: string; items: OrderItem[] }, 
  currentUser: Customer | null
): Promise<Order> => {
  const orderId = `FG-${Date.now()}`;
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  
  const newOrder: Order = {
    id: `ord_${Date.now()}`,
    orderId,
    customerName: orderData.customerName,
    customerId: currentUser?.id,
    items: orderData.items,
    totalAmount: orderData.totalAmount,
    shippingAddress: orderData.shippingAddress,
    status: OrderStatus.Processing,
    date: new Date().toISOString()
  };
  
  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
  
  // Update customer stats if logged in
  if (currentUser) {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const customerIndex = customers.findIndex((c: Customer) => c.id === currentUser.id);
    if (customerIndex !== -1) {
      customers[customerIndex].totalOrders += 1;
      customers[customerIndex].totalSpent += orderData.totalAmount;
      customers[customerIndex].orderIds.push(newOrder.id);
      localStorage.setItem('customers', JSON.stringify(customers));
    }
  }
  
  return newOrder;
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
 