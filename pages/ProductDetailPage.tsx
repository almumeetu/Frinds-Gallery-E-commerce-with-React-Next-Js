import React, { useState, useEffect } from 'react';
import type { Product, ProductReview } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCarousel } from '../components/ProductCarousel';
import { categories, mockProductReviews } from '../constants';
import type { Page } from '../App';
import { ProductReviews } from '../components/ProductReviews';
import { HeartIcon, PlusIcon, MinusIcon } from '../components/icons';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  addToCart: (productId: string, quantity: number) => void;
  buyNow: (productId: string, quantity: number) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  onProductSelect: (product: Product) => void;
  onQuickView: (product: Product) => void;
  navigateTo: (page: Page) => void;
  navigateToShop: (categoryId: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, allProducts, addToCart, buyNow, wishlist, toggleWishlist, onProductSelect, onQuickView, navigateTo, navigateToShop }) => {
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<ProductReview[]>([]);

  useEffect(() => {
    setReviews(mockProductReviews.filter(r => r.productId === product.id));
    // Reset quantity to 1 when product changes
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [product]);

  const handleReviewSubmit = (newReviewData: Omit<ProductReview, 'id' | 'date'>) => {
    const newReview: ProductReview = {
      ...newReviewData,
      id: `rev_${Date.now()}`,
      date: new Date().toISOString(),
    };
    setReviews(prevReviews => [newReview, ...prevReviews]);
  };

  const isInWishlist = wishlist.includes(product.id);
  
  const discount = product.originalPrice && product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
    
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 8);
  const categoryName = categories.find(c => c.id === product.category)?.name || product.category;
    
  return (
    <div className="bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: 'হোম', onClick: () => navigateTo('home') }, { label: categoryName, onClick: () => navigateToShop(product.category) }, { label: product.name }]} />

        <div className="mt-6 md:grid md:grid-cols-2 md:gap-x-8">
          {/* Image gallery */}
          <div className="w-full overflow-hidden rounded-lg">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-center object-cover"
            />
          </div>

          {/* Product info */}
          <div className="mt-4 md:mt-0">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-2">SKU: {product.sku}</p>

            <div className="mt-3">
              <h2 className="sr-only">Product price</h2>
              <div className="flex items-baseline space-x-2">
                <p className="text-4xl text-brand-green font-bold">৳{product.price.toLocaleString('bn-BD')}</p>
                 {product.originalPrice && (
                    <p className="text-2xl text-gray-500 line-through">৳{product.originalPrice.toLocaleString('bn-BD')}</p>
                )}
                {discount > 0 && (
                    <span className="text-sm font-semibold text-red-600">({discount}% ছাড়)</span>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-4">
                <p>পণ্যের বিবরণ এখানে যোগ করা হবে। কাপড়ের মান, ডিজাইন এবং অন্যান্য প্রয়োজনীয় তথ্য এখানে থাকবে।</p>
              </div>
            </div>

            <div className="mt-6">
                {product.stock > 0 ? (
                    <p className="text-sm text-green-600 font-semibold">স্টকে আছে</p>
                ) : (
                    <p className="text-sm text-red-600 font-semibold">স্টক শেষ</p>
                )}
            </div>

            <div className="mt-6 flex items-center space-x-4">
                <div className="flex items-center">
                  <label htmlFor="quantity-pd" className="sr-only">পরিমাণ</label>
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden h-12">
                    <button
                      type="button"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="px-4 h-full text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <input
                      id="quantity-pd"
                      type="number"
                      value={quantity}
                      readOnly
                      className="w-16 h-full text-center text-lg font-semibold text-brand-dark border-l border-r border-slate-300 focus:outline-none bg-white"
                      aria-live="polite"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                      disabled={quantity >= product.stock}
                      className="px-4 h-full text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Increase quantity"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <button
                    onClick={() => addToCart(product.id, quantity)}
                    disabled={product.stock === 0}
                    className="flex-1 bg-brand-yellow text-gray-900 py-3 px-8 border border-transparent rounded-md font-bold hover:bg-yellow-400 disabled:bg-gray-300 h-12 flex items-center justify-center"
                    >
                    কার্টে যোগ করুন
                </button>
                 <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-3 border border-gray-300 rounded-md hover:bg-gray-100 h-12 w-12 flex items-center justify-center"
                    aria-label="Add to wishlist"
                >
                    <HeartIcon className={`w-6 h-6 ${isInWishlist ? 'text-red-500' : 'text-gray-500'}`} isFilled={isInWishlist}/>
                </button>
            </div>
             <button
                onClick={() => buyNow(product.id, quantity)}
                disabled={product.stock === 0}
                className="w-full mt-4 bg-brand-green text-white py-3 px-8 border border-transparent rounded-md font-bold hover:bg-brand-green-dark disabled:bg-gray-400"
                >
                এখনই কিনুন
            </button>
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
            <div className="mt-16">
                <ProductCarousel
                    title="সম্পর্কিত পণ্য"
                    products={relatedProducts}
                    onProductSelect={onProductSelect}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                    addToCart={addToCart}
                    buyNow={buyNow}
                    onQuickView={onQuickView}
                />
            </div>
        )}
        
        <div className="mt-16">
            <ProductReviews 
                productId={product.id}
                reviews={reviews}
                onSubmitReview={handleReviewSubmit}
            />
        </div>
      </div>
    </div>
  );
};