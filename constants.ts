import type { Product, Category, Review, ProductReview, Order, Customer } from './types';

export const districts = [
  'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'সিলেট', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ'
];

export const upazilas: { [key: string]: string[] } = {
  'ঢাকা': ['ধানমন্ডি', 'গুলশান', 'বনানী', 'উত্তরা', 'মিরপুর'],
  'চট্টগ্রাম': ['কোতোয়ালী', 'পাহাড়তলী', 'ডবলমুরিং', 'বন্দর'],
  'রাজশাহী': ['বোয়ালিয়া', 'রাজপাড়া', 'মতিহার', 'শাহমখদুম'],
  'খুলনা': ['খুলনা সদর', 'সোনাডাঙ্গা', 'দৌলতপুর'],
  'সিলেট': ['সিলেট সদর', 'শাহপরাণ', 'জালালাবাদ'],
  'বরিশাল': ['বরিশাল সদর', 'কাউনিয়া', 'বন্দর'],
  'রংপুর': ['রংপুর সদর', 'হারাগাছ', 'তাজহাট'],
  'ময়মনসিংহ': ['ময়মনসিংহ সদর', 'ত্রিশাল', 'মুক্তাগাছা'],
};

export const categories: Category[] = [
    { id: 'all', name: 'সকল'},
    { id: 'long-khimar', name: 'লং খিমার কালেকশন', imageUrl: 'https://i.ibb.co/P9yF5s1/khimar2.jpg' },
    { id: 'three-piece', name: 'থ্রি-পিস', imageUrl: 'https://i.ibb.co/fDbP2d6/three-piece.jpg' },
    { id: 'hijab', name: 'হিজাব কালেকশন', imageUrl: 'https://i.ibb.co/Kz9V31g/hijab.jpg' },
    { id: 'innar-collection', name: 'ইনার কালেকশন', imageUrl: 'https://i.ibb.co/Yd4Bv3D/bra.jpg' },
    { id: 'islamic-item', name: 'ইসলামিক আইটেম', imageUrl: 'https://i.ibb.co/XzB6cK7/gloves.jpg' },
];

export const mockProducts: Product[] = [
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

export const mockProductReviews: ProductReview[] = [
    { id: 'rev1', productId: 'prod_1', author: 'আমিনা বেগম', email: 'amina@example.com', rating: 5, comment: 'খুবই সুন্দর একটি খিমার। কাপড়টা অনেক সফট এবং আরামদায়ক।', date: '2024-07-20T10:00:00Z' },
    { id: 'rev2', productId: 'prod_1', author: 'ফারিয়া সুলতানা', email: 'faria@example.com', rating: 4, comment: 'রঙটা ছবিতে যেমন দেখেছি তেমনই। ডেলিভারিও দ্রুত পেয়েছি।', date: '2024-07-18T15:30:00Z' },
    { id: 'rev3', productId: 'prod_2', author: 'জান্নাতুল ফেরদৌস', email: 'jannat@example.com', rating: 5, comment: 'এই হিজাবটা আমার কালেকশনের সেরা। খুবই প্রিমিয়াম কোয়ালিটি।', date: '2024-07-21T09:00:00Z' },
    { id: 'rev4', productId: 'prod_4', author: 'সাদিয়া আফরিন', email: 'sadia@example.com', rating: 5, comment: 'থ্রি-পিসটা অসাধারণ। ডিজাইন এবং কাপড়ের মান দুটোই খুব ভালো।', date: '2024-07-19T12:00:00Z' },
    { id: 'rev5', productId: 'prod_4', author: 'নুসরাত জাহান', email: 'nusrat@example.com', rating: 4, comment: 'যেমনটা আশা করেছিলাম তেমনই পেয়েছি। ধন্যবাদ।', date: '2024-07-15T18:45:00Z' },
];


export const mockReviews: Review[] = [
    { id: 1, quote: 'ফ্রেন্ডস গ্যালির কালেকশন অসাধারণ। তাদের ব্যবহার এবং ডেলিভারি দুটোই খুব ভালো।', author: 'তাসনিয়া আহমেদ', location: 'ঢাকা', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 2, quote: 'আমি এখান থেকে একটা কুর্তি কিনেছি, কাপড়ের মান খুবই উন্নত। ধন্যবাদ!', author: 'রাবেয়া খাতুন', location: 'খুলনা', rating: 4, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
    { id: 3, quote: 'খুব দ্রুত ডেলিভারি পেয়েছি। প্রোডাক্টের কোয়ালিটিও খুব ভালো। আমি সন্তুষ্ট।', author: 'মরিয়ম আক্তার', location: 'সিলেট', rating: 5, avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
];

export const mockCustomers: Customer[] = [
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

export const mockOrders: Order[] = [
    {
        id: 'order_1',
        orderId: 'FG-2024-83612',
        customerName: 'আমিনা বেগম',
        customerId: 'cust_1',
        date: '2024-07-22T11:00:00Z',
        totalAmount: 990,
        status: 'পৌঁছে গেছে',
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
        status: 'শিপিং-এ',
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
        status: 'প্রক্রিয়াধীন',
        items: [{ productId: 'prod_4', quantity: 1, price: 2250 }],
        shippingAddress: 'কোতোয়ালী, চট্টগ্রাম'
    },
];

export const brands = [
    { name: 'Brand A', logoUrl: 'https://via.placeholder.com/150x50/cccccc/808080?text=Brand+A' },
    { name: 'Brand B', logoUrl: 'https://via.placeholder.com/150x50/cccccc/808080?text=Brand+B' },
    { name: 'Brand C', logoUrl: 'https://via.placeholder.com/150x50/cccccc/808080?text=Brand+C' },
    { name: 'Brand D', logoUrl: 'https://via.placeholder.com/150x50/cccccc/808080?text=Brand+D' },
    { name: 'Brand E', logoUrl: 'https://via.placeholder.com/150x50/cccccc/808080?text=Brand+E' },
    { name: 'Brand F', logoUrl: 'https://via.placeholder.com/150x50/cccccc/808080?text=Brand+F' },
];

export const paymentMethods = [
    { id: 'cod', name: 'ক্যাশ অন ডেলিভারি', icon: 'https://i.ibb.co/pWk2R4z/cod.png' },
    { id: 'bkash', name: 'বিকাশ', icon: 'https://i.ibb.co/fH4C8dF/bkash.png' },
];
