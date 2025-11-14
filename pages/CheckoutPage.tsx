import React, { useState, useEffect } from 'react';
import type { Product, CartItem, OrderItem, Customer } from '../types';
import { districts, upazilas, paymentMethods } from '../constants';
import { Breadcrumbs } from '../components/Breadcrumbs';
import type { Page } from '../App';

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
  const [selectedDistrict, setSelectedDistrict] = useState('ঢাকা');
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
        setName(currentUser.name);
        setPhone(currentUser.phone);
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedDistrict) {
      setSelectedUpazila(upazilas[selectedDistrict]?.[0] || '');
    }
  }, [selectedDistrict]);

  const cartDetails = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
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
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const fullAddress = `${address}, ${selectedUpazila}, ${selectedDistrict}`;
        
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
    <div className="bg-brand-cream">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'হোম', onClick: () => navigateTo('home') }, { label: 'চেকআউট' }]} />
        <h1 className="text-3xl font-bold text-center my-6">অর্ডার টি সম্পন্ন করতে আপনার নাম, মোবাইল নাম্বার ও ঠিকানা নিচে লিখুন</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          {/* Billing Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4">বিলিং ডিটেইল</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-base font-medium text-slate-700 mb-1">আপনার নাম লিখুন *</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-base font-medium text-slate-700 mb-1">আপনার মোবাইল নাম্বার লিখুন *</label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
               <div>
                <label className="block text-base font-medium text-slate-700">এলাকা সিলেক্ট করুন *</label>
                <div className="flex space-x-4 mt-2">
                    <label className="flex items-center"><input type="radio" name="area" value="ঢাকা" checked={selectedDistrict === 'ঢাকা'} onChange={(e) => setSelectedDistrict(e.target.value)}/> <span className="ml-2">ঢাকার ভিতরে</span></label>
                    <label className="flex items-center"><input type="radio" name="area" value="অন্যান্য" checked={selectedDistrict !== 'ঢাকা'} onChange={() => setSelectedDistrict('চট্টগ্রাম')}/> <span className="ml-2">ঢাকার বাইরে</span></label>
                </div>
              </div>
              <div>
                <label htmlFor="address" className="block text-base font-medium text-slate-700 mb-1">সম্পূর্ণ ঠিকানা *</label>
                <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required rows={3}></textarea>
              </div>
               <div>
                <label htmlFor="notes" className="block text-base font-medium text-slate-700 mb-1">নোট (অপশনাল)</label>
                <textarea id="notes" rows={2} placeholder="Test order for UI checking..."></textarea>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mt-8 lg:mt-0">
            <h2 className="text-2xl font-semibold mb-4">প্রোডাক্ট ডিটেইল</h2>
            <div className="space-y-4">
              {cartDetails.map(item => (
                <div key={item.productId} className="flex items-center space-x-4">
                  <img src={item.product!.imageUrl} alt={item.product!.name} className="w-16 h-16 rounded-md object-cover"/>
                  <div className="flex-grow">
                    <p className="font-semibold text-base">{item.product!.name}</p>
                    <div className="flex items-center mt-1">
                      <p className="text-sm text-slate-600">Qty:</p>
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
            <div className="mt-6 border-t pt-4 space-y-2 text-base">
                <div className="flex justify-between"><span>সাব-টোটাল (+)</span> <span className="font-semibold">৳{subtotal.toLocaleString('bn-BD')}</span></div>
                <div className="flex justify-between"><span>ডেলিভারি চার্জ (+)</span> <span className="font-semibold">৳{deliveryCharge.toLocaleString('bn-BD')}</span></div>
                <div className="flex justify-between text-xl font-bold"><span>মোট</span> <span>৳{total.toLocaleString('bn-BD')}</span></div>
            </div>
            <div className="mt-6">
                 <div className="grid grid-cols-2 gap-2">
                    {paymentMethods.map(method => (
                        <label key={method.id} className={`flex items-center p-2 border rounded-md cursor-pointer ${paymentMethod === method.id ? 'border-brand-green bg-green-50' : ''}`}>
                            <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value)}/>
                            <img src={method.icon} alt={method.name} className="h-6 ml-3" />
                        </label>
                    ))}
                 </div>
            </div>
            <div className="mt-6">
                <button type="submit" disabled={isSubmitting || cart.length === 0} className="w-full bg-brand-green text-white py-3 rounded-lg text-xl font-bold hover:bg-brand-green-dark disabled:bg-slate-400">
                    {isSubmitting ? 'প্রসেসিং...' : `অর্ডার টি কনফার্ম করুন ৳${total.toLocaleString('bn-BD')}`}
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};