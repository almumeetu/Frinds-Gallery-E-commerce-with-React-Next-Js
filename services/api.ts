import { supabase } from './supabase';
import type { Product, Order, Customer, SalesSummary, OrderItem } from '../types';
import { OrderStatus } from '../types';

// --- REAL SUPABASE BACKEND ---
// All data now comes from Supabase database

// Helper to map database columns to frontend types
const mapProduct = (data: any): Product => ({
  id: data.id,
  name: data.name,
  price: Number(data.price),
  originalPrice: data.original_price ? Number(data.original_price) : undefined,
  imageUrl: data.image_url,
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

// --- Data Fetching ---
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return (data || []).map(mapProduct);
};

export const getOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  
  return (data || []).map(mapOrder);
};

export const getCustomers = async (): Promise<Customer[]> => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('join_date', { ascending: false });

  if (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
  
  return (data || []).map(mapCustomer);
};

// --- Authentication ---
export const login = async (email: string, password: string): Promise<Customer | null> => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('email', email.toLowerCase())
    .eq('password', password)
    .single();

  if (error || !data) {
    return null;
  }
  
  return mapCustomer(data);
};

export const register = async (newCustomerData: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'joinDate' | 'orderIds'>): Promise<Customer> => {
  const { data, error } = await supabase
    .from('customers')
    .insert([{
      name: newCustomerData.name,
      email: newCustomerData.email.toLowerCase(),
      phone: newCustomerData.phone,
      password: newCustomerData.password,
      total_orders: 0,
      total_spent: 0,
      join_date: new Date().toISOString(),
      order_ids: []
    }])
    .select()
    .single();

  if (error) {
    throw new Error('Registration failed: ' + error.message);
  }
  
  return mapCustomer(data);
};

// --- Order Management ---
export const createOrder = async (
  orderData: { customerName: string; totalAmount: number; shippingAddress: string; items: OrderItem[] }, 
  currentUser: Customer | null
): Promise<Order> => {
  const orderId = `FG-${Date.now()}`;
  
  const { data, error } = await supabase
    .from('orders')
    .insert([{
      order_id: orderId,
      customer_name: orderData.customerName,
      customer_id: currentUser?.id,
      items: orderData.items,
      total_amount: orderData.totalAmount,
      shipping_address: orderData.shippingAddress,
      status: OrderStatus.Processing,
      date: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    throw new Error('Order creation failed: ' + error.message);
  }

  // Update customer stats if logged in
  if (currentUser) {
    await supabase
      .from('customers')
      .update({
        total_orders: currentUser.totalOrders + 1,
        total_spent: currentUser.totalSpent + orderData.totalAmount,
        order_ids: [...currentUser.orderIds, data.id]
      })
      .eq('id', currentUser.id);
  }
  
  return mapOrder(data);
};

export const getOrderStatus = async (trackingId: string): Promise<OrderStatus> => {
  const { data, error } = await supabase
    .from('orders')
    .select('status')
    .eq('order_id', trackingId)
    .single();

  if (error || !data) {
    return OrderStatus.NotFound;
  }
  
  return data.status as OrderStatus;
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

// --- Product Management (Admin) ---
export const addProduct = async (newProductData: Omit<Product, 'id' | 'rating' | 'reviewCount'>): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert([{
      name: newProductData.name,
      price: newProductData.price,
      original_price: newProductData.originalPrice,
      image_url: newProductData.imageUrl,
      category: newProductData.category,
      sku: newProductData.sku,
      stock: newProductData.stock,
      rating: 0,
      review_count: 0
    }])
    .select()
    .single();

  if (error) {
    throw new Error('Product creation failed: ' + error.message);
  }
  
  return mapProduct(data);
};

export const updateProduct = async (updatedProductData: Product): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .update({
      name: updatedProductData.name,
      price: updatedProductData.price,
      original_price: updatedProductData.originalPrice,
      image_url: updatedProductData.imageUrl,
      category: updatedProductData.category,
      sku: updatedProductData.sku,
      stock: updatedProductData.stock,
      rating: updatedProductData.rating,
      review_count: updatedProductData.reviewCount
    })
    .eq('id', updatedProductData.id)
    .select()
    .single();

  if (error) {
    throw new Error('Product update failed: ' + error.message);
  }
  
  return mapProduct(data);
};

export const deleteProduct = async (productId: string): Promise<{ success: boolean }> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    throw new Error('Product deletion failed: ' + error.message);
  }
  
  return { success: true };
};

// --- Dashboard Widgets ---
export const getSalesSummary = async (): Promise<SalesSummary> => {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('total_amount, status');

  if (error) {
    return {
      totalSales: '৳ 0',
      totalOrders: '0',
      grossProfit: '৳ 0'
    };
  }

  const totalSales = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
  const totalOrdersCount = orders.length;
  const grossProfit = totalSales * 0.25; // Assuming a 25% fixed margin

  return {
    totalSales: `৳ ${totalSales.toLocaleString('bn-BD')}`,
    totalOrders: totalOrdersCount.toLocaleString('bn-BD'),
    grossProfit: `৳ ${grossProfit.toLocaleString('bn-BD')}`
  };
};
 