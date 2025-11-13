import React, { useState, useEffect } from 'react';
import type { CartItem, OrderDetails } from '../types';
import { mockProducts, districts, upazilas, paymentMethods } from '../constants';
import { createOrder } from '../services/api';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface CheckoutPageProps {
  cart: CartItem[];
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  onPlaceOrder: (orderDetails: OrderDetails) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, updateCartQuantity, removeFromCart, onPlaceOrder }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedDistrict) {
      setSelectedUpazila(upazilas[selectedDistrict]?.[0] || '');
    }
  }, [selectedDistrict]);

  const cartDetails = cart.map(item => {
    const product = mockProducts.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const subtotal = cartDetails.reduce((sum, item) => sum + item.product!.price * item.quantity, 0);
  const deliveryCharge = selectedDistrict === 'ঢাকা' ? 80 : 150;
  const total = subtotal + deliveryCharge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
        alert("আপনার কার্ট খালি।");
        return;
    }
    setIsSubmitting(true);
    
    try {
        const result = await createOrder({ district: selectedDistrict });
        onPlaceOrder({
            orderId: result.orderId,
            customerName: name,
            totalAmount: total,
        });
    } catch (error) {
        alert('অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'হোম', href: '#' }, { label: 'চেকআউট' }]} />
        <h1 className="text-2xl font-bold text-center my-6">অর্ডার টি সম্পন্ন করতে আপনার নাম, মোবাইল নাম্বার ও ঠিকানা নিচে লিখুন</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          {/* Billing Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">বিলিং ডিটেইল</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">আপনার নাম লিখুন *</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">আপনার মোবাইল নাম্বার লিখুন *</label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700">এলাকা সিলেক্ট করুন *</label>
                <div className="flex space-x-4 mt-1">
                    <label className="flex items-center"><input type="radio" name="area" value="ঢাকা" checked={selectedDistrict === 'ঢাকা'} onChange={(e) => setSelectedDistrict(e.target.value)} className="text-brand-green"/> <span className="ml-2">ঢাকার ভিতরে</span></label>
                    <label className="flex items-center"><input type="radio" name="area" value="অন্যান্য" checked={selectedDistrict !== 'ঢাকা'} onChange={() => setSelectedDistrict('চট্টগ্রাম')} className="text-brand-green"/> <span className="ml-2">ঢাকার বাইরে</span></label>
                </div>
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">সম্পূর্ণ ঠিকানা *</label>
                <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
              </div>
               <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">নোট (অপশনাল)</label>
                <textarea id="notes" rows={2} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Test order for UI checking..."></textarea>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mt-8 lg:mt-0">
            <h2 className="text-xl font-semibold mb-4">প্রোডাক্ট ডিটেইল</h2>
            <div className="space-y-4">
              {cartDetails.map(item => (
                <div key={item.productId} className="flex items-center space-x-4">
                  <img src={item.product!.imageUrl} alt={item.product!.name} className="w-16 h-16 rounded-md object-cover"/>
                  <div className="flex-grow">
                    <p className="font-semibold text-sm">{item.product!.name}</p>
                    <div className="flex items-center mt-1">
                      <p className="text-xs text-gray-600">Qty:</p>
                      <div className="flex items-center border rounded ml-2">
                        <button type="button" onClick={() => updateCartQuantity(item.productId, item.quantity - 1)} className="px-2 text-lg">-</button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button type="button" onClick={() => updateCartQuantity(item.productId, item.quantity + 1)} className="px-2 text-lg">+</button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="font-semibold text-brand-green">৳{(item.product!.price * item.quantity).toLocaleString('bn-BD')}</p>
                     <button type="button" onClick={() => removeFromCart(item.productId)} className="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>সাব-টোটাল (+)</span> <span className="font-semibold">৳{subtotal.toLocaleString('bn-BD')}</span></div>
                <div className="flex justify-between"><span>ডেলিভারি চার্জ (+)</span> <span className="font-semibold">৳{deliveryCharge.toLocaleString('bn-BD')}</span></div>
                <div className="flex justify-between text-lg font-bold"><span>মোট</span> <span>৳{total.toLocaleString('bn-BD')}</span></div>
            </div>
            <div className="mt-6">
                 <div className="grid grid-cols-2 gap-2">
                    {paymentMethods.map(method => (
                        <label key={method.id} className={`flex items-center p-2 border rounded-md cursor-pointer ${paymentMethod === method.id ? 'border-brand-green bg-green-50' : ''}`}>
                            <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value)} className="h-4 w-4 text-brand-green border-gray-300"/>
                            <img src={method.icon} alt={method.name} className="h-6 ml-3" />
                        </label>
                    ))}
                 </div>
            </div>
            <div className="mt-6">
                <button type="submit" disabled={isSubmitting} className="w-full bg-brand-green text-white py-3 rounded-lg text-lg font-bold hover:bg-brand-green-dark disabled:bg-gray-400">
                    {isSubmitting ? 'প্রসেসিং...' : `অর্ডার টি কনফার্ম করুন ৳${total.toLocaleString('bn-BD')}`}
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};