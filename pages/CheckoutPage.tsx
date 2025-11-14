import React, { useState, useEffect } from 'react';
import type { Product, CartItem, OrderItem, Customer } from '../types';
import { paymentMethods } from '../constants';
import { Breadcrumbs } from '../components/Breadcrumbs';
import type { Page } from '../App';
import { XMarkIcon } from '../components/icons';


interface CheckoutPageProps {
  cart: CartItem[];
  products: Product[];
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  onPlaceOrder: (orderData: { customerName: string; totalAmount: number; shippingAddress: string; items: OrderItem[] }) => void;
  navigateTo: (page: Page) => void;
  currentUser: Customer | null;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, products, updateCartQuantity, removeFromCart, onPlaceOrder, navigateTo, currentUser }) => {
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('inside'); // 'inside' or 'outside'
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
        setName(currentUser.name);
        setPhone(currentUser.phone);
    }
  }, [currentUser]);

  const cartDetails = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const subtotal = cartDetails.reduce((sum, item) => sum + item.product!.price * item.quantity, 0);
  const deliveryCharge = deliveryLocation === 'inside' ? 80 : 150;
  const total = subtotal + deliveryCharge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
        alert("আপনার কার্ট খালি।");
        return;
    }
    setIsSubmitting(true);
    
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const fullAddress = `${address}, ঢাকা ${deliveryLocation === 'inside' ? 'এর ভিতরে' : 'এর বাইরে'}`;
        
        onPlaceOrder({
            customerName: name,
            totalAmount: total,
            shippingAddress: fullAddress,
            items: cartDetails.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.product!.price,
            })),
        });
    } catch (error) {
        alert('অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'হোম', onClick: () => navigateTo('home') }, { label: 'শপ', onClick: () => navigateTo('shop') }, { label: 'চেকআউট' }]} />
        <h1 className="text-3xl font-bold text-center my-8">চেকআউট</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Billing Details */}
          <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm border lg:col-span-7">
            <h2 className="text-2xl font-semibold mb-6">বিলিং তথ্য</h2>
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-base font-medium text-slate-700 mb-1">আপনার নাম *</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-base font-medium text-slate-700 mb-1">আপনার মোবাইল নাম্বার *</label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
               <div>
                <label className="block text-base font-medium text-slate-700 mb-2">ডেলিভারি এলাকা *</label>
                <div className="flex space-x-4">
                    <label className="flex items-center"><input type="radio" name="area" value="inside" checked={deliveryLocation === 'inside'} onChange={(e) => setDeliveryLocation(e.target.value)}/> <span className="ml-2">ঢাকার ভিতরে</span></label>
                    <label className="flex items-center"><input type="radio" name="area" value="outside" checked={deliveryLocation === 'outside'} onChange={(e) => setDeliveryLocation(e.target.value)}/> <span className="ml-2">ঢাকার বাইরে</span></label>
                </div>
              </div>
              <div>
                <label htmlFor="address" className="block text-base font-medium text-slate-700 mb-1">সম্পূর্ণ ঠিকানা *</label>
                <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required rows={3} placeholder="বাসা/হোল্ডিং, রোড, থানা"></textarea>
              </div>
               <div>
                <label htmlFor="notes" className="block text-base font-medium text-slate-700 mb-1">বিশেষ নোট (ঐচ্ছিক)</label>
                <textarea id="notes" rows={2} placeholder="অর্ডার সম্পর্কিত কোনো বিশেষ নির্দেশনা থাকলে লিখুন..."></textarea>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 lg:p-8 rounded-xl shadow-sm border mt-8 lg:mt-0 lg:col-span-5 lg:sticky lg:top-28">
            <h2 className="text-2xl font-semibold mb-6">আপনার অর্ডার</h2>
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {cartDetails.map(item => (
                <div key={item.productId} className="flex items-start space-x-4">
                  <img src={item.product!.imageUrl} alt={item.product!.name} className="w-20 h-20 rounded-lg object-cover"/>
                  <div className="flex-grow">
                    <p className="font-semibold text-base leading-tight">{item.product!.name}</p>
                    <p className="text-sm text-slate-600 mt-1">পরিমাণ: {item.quantity}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                     <p className="font-semibold text-brand-dark">৳{(item.product!.price * item.quantity).toLocaleString('bn-BD')}</p>
                     <button type="button" onClick={() => removeFromCart(item.productId)} className="text-xs text-red-500 hover:underline mt-1 flex items-center ml-auto">
                        <XMarkIcon className="h-3 w-3 mr-1" /> মুছুন
                     </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t pt-4 space-y-2 text-base">
                <div className="flex justify-between text-slate-600"><span>সাব-টোটাল</span> <span className="font-medium">৳{subtotal.toLocaleString('bn-BD')}</span></div>
                <div className="flex justify-between text-slate-600"><span>ডেলিভারি চার্জ</span> <span className="font-medium">৳{deliveryCharge.toLocaleString('bn-BD')}</span></div>
                <div className="flex justify-between text-xl font-bold text-brand-dark mt-2 pt-2 border-t"><span>মোট</span> <span>৳{total.toLocaleString('bn-BD')}</span></div>
            </div>
            <div className="mt-6">
                 <h3 className="text-lg font-semibold mb-2">পেমেন্ট পদ্ধতি</h3>
                 <div className="grid grid-cols-2 gap-2">
                    {paymentMethods.map(method => (
                        <label key={method.id} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${paymentMethod === method.id ? 'border-brand-green bg-green-50 ring-2 ring-brand-green' : 'border-slate-300'}`}>
                            <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value)} className="h-5 w-5"/>
                            <img src={method.icon} alt={method.name} className="h-6 ml-4" />
                        </label>
                    ))}
                 </div>
            </div>
            <div className="mt-6">
                <button type="submit" disabled={isSubmitting || cart.length === 0} className="w-full bg-brand-green text-white py-3 rounded-lg text-lg font-bold hover:bg-brand-green-dark disabled:bg-slate-400 disabled:cursor-not-allowed transition-transform transform hover:scale-105">
                    {isSubmitting ? 'প্রসেসিং...' : `অর্ডার কনফার্ম করুন`}
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};