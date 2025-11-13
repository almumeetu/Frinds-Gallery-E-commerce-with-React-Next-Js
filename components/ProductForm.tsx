import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { categories } from '../constants';

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
  onAddProduct: (newProduct: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => void;
  onUpdateProduct: (updatedProduct: Product) => void;
}

const initialFormState: Omit<Product, 'id' | 'rating' | 'reviewCount'> = {
  name: '',
  price: 0,
  originalPrice: undefined,
  imageUrl: '',
  category: 'long-khimar',
  sku: '',
  stock: 0,
};

export const ProductForm: React.FC<ProductFormProps> = ({ product, onClose, onAddProduct, onUpdateProduct }) => {
  const [formData, setFormData] = useState(initialFormState);
  
  useEffect(() => {
    if (product) {
        setFormData({
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            imageUrl: product.imageUrl,
            category: product.category,
            sku: product.sku,
            stock: product.stock,
        });
    } else {
        setFormData(initialFormState);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const isNumberField = ['price', 'originalPrice', 'stock'].includes(name);
    
    // Allow empty string for number fields to clear them
    const processedValue = isNumberField
      ? value === '' ? '' : Number(value)
      : value;

    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalFormData = {
        ...formData,
        originalPrice: formData.originalPrice || undefined
    };
    if (product) {
      onUpdateProduct({ ...product, ...finalFormData });
    } else {
      onAddProduct(finalFormData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
            <div className="flex justify-between items-center border-b pb-3 mb-5">
                <h3 className="text-xl font-semibold text-gray-800">{product ? 'পণ্য সম্পাদনা করুন' : 'নতুন পণ্য যোগ করুন'}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">পণ্যের নাম</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">বিক্রয় মূল্য (৳)</label>
                        <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700">আসল মূল্য (৳) (ঐচ্ছিক)</label>
                        <input type="number" name="originalPrice" id="originalPrice" value={formData.originalPrice || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">ছবির URL</label>
                    <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">ক্যাটাগরি</label>
                        <select name="category" id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                            {categories.filter(c => c.id !== 'all').map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
                        <input type="text" name="sku" id="sku" value={formData.sku} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">স্টক পরিমাণ</label>
                        <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                    </div>
                </div>

                <div className="pt-4 flex justify-end space-x-3 border-t mt-6">
                    <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-semibold hover:bg-gray-300">বাতিল</button>
                    <button type="submit" className="bg-brand-green text-white py-2 px-4 rounded-md font-semibold hover:bg-brand-green-dark">
                        {product ? 'আপডেট করুন' : 'পণ্য যোগ করুন'}
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};
