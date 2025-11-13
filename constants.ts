import type { Product, Category, Review } from './types';

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
    { id: 'long-khimar', name: 'লং খিমার কালেকশন', imageUrl: 'https://picsum.photos/400/300?random=11' },
    { id: 'three-piece', name: 'থ্রি-পিস', imageUrl: 'https://picsum.photos/400/300?random=12' },
    { id: 'hijab', name: 'হিজাব কালেকশন', imageUrl: 'https://picsum.photos/400/300?random=13' },
    { id: 'innar-collection', name: 'ইনার কালেকশন', imageUrl: 'https://picsum.photos/400/300?random=14' },
    { id: 'islamic-item', name: 'ইসলামিক আইটেম', imageUrl: 'https://picsum.photos/400/300?random=15' },
];

export const mockProducts: Product[] = [
    { id: 'prod_1', name: 'জিলবাব লং খিমার', price: 990, originalPrice: 1200, imageUrl: 'https://picsum.photos/400/500?random=1', category: 'long-khimar', sku: 'FG-LK-001', stock: 15, rating: 4.5, reviewCount: 65 },
    { id: 'prod_2', name: 'প্রিমিয়াম জর্জেট হিজাব', price: 699, originalPrice: 999, imageUrl: 'https://picsum.photos/400/500?random=2', category: 'hijab', sku: 'FG-HJ-005', stock: 25, rating: 4.8, reviewCount: 120 },
    { id: 'prod_3', name: 'কমফোর্ট ফিট ফুল কভারেজ ব্রা', price: 750, imageUrl: 'https://picsum.photos/400/500?random=3', category: 'innar-collection', sku: 'FG-IN-012', stock: 30, rating: 4.2, reviewCount: 40 },
    { id: 'prod_4', name: 'স্টাইলিশ কটন থ্রি-পিস', price: 2250, imageUrl: 'https://picsum.photos/400/500?random=4', category: 'three-piece', sku: 'FG-TP-020', stock: 10, rating: 4.9, reviewCount: 88 },
    { id: 'prod_5', name: 'প্রিমিয়াম সফট হ্যান্ড গ্লাভস (কালো)', price: 150, originalPrice: 200, imageUrl: 'https://picsum.photos/400/500?random=5', category: 'islamic-item', sku: 'FG-IS-003', stock: 50, rating: 4.0, reviewCount: 32 },
    { id: 'prod_6', name: 'আরবিয়ান চেরি লং খিমার', price: 1150, originalPrice: 1400, imageUrl: 'https://picsum.photos/400/500?random=6', category: 'long-khimar', sku: 'FG-LK-002', stock: 12, rating: 4.6, reviewCount: 75 },
    { id: 'prod_7', name: 'ইন্দোনেশিয়ান প্রিমিয়াম হিজাব', price: 799, imageUrl: 'https://picsum.photos/400/500?random=7', category: 'hijab', sku: 'FG-HJ-008', stock: 20, rating: 4.7, reviewCount: 95 },
    { id: 'prod_8', name: 'সিমলেস কমফোর্ট ব্রা', price: 850, imageUrl: 'https://picsum.photos/400/500?random=8', category: 'innar-collection', sku: 'FG-IN-015', stock: 0, rating: 4.3, reviewCount: 50 },
    { id: 'prod_9', name: 'ডিজিটাল প্রিন্ট কটন থ্রি-পিস', price: 2400, originalPrice: 2800, imageUrl: 'https://picsum.photos/400/500?random=9', category: 'three-piece', sku: 'FG-TP-022', stock: 8, rating: 5.0, reviewCount: 110 },
    { id: 'prod_10', name: 'ইসলামিক মোজা (কালো)', price: 90, originalPrice: 150, imageUrl: 'https://picsum.photos/400/500?random=10', category: 'islamic-item', sku: 'FG-IS-004', stock: 40, rating: 3.9, reviewCount: 25 },
];

export const mockReviews: Review[] = [
    { id: 1, quote: 'ফ্রেন্ডস গ্যালির কালেকশন অসাধারণ। তাদের ব্যবহার এবং ডেলিভারি দুটোই খুব ভালো।', author: 'তাসনিয়া আহমেদ', location: 'ঢাকা' },
    { id: 2, quote: 'আমি এখান থেকে একটা কুর্তি কিনেছি, কাপড়ের মান খুবই উন্নত। ধন্যবাদ!', author: 'ফারহানা ইসলাম', location: 'চট্টগ্রাম' },
    { id: 3, quote: 'সময়মতো ডেলিভারি পেয়েছি। পণ্যের সাথে ছবির শতভাগ মিল ছিল। আবারও কিনব।', author: 'সাদিয়া রহমান', location: 'খুলনা' },
];

export const paymentMethods = [
    { id: 'cod', name: 'Cash On Delivery', icon: 'https://i.ibb.co/pWk2R4z/cod.png' },
    { id: 'bkash', name: 'bKash', icon: 'https://i.ibb.co/fH4C8dF/bkash.png' },
    { id: 'nagad', name: 'Nagad', icon: 'https://i.ibb.co/pnv1p2h/nagad.png' },
    { id: 'rocket', name: 'Rocket', icon: 'https://i.ibb.co/qMsFWpP/rocket.png' },
];

export const brands = [
    { name: 'Brand A', logoUrl: 'https://picsum.photos/200/100?random=21' },
    { name: 'Brand B', logoUrl: 'https://picsum.photos/200/100?random=22' },
    { name: 'Brand C', logoUrl: 'https://picsum.photos/200/100?random=23' },
    { name: 'Brand D', logoUrl: 'https://picsum.photos/200/100?random=24' },
    { name: 'Brand E', logoUrl: 'https://picsum.photos/200/100?random=25' },
    { name: 'Brand F', logoUrl: 'https://picsum.photos/200/100?random=26' },
];